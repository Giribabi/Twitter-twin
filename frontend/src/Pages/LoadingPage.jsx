import React from "react";
import ReactLoading from "react-loading";
// use spokes, spinningBubbles or bubbles for loading type

function LoadingPage() {
    return (
        <div>
            <div
                style={{
                    height: "100vh",
                    width: "100vw",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "black",
                }}
            >
                <ReactLoading
                    type={"spokes"}
                    color={"#50b7f5"}
                    height={75}
                    width={75}
                />
            </div>
        </div>
    );
}

export default LoadingPage;
