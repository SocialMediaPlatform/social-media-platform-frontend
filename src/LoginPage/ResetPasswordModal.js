import React, { useState } from "react";

const ResetPasswordModal = ({ closeModal }) => {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // implement logic for post request
        alert(`Reset link sent to ${emailOrUsername}`);
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
                    <p className="text-xl text-textGrey mb-12">Enter the email or username associated with your account to change your password.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-96">
                        <label htmlFor="emailOrUsername" className="sr-only">Email or Username</label>
                        <input
                            id="emailOrUsername"
                            name="emailOrUsername"
                            type="text"
                            placeholder="Email or Username"
                            value={emailOrUsername}
                            onChange={(e) => setEmailOrUsername(e.target.value)}
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
