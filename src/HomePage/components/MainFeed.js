import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import AddPost from './AddPost';
import Post from './Post';

const MainFeed = () => {
    const [posts, setPosts] = useState([]);

    const { userToken, userId, apiUrl } = useContext(AuthContext);

    const fetchPosts = async () => {
        try {
            const response = await fetch(apiUrl + '/api/v1/post/followed/' + userId, {
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

    useEffect(() => {
        if (userToken) {
            fetchPosts();
        }
    }, [userToken, userId]);

    const addPost = async (content) => {
        try {
            const response = await fetch(apiUrl + '/api/v1/post/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                credentials: 'include',
                body: JSON.stringify({
                    postDate: new Date().toISOString(),
                    postContent: content,
                    userId: userId
                })
            });
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }
            fetchPosts();
        } catch (error) {
            console.error('Error sending post:', error);
        }
    };

    return (
        <div className='max-h-screen overflow-y-auto box-border border border-t-backgroundGrey border-borderGrey flex-col flex-grow max-w-2xl bg-backgroundGrey '>
            <AddPost addPost={addPost} />
            {posts.length === 0 ? (
                <p className='text-textGrey text-2xl font-extrabold text-center mt-8'>No recent activity</p>
            ) : (
                posts.map(post => (
                    <Post key={post.id} post={post} />
                ))
            )}
        </div>
    );
};

export default MainFeed;
