import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

function StyledLink({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
    console.log(resolved, match);
    return (
        <div>
            <Link
                style={{
                    textDecoration: "none",
                    color: match ? "var(--twitter-color)" : "black",
                }}
                to={to}
                {...props}
            >
                {children}
            </Link>
        </div>
    );
}

export default StyledLink;
