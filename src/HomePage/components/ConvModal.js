import React, { useContext, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';



const ConvModal = ({ content, closeModal }) => {
    let messagesArray = [...content.messages];
    messagesArray.reverse();
    const [users, setUsers] = useState(content.recipients);
    const [messages, setMessages] = useState(messagesArray);
    const [newMessage, setNewMessage] = useState(null);
    const { userToken, userId } = useContext(AuthContext);

    const handleSend = (e) => {
        if(userToken) {
            
        }
    };

    const getUsernameById = (userId) => {
        const user = users.find(user => user.userId === userId);
        return user ? user.username: 'Unknown user';
    };


    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75'>
            <div className='bg-convModalGrey h-[calc(100%-10rem)] rounded-2xl shadow-2xl max-w-7xl w-full flex flex-col'>
                <div className='shadow-md flex flex-row p-4 space-x-4'>
                    <button
                        type='button'
                        onClick={closeModal}
                        className='text-gray-400 hover:text-gray-200 '
                    >
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                        </svg>
                    </button>
                    <div className='flex-1 mt-2'>
                        <h2 className="text-2xl font-extrabold text-white ">{users.map(user => user.username).join(', ')}</h2>
                    </div>
                </div>
                <div className='overflow-auto h-full my-8 px-6 flex flex-col-reverse'>
                    {messages.map((message, index) => (
                    <div key={index} className='flex flex-row items-center mt-4'>
                        {message.senderId === userId ? (
                            <div className='flex justify-end w-full'>
                                <div className='p-4 rounded-3xl max-w-lg inline-block break-words text-white bg-lightRed'>
                                    {message.messageContent}
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className='rounded-full h-10 w-10 mt-8 mr-4 flex items-center justify-center bg-avatarGrey text-white'>
                                    {getUsernameById(message.senderId)[0].toUpperCase()}
                                </div>
                                <div className='flex flex-col'>
                                    <p className='text-textGrey text-md ml-4 mr-auto'>
                                        {getUsernameById(message.senderId)}
                                    </p>
                                    <div className='p-4 rounded-3xl max-w-lg inline-block break-words text-white bg-messageGrey'>
                                        {message.messageContent}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    ))}
                </div>
                <form onSubmit={handleSend} className='shadow-lg flex items-center px-6 py-4 space-x-4'>
                    <input
                        id='newMessage'
                        name='newMessage'
                        type='text'
                        placeholder='Aa'
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className='input-base flex-grow'
                    />
                    <button
                        type='submit'
                            className='scale-150 p-2 bg-lightRed rounded-full flex items-center justify-center'
                            aria-label="Send message"
                    >
                        <FontAwesomeIcon icon={faPaperPlane} className="text-convModalGrey" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ConvModal;
