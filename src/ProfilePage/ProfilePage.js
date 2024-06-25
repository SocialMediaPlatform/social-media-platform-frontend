import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../AuthContext";
import Header from '../HomePage/components/Header';
import Post from '../HomePage/components/Post';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faXmark } from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
    const navigate = useNavigate();

    const { userToken, userId, apiUrl } = useContext(AuthContext);

    const [user, setUser] = useState(null);
    const [isFollowed, setIsFollowed] = useState(null);

    const [posts, setPosts] = useState([]);
    const [editingUsername, setEditingUsername] = useState(false);
    const { userid } = useParams();

    const relationTypes = {
        follow: 1,
        mute: 2,
        block: 3
    }

    const fetchPosts = async () => {
        try {
            const response = await fetch(apiUrl + '/api/v1/post/' + userid, {
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
            setPosts(result);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const fetchUser = async () => {
        try {
            const response = await fetch(apiUrl + '/api/v1/user/' + userid, {
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
            console.log(result);
            setUser(result);
            setIsFollowed(result.followed);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    useEffect(() => {
        if (userToken) {
            fetchUser();
            fetchPosts();
        }
    }, [userToken, userid]);

    useEffect(() => {
        if(editingUsername)
            document.getElementById('username')?.focus();
    }, [editingUsername]);

    const handleStartEditUsername = () => {
        setEditingUsername(true);
    }

    const handleCancelEditUsername = () => {
        setEditingUsername(false);
        document.getElementById('username').innerText = user.username;
    }

    const handleConfirmEditUsername = async () => {
        try {
            const response = await fetch(apiUrl + '/api/v1/user/setUsername/' + document.getElementById('username').innerText, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }
            fetchUser();
            setEditingUsername(false);
        } catch (error) {
            console.error('Error adding reaction:', error);
        }
    }

    const handleFollowUser = async () => {
        const requestBody = {
            userId: userId,
            targetUserId: parseInt(user.userId),
            relationTypeId: relationTypes.follow
        }
        try {
            const response = await fetch(apiUrl + '/api/v1/userRelation/set', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                credentials: 'include',
                body: JSON.stringify(requestBody) 
            });
            if (response.ok) {
                setIsFollowed(true);
            }
        } catch (error) {
            console.error('Error following user:', error);
        }
    };

    const handleBlockUser = async () => {
        const requestBody = {
            userId: userId,
            targetUserId: parseInt(user.userId),
            relationTypeId: relationTypes.block
        }
        try {
            const response = await fetch(apiUrl + '/api/v1/userRelation/set', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                credentials: 'include',
                body: JSON.stringify(requestBody) 
            });
            if (response.ok) {
                console.log(response);
                navigate('/home');
            }
        } catch (error) {
            console.error('Error blocking user:', error);
        }
    };

    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <div className='bg-backgroundGrey flex flex-1 justify-center items-stretch'>
                <div className='box-border border border-t-backgroundGrey border-borderGrey flex-col flex-grow max-w-2xl bg-backgroundGrey'>
                    {user ?
                        <div className='p-4 border-b border-borderGrey'>
                            <div className='flex flex-row items-center p-4'>
                                <div className='rounded-full h-20 w-20 flex items-center justify-center bg-avatarGrey text-white text-5xl'>
                                    {user.username[0].toUpperCase()}
                                </div>
                                <div className='ml-4'>
                                    <p id='username' className='text-white text-3xl' contentEditable={editingUsername}>{user.username}</p>
                                </div>
                                {userid == userId ? editingUsername ?
                                <>
                                    <button onClick={handleConfirmEditUsername} className='flex items-center'>
                                        <FontAwesomeIcon icon={faCheck} className={`text-3xl ml-2 transition duration-200 hover:text-hoverTextGrey text-textGrey`} />
                                    </button>
                                    <button onClick={handleCancelEditUsername} className='flex items-center'>
                                        <FontAwesomeIcon icon={faXmark} className={`text-3xl ml-2 transition duration-200 hover:text-hoverTextGrey text-textGrey`} />
                                    </button>
                                </>
                                :
                                    <button onClick={handleStartEditUsername} className='flex items-center'>
                                        <FontAwesomeIcon icon={faPen} className={`text-2xl ml-2 transition duration-200 hover:text-hoverTextGrey text-textGrey`} />
                                    </button>
                                : 
                                <div className='flex flex-col justify-between items-center ml-auto'>
                                    <button 
                                        onClick={handleFollowUser} 
                                        className={`mt-2 ml-auto bg-lightRed text-white p-2 rounded-md w-full ${isFollowed ? 'cursor-not-allowed opacity-50' : ''}`}
                                        disabled={isFollowed}>
                                        {isFollowed ? 'Followed' : 'Follow'}
                                    </button>
                                    <button
                                        onClick={handleBlockUser}
                                        className='mt-2 ml-auto bg-lightRed text-white p-2 rounded-md w-full'>
                                        Block
                                    </button>
                                </div>}
                            </div>
                            {
                                userid == userId ?
                                <div className='flex flex-row items-center pt-4 border-t border-borderGrey'>
                                    <div className='px-4 border-r border-borderGrey'>
                                        <p className='text-white text-xl'>e-mail</p>
                                    </div>
                                    <div className='ml-4 flex-grow'>
                                        <p className='text-white text-xl'>{user.email}</p>
                                    </div>
                                </div>
                                : <></>
                            }
                        </div>
                    : <></>}
                {posts.map(post => (
                    <Post key={post.id} post={post} />
                ))}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

