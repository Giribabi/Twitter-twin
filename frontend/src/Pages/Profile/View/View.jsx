import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./View.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddLinkIcon from "@mui/icons-material/AddLink";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import Post from "../../../Components/Post/Post";

function View({ user }) {
    const navigate = useNavigate();
    const username = user[0]?.username;
    const fullname = user[0]?.name;
    // add user pic url to Avatar

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3030/post")
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((error) => console.log(error));
    }, [posts.length]);
    const handleCoverImageUpload = (e) => {
        console.log(e.target.files[0]);
    };

    const handleProfileImageUpload = (e) => {
        console.log(e.target.files[0]);
    };
    return (
        <div className="view-profile">
            <div className="profile-heading">
                <ArrowBackIcon
                    className="arrow-icon"
                    onClick={() => navigate("/")}
                />
                <h2>{"@" + username}</h2>
            </div>
            <div className="profile-body">
                <div className="profile-bio">
                    {
                        <div className="">
                            <div className="cover-image-container">
                                <input
                                    type="file"
                                    id="cover-image-upload"
                                    style={{ display: "none" }}
                                    onChange={handleCoverImageUpload}
                                />
                                <label htmlFor="cover-image-upload">
                                    <Avatar
                                        src=""
                                        alt="cover-image"
                                        className="cover-image"
                                    />
                                </label>
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
                                        src=""
                                        alt="profile-image"
                                        className="profile-image"
                                    />
                                </label>
                            </div>
                            <div className="user-details">
                                <h2 className="fullname">{fullname}</h2>
                                <p className="username">@{username}</p>
                                <div className="info">
                                    {/* ?? is nullish coalescing operator better than || as "??" prevents rendering user[0].bio if it is null or empty string */}
                                    {user[0]?.bio ??
                                        "No information provided yet."}
                                </div>
                                <div className="location-info">
                                    <LocationOnIcon />:
                                    {user[0]?.location ? (
                                        <p>user[0]?.location</p>
                                    ) : (
                                        "No information provided yet."
                                    )}
                                </div>
                                <div className="website-info">
                                    <AddLinkIcon />:
                                    {user[0]?.wesbite ? (
                                        <p>user[0]?.wesbite</p>
                                    ) : (
                                        "No information provided yet."
                                    )}
                                </div>
                                <h4>Tweets</h4>
                                <hr />
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
