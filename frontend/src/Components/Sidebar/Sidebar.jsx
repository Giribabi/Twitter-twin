import React from "react";
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
// import DoneIcon from "@mui/icons-material/Done"

function Sidebar() {
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
        </div>
    );
}

export default Sidebar;
