import React from 'react';

const ConvSidebar = ({ users, groups, userSelect, groupSelect }) => {
    return (
        <div className='opacity-50 border-l border-borderGrey w-full h-full text-white'>
            <div className='p-5 '>
                <p className='text-2xl '>Followed users</p>
            </div>
            <ul>
                {users.map(user => (
                    <li key={user.id} onClick={() => userSelect(user)} className='flex flex-grow p-4 text-lg transition duration-200 hover:bg-hoverConvGrey cursor-pointer'>
                        <div className='rounded-full h-8 w-8 mr-4 flex items-center justify-center bg-avatarGrey text-white'>
                            {user.username[0].toUpperCase()}
                        </div>
                        <p className='mt-0.5'>{user.username}</p>
                    </li>
                ))}
            </ul>
            <div className='mx-8 border-b border-borderGrey'></div>
            <div className='p-5'>
                <p className='text-2xl '>Groups</p>
            </div>
            <ul>
                {groups.map(group => (
                    <li key={group.id} onClick={() => groupSelect(group)} className='flex flex-row p-4 text-lg transition duration-200 hover:bg-hoverConvGrey cursor-pointer'>
                        <div className='rounded-full h-8 w-8 mr-4 flex items-center justify-center bg-avatarGrey text-white'>
                            {group.name[0].toUpperCase()}
                        </div>
                        <p className='mt-0.5'>{group.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ConvSidebar;