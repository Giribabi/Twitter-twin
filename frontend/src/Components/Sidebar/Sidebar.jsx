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
            <SidebarOptions active={false} Icon={HomeIcon} text="Home" />
            <SidebarOptions active={false} Icon={SearchIcon} text="Explore" />
            <SidebarOptions
                active={false}
                Icon={NotificationsIcon}
                text="Notifications"
            />
            <SidebarOptions
                active={false}
                Icon={MailOutlineIcon}
                text="Messages"
            />
            <SidebarOptions
                active={false}
                Icon={BookmarkBorderIcon}
                text="Bookmarks"
            />
            <SidebarOptions active={false} Icon={ListAltIcon} text="Lists" />
            <SidebarOptions
                active={false}
                Icon={PermIdentityIcon}
                text="Profile"
            />
            <SidebarOptions active={false} Icon={MoreIcon} text="More" />
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
