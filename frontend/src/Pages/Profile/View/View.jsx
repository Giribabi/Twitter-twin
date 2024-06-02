import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./View.css";
import { useNavigate } from "react-router-dom";

function View() {
    const navigate = useNavigate();
    return (
        <div className="view-profile">
            <ArrowBackIcon
                className="arrow-icon"
                onClick={() => navigate("/")}
            />
        </div>
    );
}

export default View;
