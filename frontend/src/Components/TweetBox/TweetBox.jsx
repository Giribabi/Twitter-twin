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

function TweetBox({
    newPost,
    sendingTweet,
    setSendingTweet,
    setPosts,
    setLoadingPosts,
}) {
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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3030/loggedUser?email=${email}`
                );
                const data = await response.json();
                // console.log(data);
                setFullname(data[0]?.name || "Guest User");
                setUsername(data[0]?.username || "guest");
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();
    }, [email, user]);

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

    const handleTweet = async (e) => {
        e.preventDefault();
        setSendingTweet(true);

        const userPost = {
            profilePhoto: userProfilePic,
            username: username,
            fullname: fullname,
            email: email,
            post: post,
            photo: imageURL,
            likes: [],
        };

        try {
            await fetch("http://localhost:3030/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userPost),
            });
            fetchData();
            // console.log(data);
        } catch (error) {
            console.error("Error posting tweet:", error);
        } finally {
            setPost("");
            setImageURL("");
            setSendingTweet(false);
            // console.log(sendingTweet);
            // This will log the state after it has been updated
        }
    };

    const handleImageUpload = async (e) => {
        setLoading(true);
        const image = e.target.files[0];

        if (!image) {
            console.log("No image selected");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.set("image", image);

        try {
            const res = await axios.post(
                "https://api.imgbb.com/1/upload?key=2ff8b34d7b55a2c85194c0e00b865b71",
                formData
            );
            setOpen(true);
            setIsImageUploaded(true);
            setImageURL(res.data.data.display_url);
        } catch (error) {
            setOpen(true);
            setImageUploadFailed(true);
            console.error("Error uploading image:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (newPost) {
            // console.log(newPost);
            setPost(newPost.post);
            setImageURL(newPost.photo);
        }
    }, [newPost]);

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
                                    style={{
                                        padding: "8px",
                                        cursor: "pointer",
                                    }}
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
