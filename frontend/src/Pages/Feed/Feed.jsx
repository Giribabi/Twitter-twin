import React, { useEffect, useState } from "react";
import "../Pages.css";
import TweetBox from "../../Components/TweetBox/TweetBox";
import axios from "axios";
import Post from "../../Components/Post/Post";

function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3030/post")
            .then((res) => res.json())
            .then((data) => setPosts(data));
    }, []);
    return (
        <div>
            <TweetBox />
            <div className="posts-container">
                {posts &&
                    posts.map((currPost, index) => (
                        <div className="single-post" key={currPost._id}>
                            <Post currPost={currPost} />
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Feed;
