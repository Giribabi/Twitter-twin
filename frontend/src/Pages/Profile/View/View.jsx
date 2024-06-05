import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./View.css";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddLinkIcon from "@mui/icons-material/AddLink";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useNavigate } from "react-router-dom";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { Avatar, Divider, Typography } from "@mui/material";
import Post from "../../../Components/Post/Post";
import ReactLoading from "react-loading";
import axios from "axios";

/* ?? is nullish coalescing operator better than || as "??" prevents rendering user[0].bio if it is null or empty string */

function View({ user }) {
    const navigate = useNavigate();
    const username = user[0]?.username;
    const fullname = user[0]?.name;
    const [loading, setLoading] = useState(false);
    const [coverImageURL, setCoverImageURL] = useState("");
    const [profileImageURL, setProfileImageURL] = useState("");
    // add user pic url to Avatar

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3030/post")
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((error) => console.log(error));
    }, [posts.length]);

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
                        `http://localhost:3030/profile/update/${user[0]?.email}`,
                        userCoverImage
                    );
                    setCoverImageURL(url);
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
                        `http://localhost:3030/profile/update/${user[0]?.email}`,
                        userProfileImage
                    );
                    setProfileImageURL(url);
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
                <ArrowBackIcon
                    className="arrow-icon"
                    onClick={() => navigate("/")}
                />
                <h2>{username ? "@" + username : "not available"}</h2>
            </div>
            <div className="profile-body">
                <div className="profile-bio">
                    {
                        <div className="">
                            <div className="cover-image-container">
                                {user[0]?.coverImage &&
                                user[0]?.coverImage !== "" ? (
                                    <div className="cover-image">
                                        <img
                                            src={user[0].coverImage}
                                            alt="cover-pic"
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
                                <div className="user-credentials">
                                    <div className="fullname">
                                        <h3>{fullname ?? "not available"}</h3>
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
                            </div>
                            {/* <div className="user-details">
                                <div className="text-info">
                                    <div className="details">
                                        <Typography
                                            style={{ fontSize: "18px" }}
                                        >
                                            <strong>Full name: </strong>
                                            {fullname}
                                            <br />
                                            <strong>Username: </strong>
                                            <span
                                                style={{
                                                    color: "var(--twitter-color)",
                                                }}
                                            >
                                                @
                                            </span>
                                            {username}
                                        </Typography>
                                    </div>
                                    <div className="info">
                                        <Typography
                                            style={{ fontSize: "18px" }}
                                        >
                                            <strong>About: </strong>
                                            {user[0]?.bio ??
                                                "No information provided yet."}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="other-profile-info">
                                    <div className="location-info">
                                        <LocationOnIcon />:
                                        {user[0]?.location ? (
                                            <p> user[0]?.location</p>
                                        ) : (
                                            " No information provided yet."
                                        )}
                                    </div>
                                    <div className="website-info">
                                        <AddLinkIcon />:
                                        {user[0]?.wesbite ? (
                                            <p> user[0]?.wesbite</p>
                                        ) : (
                                            " No information provided yet."
                                        )}
                                    </div>
                                </div>
                            </div> */}
                            <div className="user-posts-container">
                                <div className="posts-heading-container">
                                    <div className="posts-heading">
                                        Posts<div className="highlight"></div>
                                    </div>
                                </div>
                                <div className="my-tweets">
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
                                        <div className="no-posts">
                                            <Typography>
                                                No posts yet.
                                            </Typography>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default View;
