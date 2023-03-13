import React, { useState, useRef } from 'react'
import './PostShare.css'
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from '../../actions/uploadAction';

const PostShare = () => {
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const dispatch = useDispatch();
    const desc = useRef();

    const [image, setImage] = useState(null);
    const { user } = useSelector((state) => state.authReducer.authData);
    const loading = useSelector((state) => state.postReducer.uploading);

    // handle Image Change
    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);
        }
    };
    const imageRef = useRef();
    // Handle Post Upload
    const handleShare = (e) => {
        e.preventDefault();

        // Post Data
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        };
        // if there is an image with post
        if (image) {
            const data = new FormData();
            const fileName = Date.now() + image.name;
            data.append("name", fileName);
            data.append("file", image);
            newPost.image = fileName;
            try {
                dispatch(uploadImage(data));
            }
            catch (error) {
                console.log(error);
            }
        };
        dispatch(uploadPost(newPost));
        reset();
    };

    // Reset Post Share
    const reset = () => {
        setImage(null);
        desc.current.value = "";
    };

    return (
        <div className='postShare'>
            <img src={user.profilePicture
                ? serverPublic + user.profilePicture
                : serverPublic + "defaultProfile.png"}
                alt="Profile" />
            <div>
                <input type="text"
                    placeholder="What's happening "
                    required
                    ref={desc}
                />
                <div className="postOptions">

                    <div className="option"
                        style={{ color: "var(--photo)" }}
                        onClick={() => imageRef.current.click()}>
                        <UilScenery />
                        Photo
                    </div>
                    <div className="option"
                        style={{ color: "var(--video)" }}>
                        <UilPlayCircle />
                        Video
                    </div>
                    <div className="option"
                        style={{ color: "var(--location)" }}>
                        <UilLocationPoint />
                        Location
                    </div>
                    <div className="option"
                        style={{ color: "var(--shedule)" }}>
                        <UilSchedule />
                        Schedule
                    </div>
                    <button
                        className="button ps-btn"
                        onClick={handleShare}
                        disabled={loading}>
                        {loading ? "Uploading" : "Share"}
                    </button>

                    <div style={{ display: "none" }}>
                        <input
                            type="file"
                            name="myImage"
                            id="myImage"
                            ref={imageRef}
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
                {image &&
                    <div className='previewImage'>
                        <UilTimes onClick={() => setImage(null)} />
                        <img src={URL.createObjectURL(image)} alt="" />
                    </div>
                }
            </div>
        </div>
    )
}

export default PostShare;