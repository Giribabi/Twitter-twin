import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import ReactLoading from "react-loading";
import axios from "axios";
import "./Comments.css";

function Comments({ currPost }) {
    const { username } = currPost;
    const postId = currPost._id;
    const [commentBody, setCommentBody] = useState("");
    const [comments, setComments] = useState([]);
    const [fetchingComments, setFetchingComments] = useState(false);
    const [postingComment, setPostingComment] = useState(false);

    const formatDate = (rawDate) => {
        const date = new Date(rawDate);
        const options = {
            timeZone: "Asia/Kolkata",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        };
        const ISTdateTime = date.toLocaleString("en-US", options);
        return ISTdateTime;
    };

    const fetchComments = async () => {
        if (postId) {
            setFetchingComments(true);
            try {
                const { data } = await axios.post(
                    `https://giribabi-twitter-twin-api.onrender.com/posts/${postId}/all-comments`
                );
                setComments(data);
            } catch (error) {
                console.log(error);
            }
            setFetchingComments(false);
        }
    };

    const sendComment = async () => {
        if (commentBody) {
            setPostingComment(true);
            try {
                const comment = {
                    username,
                    commentBody,
                    postId,
                };
                await axios.post(
                    `https://giribabi-twitter-twin-api.onrender.com/posts/${postId}/comment`,
                    comment
                );
                fetchComments();
            } catch (error) {
                console.log(error);
            }
            setPostingComment(false);
        }
        setCommentBody("");
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    return (
        <div className="comments-box">
            {postingComment ? (
                <div className="comments-loading-container">
                    <ReactLoading
                        type={"bubbles"}
                        color={"grey"}
                        height={65}
                        width={80}
                    />
                </div>
            ) : (
                <div className="comment-input">
                    <TextField
                        value={commentBody}
                        onChange={(e) => setCommentBody(e.target.value)}
                        className="comment-text"
                        label="Comment here"
                        multiline
                        rows={1.5}
                        variant="standard"
                        fullWidth
                    />
                    <div className="send-comment-box">
                        <Button
                            className="send-comment-button"
                            variant="contained"
                            onClick={sendComment}
                        >
                            Send
                        </Button>
                    </div>
                </div>
            )}
            {fetchingComments ? (
                <div className="comments-loading-container">
                    <ReactLoading
                        type={"spinningBubbles"}
                        color={"grey"}
                        height={65}
                        width={80}
                    />
                </div>
            ) : (
                <div className="comments-list">
                    {comments.map((comment, index) => (
                        <div key={index} className="single-comment">
                            <div className="comment-header">
                                <div className="comment-username">
                                    <b> @{comment.username}</b>
                                </div>
                                <div className="comment-date">
                                    <small>
                                        {formatDate(comment.createdAt)}
                                    </small>
                                </div>
                            </div>
                            <div className="comment-body">
                                {comment.commentBody}
                            </div>
                        </div>
                    ))}
                    {comments.length === 0 && (
                        <div className="comments-loading-container">
                            No comments yet.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Comments;
