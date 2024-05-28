import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import auth from "../../firebase.init";

function ProtectedRoute({ children }) {
    const [user, isLoading] = useAuthState(auth);
    console.log(user);
    return (
        <div>
            {isLoading ? (
                "loading"
            ) : (
                <div className="">
                    {user ? children : <Navigate to="/login" />}
                </div>
            )}
        </div>
    );
}

export default ProtectedRoute;
