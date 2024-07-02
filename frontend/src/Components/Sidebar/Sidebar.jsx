import React, { useState } from "react";
import Logo from "../Logo/Logo";
import "./Sidebar.css";
import SidebarOptions from "./SidebarOptions";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StyledLink from "../StyledLink/StyledLink";
import {
    Avatar,
    Button,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import useLoggedinUser from "../../hooks/useLoggedinUser";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

function Sidebar({ handleLogout, user }) {
    console.log(user);
    const navigate = useNavigate();
    const [loggedinUser] = useLoggedinUser();
    console.log(loggedinUser);

    const fullName = loggedinUser[0]?.name ?? "Guest User";
    const username = loggedinUser[0]?.username ?? "Guest User";
    const userProfilePic = loggedinUser[0]?.profileImage || "";

    const [openMenu, setOpenMenu] = useState(false);
    const handleClick = () => {
        setOpenMenu(true);
    };
    const handleClose = () => {
        setOpenMenu(false);
    };

    const navigateToHome = () => {
        navigate("/home/feed");
    };
    return (
        <div className={isMobile ? "sidebar-mobile" : "sidebar-container"}>
            <div className="logo-home" onClick={navigateToHome}>
                <Logo height={36} width={36} />
            </div>
            <StyledLink to="/home/feed">
                <SidebarOptions active={false} Icon={HomeIcon} text="Home" />
            </StyledLink>
            <StyledLink to="/home/explore">
                <SidebarOptions
                    active={false}
                    Icon={SearchIcon}
                    text="Explore"
                />
            </StyledLink>
            <StyledLink to="/home/notifications">
                <SidebarOptions
                    active={false}
                    Icon={NotificationsIcon}
                    text="Notifications"
                />
            </StyledLink>
            <StyledLink to="/home/bookmarks">
                <SidebarOptions
                    active={false}
                    Icon={BookmarkBorderIcon}
                    text="Bookmarks"
                />
            </StyledLink>
            <StyledLink to="/home/lists">
                <SidebarOptions
                    active={false}
                    Icon={ListAltIcon}
                    text="Lists"
                />
            </StyledLink>
            <StyledLink to="/home/profile">
                <SidebarOptions
                    active={false}
                    Icon={PermIdentityIcon}
                    text="Profile"
                />
            </StyledLink>

            <Button className="sidebar-tweet">Tweet</Button>
            <div className="profile-info">
                <Avatar src={userProfilePic} />
                <div className="user-info">
                    <h4>{fullName}</h4>
                    <h5>@{username}</h5>
                </div>
                <IconButton
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={openMenu ? "basic-menu" : ""}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? "true" : ""}
                    onClick={handleClick}
                >
                    <MoreHorizIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    open={openMenu}
                    onClick={handleClose}
                    onClose={handleClose}
                >
                    <MenuItem className="profile-info1">
                        <Avatar />
                        <div className="user-info ">
                            <div className="user-details">
                                <h4>{fullName}</h4>
                                <h5>@{username}</h5>
                            </div>
                            <ListItemIcon className="done-icon">
                                <DoneIcon />
                            </ListItemIcon>
                        </div>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                        Add an existing account
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Log out</MenuItem>
                </Menu>
            </div>
        </div>
    );
}

export default Sidebar;
