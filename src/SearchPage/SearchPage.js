import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../AuthContext";
import Header from '../HomePage/components/Header';
import { useNavigate, useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
    const query = useQuery();
    const username = query.get('username');
    const { userToken, userId, apiUrl } = useContext(AuthContext);

    const [users, setUsers] = useState([])

    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await fetch(apiUrl + '/api/v1/user/search?username=' + username, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userToken}`
                },
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }
            const result = await response.json();
            setUsers(result);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        if (userToken) {
            fetchUsers();
        }
    }, [userToken, username]);

    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <div className='bg-backgroundGrey flex flex-1 justify-center items-stretch'>
                <div className='box-border border border-t-backgroundGrey border-borderGrey flex-col flex-grow max-w-2xl bg-backgroundGrey'>
                    {users.map(user => 
                        <div className='p-4 border-b border-borderGrey transition duration-300 hover:bg-hoverBackgroundGrey cursor-pointer' onClick={() => navigate('/profile/' + user.userId)}>
                            <div className='flex flex-row items-center p-4'>
                                <div className='rounded-full h-20 w-20 flex items-center justify-center bg-avatarGrey text-white text-5xl'>
                                    {user.username[0].toUpperCase()}
                                </div>
                                <div className='ml-4'>
                                    <p id='username' className='text-white text-3xl'>{user.username}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;

