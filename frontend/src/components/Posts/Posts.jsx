import React, { useState } from 'react'
import './Posts.css'
import comment from '../../img/comment.png'
import share from '../../img/share.png'
import heart from '../../img/like.png'
import notLike from '../../img/notlike.png'
import { useSelector } from 'react-redux'
import { likePost } from '../../api/PostRequest'

const Posts = ({ data }) => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const [liked, setLiked] = useState(data.likes.includes(user._id));
    const [likes, setLikes] = useState(data.likes.length);

    // Like A Post
    const handleLike = () => {
        likePost(data._id, user._id);
        setLiked((prev) => !prev);

        // Changing likes number
        liked ? setLikes((prev) => prev - 1)
            : setLikes((prev) => prev + 1);
    };

    return (
        <div className='posts'>
            <img src={data.image
                ? process.env.REACT_APP_PUBLIC_FOLDER + data.image
                : ""} alt="" />
            <div className="postReacts">
                <img src={liked
                    ? heart
                    : notLike} alt=""
                    style={{ cursor: "pointer" }}
                    onClick={handleLike}
                />
                <img src={comment} alt="" />
                <img src={share} alt="" />
            </div>
            <span
                style={{ color: "var(--gray)", fontSize: "12px" }}>
                {likes} likes
            </span>

            <div className="details">
                <span> <b>{data.name}</b></span>
                <span> {data.desc}</span>
            </div>
        </div>
    )
}

export default Posts