import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { getUser } from "../../api/UserRequest"
import "./ChatBox.css";
import { addMessage, getMessages } from "../../api/MessageRequest";
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji';

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    // To handle changes in message input 
    const handleChange = (newMessage) => {
        setNewMessage(newMessage);
    };

    // Fetching data for chat header
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser);
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId);
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (chat !== null) getUserData();
    }, [chat, currentUser]);

    // Fetching messages for chat
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getMessages(chat._id);
                setMessages(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (chat !== null) fetchMessages();
    }, [chat]);

    // Always scroll to the last Message
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // To handle send messages
    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id,
        };

        // Send messages to the socket server
        const receiverId = chat.members.find((id) => id !== currentUser);
        setSendMessage({ ...message, receiverId });

        // Send messages to the database
        try {
            const { data } = await addMessage(message);
            setMessages([...messages, data]);
            setNewMessage("");
        }
        catch (error) {
            console.log(error);
        }
    };

    // Receive Messages from the socket server
    useEffect(() => {
        if (receivedMessage !== null &&
            receivedMessage.chatId === chat._id) {
            setMessages([...messages, receivedMessage]);
        }
    }, [receivedMessage]);

    const scroll = useRef();
    const imageRef = useRef();

    return (
        <>
            <div className="ChatBox-container">
                {chat ? (
                    <>
                        {/* Chat-Header */}
                        <div className="chat-header">
                            <div className="follower">
                                <div>
                                    <img
                                        src={
                                            userData?.profilePicture
                                                ? process.env.REACT_APP_PUBLIC_FOLDER +
                                                userData.profilePicture
                                                : process.env.REACT_APP_PUBLIC_FOLDER +
                                                "defaultProfile.png"
                                        }
                                        alt="Profile"
                                        className="followerImage"
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                    <div className="name" style={{ fontSize: "0.9rem" }}>
                                        <span>{userData?.firstname} {userData?.lastname}</span>
                                    </div>
                                </div>
                            </div>
                            <hr
                                style={{
                                    width: "95%",
                                    border: "0.1px solid #ececec",
                                    marginTop: "20px",
                                }}
                            />
                        </div>

                        {/* Chat-Body */}
                        <div className="chat-body" >
                            {messages.map((message) => (
                                <>
                                    <div ref={scroll}
                                        className={
                                            message.senderId === currentUser
                                                ? "message own"
                                                : "message"
                                        }
                                    >
                                        <span>{message.text}</span>{" "}
                                        <span>{format(message.createdAt)}</span>
                                    </div>
                                </>
                            ))}
                        </div>

                        {/* Chat-Sender */}
                        <div className="chat-sender">
                            <div onClick={() => imageRef.current.click()}>+</div>
                            <InputEmoji
                                value={newMessage}
                                onChange={handleChange}
                            />
                            <div className="send-button button" onClick={handleSend}>Send</div>
                            <input
                                type="file"
                                name=""
                                id=""
                                style={{ display: "none" }}
                                ref={imageRef}
                            />
                        </div>{" "}
                    </>
                ) : (
                    <span className="chatbox-empty-message">
                        Tap on a chat to start conversation...
                    </span>
                )}
            </div>
        </>
    );
};

export default ChatBox;