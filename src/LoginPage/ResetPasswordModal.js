import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../AuthContext";

const ResetPasswordModal = ({ closeModal }) => {
    const [email, setEmail] = useState("");
    const { userToken, userId, apiUrl } = useContext(AuthContext);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(apiUrl + '/api/v1/auth/password-reset-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({email})
            });
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }
        } catch (error) {
            console.error('Error sending request:', error);
        }
        alert(`Reset link sent to ${email}`);
        closeModal();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-black p-20 rounded-2xl shadow-2xl max-w-3xl w-full ">
                <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-px left-px scale-150 text-gray-400 hover:text-gray-200 p-8"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="text-center">
                    <h2 className="text-2xl font-extrabold text-white mb-4">Reset your password</h2>
                    <p className="text-xl text-textGrey mb-12">Enter the email associated with your account to receive your password.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-96">
                        <label htmlFor="emailOrUsername" className="sr-only">Email or Username</label>
                        <input
                            id="emailOrUsername"
                            name="emailOrUsername"
                            type="text"
                            placeholder="Email or Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-base"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="login-register-button-base"
                        >
                            Send Reset Link
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordModal;
