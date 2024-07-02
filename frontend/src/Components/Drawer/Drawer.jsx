import React from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "../Sidebar/Sidebar";

function SideBarDrawer({ openDrawer, closeDrawer, handleLogout }) {
    return (
        <Drawer anchor="left" open={openDrawer} onClose={closeDrawer}>
            <div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                    }}
                >
                    <IconButton onClick={closeDrawer} sx={{ margin: 1 }}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Sidebar handleLogout={handleLogout} />
            </div>
        </Drawer>
    );
}

export default SideBarDrawer;
