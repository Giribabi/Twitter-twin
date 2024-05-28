import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Home from "./Pages/Home/Home.jsx";
import ProtectedRoute from "./Pages/ProtectedRoute/ProtectedRoute";

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
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/signup" element={<Signup />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
