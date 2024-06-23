import React, { useState } from 'react';

const ConvModal = ({ content, closeModal }) => {
    const users = content.usernames;
    const [message, setMessage] = useState(null);
    const handleSend = (e) => {

    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-convModalGrey p-20 rounded-2xl shadow-2xl max-w-7xl w-full ">
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
                    <h2 className="text-2xl font-extrabold text-white mb-4">{content.usernames.join(', ')}</h2>
                </div>
                <form onSubmit={handleSend}>
                    <div className='flex flex-row'>
                        <div className="mb-96">
                            <label htmlFor="emailOrUsername" className="sr-only">Aa</label>
                            <input
                                id="message"
                                name="message"
                                type="text"
                                placeholder="Aa"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="input-base"
                            />
                        </div>
                        <div className="justify-center">
                            <button
                                type="submit"
                                className="login-register-button-base"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ConvModal;
