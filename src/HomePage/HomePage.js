import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../AuthContext";
import Header from './components/Header';
import MainFeed from './components/MainFeed';

const HomePage = () => {
    const { userToken } = useContext(AuthContext);
    
    //I need that code cause I decided to implement GET requests in MainFeed.js and ChatSidebar files,
    //Mainfeed.js is ready but I still need to fetch followed users 

    //useEffect(() => {
    //    if (userToken) {
    //        const fetchPosts = async () => {
    //            try {
    //                const response = await fetch('/api/posts', {
    //                    method: 'GET',
    //                    headers: {
    //                        'Authorization': `Bearer ${userToken}`
    //                    },
    //                    credentials: 'include'
    //                });
    //                if (!response.ok) {
    //                    throw new Error(`${response.status}`);
    //                }
    //                const result = await response.json();
    //                setPosts(result);
    //            } catch (error) {
    //                console.error('Error fetching posts:', error);
    //            }
    //        };
    //
    //        const fetchFollowedUsers = async() => {
    //            try {
    //                const response = await fetch('/api/followed', {
    //                    method: 'GET',
    //                    headers: {
    //                        'Authorization': `Bearer ${userToken}`
    //                    },
    //                    credentials: 'include'
    //                });
    //                if (!response.ok) {
    //                    throw new Error(`${response.status}`);
    //                }
    //                console.log(response)
    //                const result = await response.json();
    //                setFollowedUsers(result);
    //            } catch (error) {
    //                console.error('Error fetching followed users:', error);
    //            }
    //        };
    //
    //        fetchPosts();
    //        fetchFollowedUsers();
    //    }
    //}, [userToken]);

    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <div className='bg-backgroundGrey flex flex-1 justify-center items-stretch'>
                <MainFeed posts={posts}/>
            </div>
        </div>
    );
};

export default HomePage;

