import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const useLoggedinUser = () => {
    const user = useAuthState(auth);
    const email = user[0]?.email;
    const [loggedinUser, setLoggedinUser] = useState({});
    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3030/loggedUser?email=${email}`
                );
                const data = await response.json();
                // console.log(data);
                setLoggedinUser(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchLoggedInUser();
    }, [email]);

    return [loggedinUser, setLoggedinUser];
};

export default useLoggedinUser;
