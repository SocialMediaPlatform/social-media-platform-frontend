import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane}  from '@fortawesome/free-solid-svg-icons';



const ConvModal = ({ content, addGroup, closeModal }) => {
    console.log(content);
    let messagesArray = [...content.messages];
    messagesArray.reverse();
    const [users, setUsers] = useState(content.recipients);
    const [messages, setMessages] = useState(messagesArray);
    const [newMessage, setNewMessage] = useState('');
    const { apiUrl, userToken, userId } = useContext(AuthContext);
    console.log(userId);

    const handleSend = async (e) => {
        e.preventDefault();
        if (userToken && isMessageValid) {
            let messagePayload;
            if (users.length > 1) {
                messagePayload = {
                    recipientUserIds: users.map(user => user.userId),
                    messageContent: newMessage
                };
            } else {
                messagePayload = {
                    recipientUserIds: [users[0].userId],
                    messageContent: newMessage
                };
            }
            try {
                if (!content.conversationId) {
                    const response = await fetch(apiUrl + '/api/v1/conversations/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userToken}`
                        },
                        body: JSON.stringify(messagePayload)
                    });
                    if (!response.ok) {
                        throw new Error('Failed to create new conversation');
                    }
                    const result = await response.json();
                    setMessages([...result.messages, ...messages]);
                    if (users.filter(user => user.userId !== userId).length > 1) {
                        addGroup({conversationId: result.conversationId, recipients: users})
                    }
                } else {
                    const response = await fetch(apiUrl + '/api/v1/conversations/sendMessage', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userToken}`
                        },
                        body: JSON.stringify({
                            conversationId: content.conversationId,
                            messageContent: messagePayload.messageContent
                        })
                    });
                    if (!response.ok) {
                        throw new Error('Failed to send message');
                    }
                    const result = await response.json();
                    setMessages([result, ...messages]);
                }
                setNewMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const getUsernameById = (userId) => {
        const user = users.find(user => user.userId === userId);
        return user ? user.username: 'Unknown user';
    };

    const isMessageValid = newMessage.trim() !== '';

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75'>
            <div className='bg-convModalGrey h-[calc(100%-10rem)] rounded-2xl shadow-2xl max-w-7xl w-full flex flex-col'>
                <div className='shadow-md flex flex-row p-4 space-x-4'>
                    <div className='flex-1 mt-2'>
                        <h2 className='text-2xl font-extrabold text-white '>{users.map(user => user.username).join(', ')}</h2>
                    </div>
                    <button
                        type='button'
                        onClick={closeModal}
                        className='text-gray-400 hover:text-gray-200'
                    >
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                        </svg>
                    </button>
                </div>
                <div className='overflow-auto h-full my-8 px-6 flex flex-col-reverse'>
                    {messages.map((message, index) => (
                    <div key={index} className='flex flex-row items-center mt-4'>
                        {parseInt(message.senderId) === parseInt(userId) ? (
                            <div className='flex justify-end w-full'>
                                <div className='p-4 rounded-3xl max-w-lg inline-block break-words text-white bg-lightRed'>
                                    {message.content}
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
                                        {message.content}
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
                        className={`scale-150 bg-lightRed p-2 rounded-full flex items-center justify-center ${
                            isMessageValid ? 'transition duration-200 hover:bg-hoverRed' : 'opacity-50 cursor-not-allowed'
                        }`}
                        aria-label="Send message"
                        disabled={!isMessageValid}
                    >
                        <FontAwesomeIcon icon={faPaperPlane} className="text-convModalGrey" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ConvModal;
