import { Avatar, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import AlertMessage from "../AlertMessage/AlertMessage";
import AddPhotoAlternateIconOutlined from "@mui/icons-material/AddPhotoAlternateOutlined";
import "./TweetBox.css";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import useLoggedinUser from "../../hooks/useLoggedinUser";

function TweetBox({ sendingTweet, setSendingTweet }) {
    const [user] = useAuthState(auth);
    const [loggedinUser] = useLoggedinUser();
    const userProfilePic = loggedinUser[0]?.profileImage || "";
    const email = user?.providerData[0]?.email || "";

    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [post, setPost] = useState("");
    const [imageURL, setImageURL] = useState("");

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const [imageUploadFailed, setImageUploadFailed] = useState(false);

    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        if (user?.providerData[0]?.providerId === "password") {
            fetch(`http://localhost:3030/loggedUser?email=${email}`)
                .then((res) => res.json())
                .then((data) => {
                    setFullname(data[0]?.name || "");
                    setUsername(data[0]?.username || "");
                });
        } else {
            setFullname(user?.displayName || "");
            setUsername(email);
        }
    }, [email, user]);

    const handleTweet = (e) => {
        setSendingTweet(true);
        e.preventDefault();
        console.log(sendingTweet);

        const userPost = {
            profilePhoto: userProfilePic,
            username: username,
            fullname: fullname,
            email: email,
            post: post,
            photo: imageURL,
        };

        fetch("http://localhost:3030/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userPost),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
            });
        setPost("");
        setImageURL("");

        setSendingTweet(false);
        console.log(sendingTweet);
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
                    setImageURL(res.data.data.display_url);
                    setLoading(false);
                })
                .catch((error) => {
                    setOpen(true);
                    setImageUploadFailed(true);
                    console.error("Error uploading image:", error);
                });
        } else {
            // console.log("No image selected");
        }
        setLoading(false);
    };

    return (
        <div className="tweetBox">
            {sendingTweet ? (
                <div className="loading-box">
                    <ReactLoading
                        type={"bubbles"}
                        color={"#50b7f5"}
                        height={65}
                        width={80}
                    />
                </div>
            ) : (
                <form onSubmit={handleTweet}>
                    <div className="tweetBox-input">
                        <Avatar src={userProfilePic} />
                        <input
                            type="text"
                            placeholder="What's happening?"
                            value={post}
                            onChange={(e) => setPost(e.target.value)}
                            required
                        />
                    </div>
                    <div className="imageIcon-tweetButton">
                        <label
                            htmlFor="image"
                            className="imageIcon"
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
            )}
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
