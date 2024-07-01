import React, { useEffect, useState } from "react";
import "../Pages.css";
import TweetBox from "../../Components/TweetBox/TweetBox";
import Post from "../../Components/Post/Post";
import ReactLoading from "react-loading";
import "../Pages.css";
import { Typography } from "@mui/material";

function Feed() {
    const [sendingTweet, setSendingTweet] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setSendingTweet(true);
        fetch("http://localhost:3030/post")
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((error) => console.log(error));
        setSendingTweet(false);
    }, [posts.length]);
    return (
        <div className="feed-container">
            <TweetBox
                sendingTweet={sendingTweet}
                setSendingTweet={setSendingTweet}
            />
            <div className="posts">
                <div className="posts-container">
                    {sendingTweet ? (
                        <ReactLoading
                            type={"bubbles"}
                            color={"#50b7f5"}
                            height={65}
                            width={80}
                        />
                    ) : (
                        <>
                            {posts &&
                                posts.map((currPost) => (
                                    <>
                                        <div
                                            className="single-post"
                                            key={currPost._id}
                                        >
                                            <Post currPost={currPost} />
                                        </div>
                                    </>
                                ))}
                            {posts && posts.length === 0 && (
                                <div className="no-posts-container">
                                    <Typography>No posts yet.</Typography>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Feed;
