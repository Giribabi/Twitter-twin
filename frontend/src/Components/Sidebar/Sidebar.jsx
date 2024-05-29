import React, { useState } from "react";
import Logo from "../Logo/Logo";
import "./Sidebar.css";
import SidebarOptions from "./SidebarOptions";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreIcon from "@mui/icons-material/More";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StyledLink from "../StyledLink/StyledLink";
import { Link } from "react-router-dom";
import {
    Avatar,
    Button,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    Menu,
    MenuItem,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

function Sidebar({ handleLogout, user }) {
    const [openMenu, setOpenMenu] = useState(false);
    const handleClick = () => {
        setOpenMenu(true);
    };
    const handleClose = () => {
        setOpenMenu(false);
    };
    return (
        <div className="sidebar-container">
            <Logo height={36} width={36} />
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
            <StyledLink to="/home/messages">
                <SidebarOptions
                    active={false}
                    Icon={MailOutlineIcon}
                    text="Messages"
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
            <StyledLink to="/home/more">
                <SidebarOptions active={false} Icon={MoreIcon} text="More" />
            </StyledLink>
            <Button className="sidebar-tweet">Tweet</Button>
            <div className="profile-info">
                <Avatar />
                <div className="user-info">
                    <h4>Giridhar</h4>
                    <h5>@giribabi</h5>
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
                        <div className="user-info subUser-info">
                            <div className="">
                                <h4>Sammidi Giridhar</h4>
                                <h5>@giribabi</h5>
                            </div>
                            <ListItemIcon className="done_icon">
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
