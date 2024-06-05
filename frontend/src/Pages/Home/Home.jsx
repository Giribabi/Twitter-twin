import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Widgets from "../../Components/Widgets/Widgets";
import "./Home.css";
import { Grid } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import { Outlet } from "react-router-dom";
import useLoggedinUser from "../../hooks/useLoggedinUser";

function Home() {
    const user = useAuthState(auth);
    const handleLogout = () => {
        signOut(auth);
    };
    return (
        <div className="page-container">
            <div className="home-container">
                <Grid container spacing={1}>
                    <Grid item xs={3} sm={4} md={4} lg={3} xl={2.5}>
                        <Sidebar handleLogout={handleLogout} user={user} />
                    </Grid>
                    <Grid item xs={6} sm={8} md={8} lg={6} xl={6}>
                        {/* this Outlet component is responsible for rendering the Bookmarks,Messages,Profile components within the Parent (Home) Layout through the nested route in App.js */}
                        <Outlet />
                    </Grid>
                    <Grid item xs={0} sm={0} md={0} lg={3} xl={3.5}>
                        <Widgets />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Home;
