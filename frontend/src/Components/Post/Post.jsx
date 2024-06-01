import { Avatar } from "@mui/material";
import React from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import RepeatIcon from "@mui/icons-material/Repeat";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";

function Post({ currPost }) {
    const { name, username, profilePhoto, photo, post } = currPost;
    return (
        <div className="post-container">
            <div className="post">
                <div className="post-avatar">
                    <Avatar src={profilePhoto} />
                </div>
                <div className="post-body">
                    <div className="post-header">
                        <div className="post-heading">
                            <h3>
                                {name}
                                <span className="post-header-badge">
                                    <VerifiedIcon />@{username}
                                </span>
                            </h3>
                        </div>
                        <div className="post-header-body">
                            <p>{post}</p>
                        </div>
                    </div>
                    <div className="post-image-container">
                        <div className="post-image">
                            <img src={photo} alt="post" />
                        </div>
                    </div>
                    <div className="post-footer">
                        <ChatBubbleOutlineIcon fontSize="small" />
                        <RepeatIcon fontSize="small" />
                        <FavoriteBorderIcon fontSize="small" />
                        <PublishIcon fontSize="small" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
