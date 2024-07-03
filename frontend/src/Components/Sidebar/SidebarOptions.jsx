import React from "react";
import "./Sidebar.css";

function SidebarOptions({ active, text, Icon, closeDrawer }) {
    return (
        <div
            onClick={closeDrawer}
            className={`sidebarOption ${active && "sidebarOption-active"}`}
        >
            <Icon />
            <h2>{text}</h2>
        </div>
    );
}

export default SidebarOptions;
