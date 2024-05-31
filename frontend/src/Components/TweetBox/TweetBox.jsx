import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import AlertMessage from "../AlertMessage/AlertMessage";
import AddPhotoAlternateIconOutlined from "@mui/icons-material/AddPhotoAlternateOutlined";
import "./TweetBox.css";

function TweetBox() {
    const [post, setPost] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const [imageUploadFailed, setImageUploadFailed] = useState(false);
    const handleTweet = (e) => {
        e.preventDefault();
        const userPost = {
            post: post,
            photo: imageURL,
        };
        console.log(userPost);

        fetch("http://localhost:3030/post", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userPost),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
    };

    const handleImageUpload = (e) => {
        setLoading(true);
        const image = e.target.files[0];
        if (image) {
            const formData = new FormData();
            formData.set("image", image);

            axios
                .post(
                    "https://api.imgbb.com/1/upload?key=2ff8b34d7b55a2c85194c0e00b865b71",
                    formData
                )
                .then((res) => {
                    setOpen(true);
                    setIsImageUploaded(true);
                    // console.log("Image uploaded");
                    setImageURL(res.data.data.display_url);
                    setLoading(false);
                })
                .catch((error) => {
                    setOpen(true);
                    setImageUploadFailed(true);
                    console.error("Error uploading image:", error);
                    setLoading(false);
                });
        } else {
            console.log("No image selected");
            setLoading(false);
        }
    };

    return (
        <div className="tweetBox">
            <form onSubmit={handleTweet}>
                <div className="tweetBox-input">
                    <Avatar />
                    <input
                        type="text"
                        placeholder="What's happening?"
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                    />
                </div>
                <div className="imageIcon-tweetButton">
                    <label
                        htmlFor="image"
                        className="imageIcon"
                        onChange={handleImageUpload}
                        style={{ margin: "5px" }}
                    >
                        {loading ? (
                            <ReactLoading
                                type={"spinningBubbles"}
                                color={"#50b7f5"}
                                height={45}
                                width={25}
                            />
                        ) : (
                            <AddPhotoAlternateIconOutlined
                                style={{ padding: "8px" }}
                            />
                        )}
                    </label>
                    <input
                        type="file"
                        id="image"
                        className="image-input"
                        onChange={handleImageUpload}
                    />
                    <Button className="tweetBox-tweetButton" type="submit">
                        Tweet
                    </Button>
                </div>
            </form>
            {isImageUploaded && (
                <AlertMessage
                    type="success"
                    message="Image uploaded successfully"
                    open={open}
                    setOpen={setOpen}
                />
            )}
            {imageUploadFailed && (
                <AlertMessage
                    type="danger"
                    message="Error in uploading image!"
                    open={open}
                    setOpen={setOpen}
                />
            )}
        </div>
    );
}

export default TweetBox;
