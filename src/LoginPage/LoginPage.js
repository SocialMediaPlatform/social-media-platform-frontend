import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import ResetPasswordModal from "./ResetPasswordModal";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password)
            .then(() => {
                navigate("/");
            })
            .catch(err => {
                alert("Login failed");
            });
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="h-screen flex bg-backgroundGrey">
            <div className="flex-1 flex items-center justify-center">
                <div className="text-white text-9xl font-bold">SMP</div>
            </div>
            <div className="border-l border-borderGrey mt-28 mb-28 bg-backgroundGrey">
            </div>
            <div className="flex-1 flex items-center justify-center">
                <div className="max-w-2xl w-full space-y-10 p-20 rounded-xl">
                    <div className="text-center">
                        <h2 className="text-5xl font-extrabold text-white">Sign in to SMP</h2>
                        <p className="mt-5 text-lg text-textGrey">Don't hesitate.</p>
                    </div>
                    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                        <div className="rounded-md">
                            <div className="mb-4">
                                <label htmlFor="username" className="sr-only">Username</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="input-base"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="input-base"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="text-center mt-4">
                                <button
                                    type="button"
                                    onClick={openModal}
                                    className="font-medium text-lightRed hover:text-hoverRed"
                                >
                                    Forgot your password?
                                </button>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="login-register-button-base"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div className="text-center mt-4">
                        <p className="text-textGrey">Don't have an account? <a href="register" className="font-medium text-lightRed hover:text-hoverRed">Sign up</a></p>
                    </div>
                </div>
            </div>
            {isModalOpen && <ResetPasswordModal closeModal={closeModal}/>}
        </div>
    );
};
                
export default LoginPage;
