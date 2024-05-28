import React from "react";
import logo from "../../assets/AppLogo.jpg";

function Logo({ height, width }) {
    return (
        <div>
            <img
                src={logo}
                alt="logo"
                style={{ borderRadius: "20%" }}
                width={height || "42"}
                height={width || "42"}
            />
        </div>
    );
}

export default Logo;
