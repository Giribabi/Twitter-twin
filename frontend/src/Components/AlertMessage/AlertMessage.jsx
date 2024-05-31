import React from "react";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import "./AlertMessage.css";

export default function SnackbarExample({ open, setOpen, message, type }) {
    const handleClose = (reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={1700}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                {open && (
                    <Alert
                        onClose={handleClose}
                        variant="filled"
                        severity={type}
                        className={`alert-${type}`}
                    >
                        {message}
                    </Alert>
                )}
            </Snackbar>
        </div>
    );
}
