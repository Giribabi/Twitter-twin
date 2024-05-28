// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCQE7sLnSXq4ZO1WBWJohnxEVSg_yax7zk",
    authDomain: "twitter-like-project-8c6cd.firebaseapp.com",
    projectId: "twitter-like-project-8c6cd",
    storageBucket: "twitter-like-project-8c6cd.appspot.com",
    messagingSenderId: "533063577235",
    appId: "1:533063577235:web:ad93d65e38e670571ba766",
    measurementId: "G-1HHJ6MZJL5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const auth = getAuth(app);
export default auth;
