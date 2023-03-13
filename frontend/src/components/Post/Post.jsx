import React, { useEffect } from 'react'
import "./Post.css"
import Posts from '../Posts/Posts'
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePosts } from '../../actions/PostAction';
import { useParams } from "react-router-dom";

const Post = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);
    let { posts, loading } = useSelector((state) => state.postReducer);

    // Fetching user's posts
    useEffect(() => {
        dispatch(getTimelinePosts(user._id));
    }, []);

    if (posts.length === 0) {
        return "No posts are available";
    };
    if (params.id) {
        posts = posts.filter((post) => post.userId === params.id);
    };

    return (
        <div className='post'>
            {loading
                ? "Fetching posts..."
                : posts.map((post, id) => {
                    return <Posts data={post} key={id} />
                })
            }
        </div>
    )
}

export default Post