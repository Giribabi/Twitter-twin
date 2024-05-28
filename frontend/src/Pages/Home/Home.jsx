import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Feed from "../../Components/Feed/Feed";
import Widgets from "../../Components/Widgets/Widgets";
import "./Home.css";

function Home() {
    return (
        <div className="home-container">
            <Sidebar />
            <Feed />
            <Widgets />
        </div>
    );
}

export default Home;
