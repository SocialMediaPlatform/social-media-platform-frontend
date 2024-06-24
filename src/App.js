import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import ProfilePage from "./ProfilePage/ProfilePage";
import ResetPasswordPage from "./ResetPasswordPage/ResetPasswordPage";
import PostPage from "./PostPage/PostPage";
import { AuthContext, AuthProvider } from "./AuthContext";
import './index.css'

const CheckAuth = () => {
    const { userToken } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            console.log(userToken);
            if (userToken) {
                navigate("/home");
            } else {
                navigate("/login");
            }
        };
    checkAuthStatus();
    }, [userToken, navigate])

    return null;
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<CheckAuth />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/register/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/post/:postid" element={<PostPage />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
