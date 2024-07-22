import React, { useEffect, useState } from "react";
import { Avatar, Typography } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardControlKeyIcon from "@mui/icons-material/KeyboardControlKey";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import Comments from "../Comments/Comments";
import "./Post.css";

function Post({ currPost, setNewPost }) {
    const {
        fullname,
        username,
        profilePhoto,
        photo,
        post,
        likes,
        email,
        createdAt,
    } = currPost;
    const [currLikes, setCurrLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const formatDate = (rawDate) => {
        const date = new Date(rawDate);
        const options = {
            timeZone: "Asia/Kolkata",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        };
        const ISTdateTime = date.toLocaleString("en-US", options);
        return ISTdateTime;
    };

    const toggleShowComments = () => {
        setShowComments((showComments) => !showComments);
    };

    const rePost = (currPost) => {
        setNewPost(currPost);
    };

    const handleLike = async () => {
        // updating the UI beforehand
        const postId = currPost._id;
        try {
            await axios.post(
                `https://giribabi-twitter-twin-api.onrender.com/posts/${postId}/like`,
                {
                    liked: liked,
                    email,
                }
            );
            setLiked((liked) => !liked);
            setCurrLikes(liked ? likes - 1 : likes + 1);
        } catch (error) {
            console.error("Error liking the post", error);
        }
    };

    const checkoutLikes = () => {
        console.log(likes);
        if (likes && likes.length) {
            console.log(likes);
            if (likes.includes(email)) {
                setLiked(true);
            }
            setCurrLikes(likes.length);
        }
    };

    useEffect(() => {
        checkoutLikes();
    }, [liked]);

    return (
        <>
            <div className="post">
                <div className="post-avatar">
                    <Avatar src={profilePhoto} />
                </div>
                <div className="post-body">
                    <div className="post-header">
                        <div className="post-heading">
                            <h3>{fullname}</h3>
                            <h5 className="post-header-badge">
                                <VerifiedIcon
                                    style={{
                                        color: "var(--twitter-color)",
                                    }}
                                />

                                <div className="username">@{username}</div>
                            </h5>
                        </div>
                        <div className="post-header-body">
                            <Typography fontSize={18}>{post}</Typography>
                        </div>
                    </div>
                    {photo !== "" && (
                        <div className="post-image-container">
                            <img
                                src={photo}
                                alt="post"
                                className="post-image"
                            />
                        </div>
                    )}
                    <div className="date-time">{formatDate(createdAt)}</div>
                    <div className="post-footer">
                        <div onClick={toggleShowComments}>
                            <ChatBubbleOutlineIcon
                                className="reaction-icons"
                                fontSize="small"
                            />
                            {showComments ? (
                                <KeyboardControlKeyIcon className="comment-dropdown-icon" />
                            ) : (
                                <KeyboardArrowDownIcon className="comment-dropdown-icon" />
                            )}
                        </div>
                        <div onClick={() => rePost(currPost)}>
                            <RepeatIcon
                                className="reaction-icons"
                                fontSize="small"
                            />
                        </div>

                        <div className="" onClick={handleLike}>
                            {liked ? (
                                <FavoriteIcon
                                    className="reaction-icons"
                                    fontSize="small"
                                    style={{ color: "red" }}
                                />
                            ) : (
                                <FavoriteBorderIcon
                                    className="reaction-icons"
                                    fontSize="small"
                                />
                            )}
                            <span
                                style={{
                                    width: "20px",
                                    display: "inline-block",
                                    position: "relative",
                                    bottom: "3px",
                                }}
                            >
                                {currLikes && currLikes.length > 0
                                    ? currLikes.length + " "
                                    : "0 "}
                            </span>
                        </div>
                    </div>
                    {showComments && <Comments currPost={currPost} />}
                </div>
            </div>
        </>
    );
}

export default Post;
