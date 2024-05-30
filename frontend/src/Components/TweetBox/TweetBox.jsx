import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import AddPhotoAlternateIconOutlined from "@mui/icons-material/AddPhotoAlternateOutlined";
import "./TweetBox.css";

function TweetBox() {
    const [post, setPost] = useState("");
    const [imageURL, setImageURL] = useState("");

    const handleTweet = (e) => {
        e.preventDefault();
        console.log(post);
    };
    return (
        <div>
            <form onSubmit={handleTweet}>
                <div className="tweetbox-input">
                    <Avatar />
                    <input
                        type="text"
                        placeholder="What's happening?"
                        onChange={(e) => setPost(e.target.value)}
                    />
                </div>
                <div className="imageIcon-tweetButton">
                    <label htmlFor="image" className="imageIcon">
                        <AddPhotoAlternateIconOutlined></AddPhotoAlternateIconOutlined>
                    </label>
                    <input type="file" id="image" className="image-input" />
                    <Button className="tweetbox-tweetButton" type="submit">
                        Tweet
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default TweetBox;
