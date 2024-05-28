import React, { useState } from "react";
import {
    useCreateUserWithEmailAndPassword,
    useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import AppLogo from "../../assets/AppLogo.jpg";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import LoadingPage from "../LoadingPage";

function Signup() {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    //const [error, setError] = useState("")
    const [createUserWithEmailAndPassword, user, loading, error] =
        useCreateUserWithEmailAndPassword(auth);

    const [signInWithMicrosoft, googleUser, googleLoading, googleError] =
        useSignInWithGoogle(auth);
    // if (googleUser) console.log(googleUser);
    // if (googleError) console.log(googleError);
    //use loading property to showing loader
    const handleSubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(email, password);
    };

    const handleGoogleSignin = () => {
        signInWithMicrosoft();
    };
    if (user || googleUser) {
        navigate("/");
    }

    return (
        <div className="">
            {loading || googleLoading ? (
                <LoadingPage />
            ) : (
                <div className="signup-container">
                    <div className="logo-image-container">
                        <img src={AppLogo} alt="login-logo" />
                    </div>
                    <div className="form-container">
                        <div className="auth-heading">Happening now</div>
                        <form onSubmit={handleSubmit}>
                            <div className="input-container">
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Your username"
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Your Full Name"
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    type="email"
                                    className="input"
                                    placeholder="Your Email address"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="Your Password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="input-container">
                                <button type="submit" className="submit-button">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                        <hr style={{ color: "white", width: "80%" }} />
                        <div className="input-container">
                            <div className="google-button">
                                <GoogleButton
                                    light="light"
                                    onClick={() => {
                                        handleGoogleSignin();
                                    }}
                                />
                            </div>
                        </div>
                        <div className="">
                            Already have an account?
                            <Link
                                to="/login"
                                style={{
                                    textDecoration: "none",
                                    color: "skyblue",
                                    fontWeight: "600",
                                    marginLeft: "5px",
                                }}
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Signup;
