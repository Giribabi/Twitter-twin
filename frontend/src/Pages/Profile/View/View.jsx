import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./View.css";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddLinkIcon from "@mui/icons-material/AddLink";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useNavigate } from "react-router-dom";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { Avatar, containerClasses, Divider, Typography } from "@mui/material";
import Post from "../../../Components/Post/Post";
import ReactLoading from "react-loading";
import axios from "axios";
import Edit from "../Edit/Edit";
import { isMobile } from "react-device-detect";

/* ?? is nullish coalescing operator better than || as "??" prevents rendering user[0].bio if it is null or empty string */

function View({ user }) {
    const navigate = useNavigate();
    const username = user[0]?.username;
    const fullname = user[0]?.name;
    const [loading, setLoading] = useState(false);
    const [postsLoading, setPostsLoading] = useState(false);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setPostsLoading(true);
            try {
                const response = await fetch(
                    `https://giribabi-twitter-twin-api.onrender.com/myPosts?email=${user[0]?.email}`
                );
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.log("Fetch error:", error);
            } finally {
                setPostsLoading(false);
            }
        };

        if (user[0]?.email) {
            fetchData();
        }
    }, [user, posts.length]);

    const handleCoverImageUpload = async (e) => {
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
            const url = res.data.data.display_url;
            // updating the user profile photo to the backend
            if (url) {
                const userCoverImage = {
                    email: user[0]?.email,
                    coverImage: url,
                };

                try {
                    await axios.patch(
                        `https://giribabi-twitter-twin-api.onrender.com/profile/update/${user[0]?.email}`,
                        userCoverImage
                    );
                } catch (updateError) {
                    console.error("Error updating user profile:", updateError);
                }
            }
        } catch (uploadError) {
            console.error("Error uploading image:", uploadError);
        } finally {
            setLoading(false);
        }
    };

    const handleProfileImageUpload = async (e) => {
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
            const url = res.data.data.display_url;
            if (url) {
                const userProfileImage = {
                    email: user[0]?.email,
                    profileImage: url,
                };

                try {
                    await axios.patch(
                        `https://giribabi-twitter-twin-api.onrender.com/profile/update/${user[0]?.email}`,
                        userProfileImage
                    );
                } catch (updateError) {
                    console.error("Error updating user profile:", updateError);
                }
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="view-profile">
            <div className="profile-heading">
                {!isMobile && (
                    <ArrowBackIcon
                        className="arrow-icon"
                        onClick={() => navigate("/")}
                    />
                )}
                <h2 style={{ paddingLeft: isMobile ? "15px" : "1px" }}>
                    {username ? "@" + username : "Guest user"}
                </h2>
            </div>
            <div className="profile-body">
                <div className="profile-bio">
                    {
                        <div className="">
                            <div className="cover-image-container">
                                {user[0]?.coverImage &&
                                user[0]?.coverImage !== "" ? (
                                    <div className="cover-image-container">
                                        <img
                                            src={user[0].coverImage}
                                            alt="cover-pic"
                                            className="cover-image"
                                        />
                                    </div>
                                ) : (
                                    <div className="cover-image">
                                        <CameraAltOutlinedIcon className="camera-icon" />
                                    </div>
                                )}
                                <div className="image-upload-icon">
                                    <input
                                        type="file"
                                        id="cover-image-upload"
                                        style={{ display: "none" }}
                                        onChange={handleCoverImageUpload}
                                    />
                                    {!loading && (
                                        <label htmlFor="cover-image-upload">
                                            <CenterFocusWeakIcon className="focus-icon" />
                                        </label>
                                    )}
                                    {loading && (
                                        <ReactLoading
                                            type={"bubbles"}
                                            color={"#50b7f5"}
                                            height={75}
                                            width={75}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="profile-image-container">
                                <input
                                    type="file"
                                    id="profile-image-upload"
                                    style={{ display: "none" }}
                                    onChange={handleProfileImageUpload}
                                />
                                <label htmlFor="profile-image-upload">
                                    <Avatar
                                        src={user[0]?.profileImage ?? ""}
                                        alt="profile-image"
                                        className="profile-image"
                                    />
                                </label>
                                <div className="profile-details">
                                    <div className="user-credentials">
                                        <div className="fullname">
                                            <h3>{fullname ?? "Guest user"}</h3>
                                            <VerifiedIcon
                                                style={{
                                                    display:
                                                        !fullname ||
                                                        fullname.length === 0
                                                            ? "none"
                                                            : "block",
                                                    color: "var(--twitter-color)",
                                                    marginLeft: "4px",
                                                }}
                                            />
                                        </div>
                                        <h5 className="post-header-badge">
                                            <div className="username">
                                                {username ? "@" + username : ""}
                                            </div>
                                        </h5>
                                    </div>
                                    <div className="edit-profile">
                                        <Edit loggedinUser={user} />
                                    </div>
                                </div>
                            </div>
                            <div className="user-posts-container">
                                <div className="posts-heading-container">
                                    <div className="posts-heading">
                                        Posts<div className="highlight"></div>
                                    </div>
                                </div>

                                {postsLoading ? (
                                    <div className="loading-container">
                                        <ReactLoading
                                            type={"spinningBubbles"}
                                            color={"#50b7f5"}
                                            height={60}
                                            width={60}
                                        />
                                    </div>
                                ) : (
                                    <div className="my-tweets">
                                        {posts &&
                                            posts.map((currPost) => (
                                                <>
                                                    <div
                                                        className="single-post"
                                                        key={currPost._id}
                                                    >
                                                        <Post
                                                            currPost={currPost}
                                                        />
                                                    </div>
                                                </>
                                            ))}
                                        {posts && posts.length === 0 && (
                                            <div className="no-posts">
                                                <Typography>
                                                    No posts yet.
                                                </Typography>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default View;
