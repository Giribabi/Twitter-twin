import React from "react";
import "../Pages.css";
import View from "./View/View";
import useLoggedinUser from "../../hooks/useLoggedinUser";

function Profile() {
    const [loggedinUser] = useLoggedinUser();
    return (
        <div className="profile-page">
            <View user={loggedinUser} />
        </div>
    );
}

export default Profile;
