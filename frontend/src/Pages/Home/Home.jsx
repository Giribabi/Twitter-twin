import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Widgets from "../../Components/Widgets/Widgets";
import "./Home.css";
import { Grid } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import { Outlet } from "react-router-dom";
import { isMobile } from "react-device-detect";
import SideBarDrawer from "../../Components/Drawer/Drawer";

function Home() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [user] = useAuthState(auth);

    const openSideDrawer = () => {
        setOpenDrawer(true);
    };

    const closeDrawer = () => {
        setOpenDrawer(false);
    };

    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <div className="page-container">
            {isMobile && (
                <div className="menu-icon-container" onClick={openSideDrawer}>
                    <MenuIcon className="menu-icon" />
                </div>
            )}
            <SideBarDrawer
                handleLogout={handleLogout}
                openDrawer={openDrawer}
                closeDrawer={closeDrawer}
            />

            <div className={isMobile ? "mobile-home" : "home-container"}>
                <Grid container spacing={1}>
                    {!isMobile && (
                        <Grid item xs={0} sm={4} md={4} lg={3} xl={2.5}>
                            <Sidebar handleLogout={handleLogout} user={user} />
                        </Grid>
                    )}
                    <Grid item xs={12} sm={8} md={8} lg={6} xl={6}>
                        <Outlet />
                    </Grid>
                    {!isMobile && (
                        <Grid item xs={0} sm={0} md={0} lg={3} xl={3.5}>
                            <Widgets />
                        </Grid>
                    )}
                </Grid>
            </div>
        </div>
    );
}

export default Home;
