import React from "react";
import { Avatar, Typography } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import RepeatIcon from "@mui/icons-material/Repeat";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";

import "./Post.css";

function Post({ currPost }) {
    const { fullname, username, profilePhoto, photo, post } = currPost;
    // console.log(currPost);

    return (
        <>
            <div className="post">
                <div className="post-body">
                    <div className="post-header">
                        <div className="post-heading">
                            <div className="post-avatar">
                                <Avatar src={profilePhoto} />
                            </div>
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
                    <div className="post-footer">
                        <ChatBubbleOutlineIcon fontSize="small" />
                        <RepeatIcon fontSize="small" />
                        <FavoriteBorderIcon fontSize="small" />
                        <PublishIcon fontSize="small" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Post;
