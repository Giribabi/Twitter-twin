import React, { useEffect, useState } from "react";
import {
    useSignInWithEmailAndPassword,
    useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import AppLogo from "../../assets/AppLogo.jpg";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    //const [error, setError] = useState("")
    const [signInWithEmailAndPassword, user, loading, error] =
        useSignInWithEmailAndPassword(auth);
    const [signInWithMicrosoft, googleUser, googleLoading, googleError] =
        useSignInWithGoogle(auth);
    // if (googleUser) console.log(googleUser);
    // if (googleError) console.log(googleError);
    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
    };
    const handleGoogleSignin = () => {
        signInWithMicrosoft();
    };
    if (user || googleUser) {
        navigate("/");
    }
    // if (error) console.log(error);
    //use loading property to showing loader
    return (
        <div className="">
            {loading || googleLoading ? (
                <LoadingPage />
            ) : (
                <div className="login-container">
                    <div className="logo-image-container">
                        <img
                            src={AppLogo}
                            alt="login-logo"
                            className="logo-image"
                        />
                    </div>
                    <div className="form-container">
                        <div className="auth-heading">Happening now</div>
                        <form onSubmit={handleSubmit}>
                            <div className="input-container">
                                <input
                                    type="email"
                                    className="input"
                                    placeholder="Your Email address"
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoFocus
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
                                    Login
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
                            Don't have an account?
                            <Link
                                to="/signup"
                                style={{
                                    textDecoration: "none",
                                    color: "skyblue",
                                    fontWeight: "600",
                                    marginLeft: "5px",
                                }}
                            >
                                Sign up now
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
