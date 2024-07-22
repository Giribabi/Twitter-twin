import React, { useEffect, useState } from "react";
import "../Pages.css";
import TweetBox from "../../Components/TweetBox/TweetBox";
import Post from "../../Components/Post/Post";
import ReactLoading from "react-loading";
import "../Pages.css";
import { Typography } from "@mui/material";

function Feed() {
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [sendingTweet, setSendingTweet] = useState(false);
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingPosts(true);
                const response = await fetch("http://localhost:3030/post");
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingPosts(false);
            }
        };

        fetchData();
    }, [posts.length]);

    return (
        <div className="feed-container">
            <TweetBox
                newPost={newPost}
                sendingTweet={sendingTweet}
                setSendingTweet={setSendingTweet}
                setPosts={setPosts}
                setLoadingPosts={setLoadingPosts}
            />
            <div className="posts">
                <div className="posts-container">
                    {loadingPosts ? (
                        <ReactLoading
                            type={"bubbles"}
                            color={"#50b7f5"}
                            height={65}
                            width={80}
                        />
                    ) : (
                        <>
                            {posts &&
                                posts.map((currPost, index) => (
                                    <div
                                        className="single-post-box"
                                        key={currPost._id + index}
                                    >
                                        <div
                                            className="single-post"
                                            key={currPost._id}
                                        >
                                            <Post
                                                setNewPost={setNewPost}
                                                currPost={currPost}
                                            />
                                        </div>
                                    </div>
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
