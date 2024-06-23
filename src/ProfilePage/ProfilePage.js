import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../AuthContext";
import Header from '../HomePage/components/Header';
import Post from '../HomePage/components/Post';

const ProfilePage = () => {
    const { userToken } = useContext(AuthContext);

    const [user, setUser] = useState({
        username: 'mock',
        email: 'mock@example.com'
    })

    const [posts, setPosts] = useState([
        { id: 1, username: 'mock', likes: 5, comments: 2, isLiked: false, content: 'Test post 1\ndkamskldmaskldmklasmdklas\nmakldmaskldmklasmdklasm\nmaskdmaskldmaskldmaklsm' },
        { id: 2, username: 'mock', likes: 3, comments: 1, isLiked: true, content: 'Test post 2' },
    ]);

    // This should load the user data from the API, but the API doesn't seem to have that feature yet
    // useEffect(() => {
    //     if (userToken) {
    //         const fetchPosts = async () => {
    //             try {
    //                 const response = await fetch('/api/v1/user', {
    //                     method: 'GET',
    //                     headers: {
    //                         'Authorization': `Bearer ${userToken}`
    //                     },
    //                     credentials: 'include'
    //                 });
    //                 if (!response.ok) {
    //                     throw new Error(`${response.status}`);
    //                 }
    //                 const result = await response.json();
    //                 setUser(result);
    //             } catch (error) {
    //                 console.error('Error fetching posts:', error);
    //             }
    //         };
    //         fetchPosts();
    //     }
    // }, [userToken]);

    // This should work, but uses hardcoded user id for now
    useEffect(() => {
        if (userToken) {
            const fetchPosts = async () => {
                try {
                    const response = await fetch('/api/v1/post/1', {
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
            fetchPosts();
        }
    }, [userToken]);

    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <div className='bg-backgroundGrey flex flex-1 justify-center items-stretch'>
                <div className='box-border border border-t-backgroundGrey border-borderGrey flex-col flex-grow max-w-2xl bg-backgroundGrey'>
                    <div className='p-4 border-b border-borderGrey'>
                        <div className='flex flex-row items-center p-4'>
                            <div className='rounded-full h-20 w-20 flex items-center justify-center bg-avatarGrey text-white text-5xl'>
                                {user.username[0].toUpperCase()}
                            </div>
                            <div className='ml-4 flex-grow'>
                                <p className='text-white text-3xl'>{user.username}</p>
                            </div>
                        </div>
                        {
                            user.email ?
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
                {posts.map(post => (
                    <Post post={post} />
                ))}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

