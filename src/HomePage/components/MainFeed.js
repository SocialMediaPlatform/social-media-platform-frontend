import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import AddPost from './AddPost';
import Post from './Post';

const MainFeed = () => {
    //const [posts, setPosts] = useState(posts);
    const [posts, setPosts] = useState([
        { id: 1, username: 'mikex19', likes: 5, comments: 2, isLiked: false, content: 'Test post 1\ndkamskldmaskldmklasmdklas\nmakldmaskldmklasmdklasm\nmaskdmaskldmaskldmaklsm' },
        { id: 2, username: 'baronooo', likes: 3, comments: 1, isLiked: true, content: 'Test post 2' },
    ]);

    const { userToken } = useContext(AuthContext);

    useEffect(() => {
        if (userToken) {
            const fetchPosts = async () => {
                try {
                    const response = await fetch('/api/posts', {
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

    const addPost = (content) => {
        const newPost = {
            id: posts.length + 1,
            username: 'mock',
            content,
            likes: 0,
            comments: 0,
            isLiked: false
        };
        setPosts([newPost, ...posts]);
    };

    return (
        <div className='box-border border border-t-backgroundGrey border-borderGrey flex-col flex-grow max-w-2xl bg-backgroundGrey'>
            <AddPost addPost={addPost} />
            {posts.map(post => (
                <Post post={post} />
            ))}
        </div>
    );
};

export default MainFeed;
