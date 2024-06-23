import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ResetPasswordPage = () => {
    const query = useQuery();
    const token = query.get('token');
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { resetPassword } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        resetPassword(password, token)
            .then(() => {
                navigate("/");
            })
            .catch(err => {
                alert("Password reset failed");
            });
    };

    return (
        <div className="h-screen flex bg-backgroundGrey">
            <div className="flex-1 flex items-center justify-center">
                <div className="max-w-md w-full space-y-8 p-10 rounded-xl ">
                    <div className="text-center mb-32">
                        <h2 className="text-6xl font-extrabold text-white">SMP</h2>
                        <p className="mt-5 text-lg text-textGrey">Resetting password</p>
                    </div>
                    <form className="mt-8 space-y-12" onSubmit={handleSubmit}>
                        <div className="rounded-md">
                            <div className="mb-4">
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="input-base"
                                    placeholder="New Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                                <input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="input-base"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="login-register-button-base"
                            >
                                Reset password
                            </button>
                        </div>
                    </form>
                    <div className="text-center mt-4">
                        <p className="text-textGrey">Already have an account? <a href="login" className="font-medium text-lightRed hover:text-hoverRed">Sign in</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;

