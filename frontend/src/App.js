import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Home from "./Pages/Home/Home.jsx";
import ProtectedRoute from "./Pages/ProtectedRoute/ProtectedRoute";
import Notifications from "./Pages/Notifications/Notifications.jsx";
import Bookmarks from "./Pages/Bookmarks/Bookmarks.jsx";
import Lists from "./Pages/Lists/Lists.jsx";
import Messages from "./Pages/Messages/Messages.jsx";
import More from "./Pages/More/More.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import Explore from "./Pages/Explore/Explore.jsx";
import Feed from "./Pages/Feed/Feed.jsx";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    ></Route>
                    <Route index element={<Feed />}></Route>
                    <Route
                        path="/home"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="feed" element={<Feed />}></Route>
                        <Route path="explore" element={<Explore />}></Route>
                        <Route
                            path="notifications"
                            element={<Notifications />}
                        ></Route>
                        <Route path="messages" element={<Messages />}></Route>
                        <Route path="bookmarks" element={<Bookmarks />}></Route>
                        <Route path="lists" element={<Lists />}></Route>
                        <Route path="profile" element={<Profile />}></Route>
                        <Route path="more" element={<More />}></Route>
                    </Route>
                    <Route path="login" element={<Login />}></Route>
                    <Route path="signup" element={<Signup />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
