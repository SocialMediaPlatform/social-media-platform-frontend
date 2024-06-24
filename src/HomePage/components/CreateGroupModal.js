import React, { useState } from 'react';

const CreateGroupModal = ({ users, closeCreateGroupModal, openConvModal }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleUserSelect = (userId) => {
        const user = users.find(user => user.userId === userId);
        if (user) {
            if (selectedUsers.some(selectedUser => selectedUser.userId === userId)) {
                setSelectedUsers(selectedUsers.filter(selectedUser => selectedUser.userId !== userId));
            } else {
                setSelectedUsers([...selectedUsers, user]);
            }
        }
    };

    const handleSubmit = () => {
        openConvModal(selectedUsers);
        closeCreateGroupModal();
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75'>
            <div className='bg-convModalGrey h-[calc(100%-30rem)] rounded-2xl shadow-2xl max-w-xl w-full flex flex-col'>
                <div className='flex justify-between items-center p-4'>
                    <h2 className='text-2xl font-extrabold text-white'>Group creation</h2>
                    <button
                        type='button'
                        onClick={closeCreateGroupModal}
                        className='text-gray-400 hover:text-gray-200'
                    >
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                        </svg>
                    </button>
                </div>
                <div className='border-b border-borderGrey mx-4 mb-4'></div>
                <div className="relative mb-4 px-8 ">
                    <button
                        type='button'
                        onClick={toggleDropdown}
                        className='bg-messageGrey text-white p-2 rounded-md flex items-center justify-between w-full'
                    >
                        Add users
                        <svg xmlns='http://www.w3.org/2000/svg' className={`h-5 w-5 transform transition-transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
                        </svg>
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute z-10 w-[calc(100%-4rem)] rounded-md shadow-lg mt-2 max-h-60 overflow-y-auto">
                            <ul>
                                {users.map(user => (
                                    <li
                                        key={user.userId}
                                        onClick={() => handleUserSelect(user.userId)}
                                        className='w-full p-2 cursor-pointer flex text-white items-center justify-between bg-messageGrey hover:bg-hoverTextGrey'
                                    >
                                        {user.username}
                                        {selectedUsers.some(selectedUser => selectedUser.userId === user.userId) && (
                                            <span className='h-2 w-2 bg-lightRed rounded-full'></span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className='mb-4 overflow-auto'>
                    <p className='p-4 font-extrabold text-white text-2xl'>
                        Selected users:
                    </p>
                    <ul>
                        {selectedUsers.map(user => (
                            <li key={user.id} className='flex flex-grow p-4 text-lg transition duration-200 hover:bg-hoverConvGrey'>
                                <div className='rounded-full h-8 w-8 mr-4 flex items-center justify-center bg-avatarGrey text-white'>
                                    {user.username[0].toUpperCase()}
                                </div>
                                <p className='mt-0.5 text-white'>{user.username}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='border-b border-borderGrey mx-4 mt-auto'></div>
                <div className='p-8'>
                    <button
                        type='button'
                        onClick={handleSubmit}
                        className={`bg-lightRed p-2 rounded-md text-white w-full ${selectedUsers.length < 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={selectedUsers.length < 2}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateGroupModal;
