import React, { useEffect, useState } from "react";
import "../Pages.css";
import TweetBox from "../../Components/TweetBox/TweetBox";
import axios from "axios";
import Post from "../../Components/Post/Post";

function Feed() {
    const [sendingTweet, setSendingTweet] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setSendingTweet(true);
        fetch("http://localhost:3030/post")
            .then((res) => res.json())
            .then((data) => setPosts(data));
        setSendingTweet(false);
    }, [posts]);
    return (
        <div>
            <TweetBox
                sendingTweet={sendingTweet}
                setSendingTweet={setSendingTweet}
            />
            <div className="posts-container">
                {posts &&
                    posts.map((currPost) => (
                        <div className="single-post" key={currPost._id}>
                            <Post currPost={currPost} />
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Feed;
