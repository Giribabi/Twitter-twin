import React from "react";
import "./Widgets.css";
import { TwitterTimelineEmbed, TwitterTweetEmbed } from "react-twitter-embed";
import SearchIcon from "@mui/icons-material/Search";

function Widgets() {
    return (
        <div className="widgets">
            <div className="widget-header">
                <div className="widget-search-input">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search here"
                    />
                    <SearchIcon className="search-icon" />
                </div>
                <h2>What's happening?</h2>
            </div>
            <div className="widgets-list">
                <TwitterTweetEmbed tweetId={"933354946111705097"} />
                <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="elonmusk"
                    options={{ height: 400 }}
                />
            </div>
        </div>
    );
}

export default Widgets;
