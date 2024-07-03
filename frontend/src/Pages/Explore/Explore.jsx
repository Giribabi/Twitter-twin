import React, { useEffect, useState } from "react";
import "../Pages.css";
import Post from "../../Components/Post/Post";
import ReactLoading from "react-loading";
import "../Pages.css";
import { Typography } from "@mui/material";

function Explore() {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch("https://giribabi-twitter-twin-api.onrender.com/post")
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((error) => console.log(error));
        setLoading(false);
    }, [posts.length]);
    return (
        <div>
            <div className="explore-posts">
                <div className="posts-container">
                    {loading ? (
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

export default Explore;
