import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import Widgets from "../Components/Widgets/Widgets";

const useLoggedinUser = () => {
    const user = useAuthState(auth);
    // console.log(user);
    const email = user[0]?.email;
    const [loggedinUser, setLoggedinUser] = useState({});
    useEffect(() => {
        fetch(`http://localhost:3030/loggedUser?email=${email}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setLoggedinUser(data);
            });
    }, [email]);
    return [loggedinUser, setLoggedinUser];
};

export default useLoggedinUser;
