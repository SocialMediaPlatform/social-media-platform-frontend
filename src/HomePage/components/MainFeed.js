import React, { useState } from 'react';
import NewPost from './NewPost';

const MainFeed = () => {
    const [posts, setPosts] = useState([
        { id: 1, content: 'Test post 1' },
        { id: 2, content: 'Test post 2' },
    ]);

    const addPost = (content) => {
        const newPost = {
            id: posts.length + 1,
            content
        };
        setPosts([newPost, ...posts]);
    };

    return (
        <div className='box-border border border-t-backgroundGrey border-borderGrey flex-col flex-grow max-w-2xl bg-backgroundGrey'>
            <NewPost addPost={addPost} />
            {posts.map(post => (
                <div key={post.id} className='border-b border-borderGrey p-4'>
                    <p className='text-white'>{post.content}</p>
                </div>
            ))}
        </div>
    );
};

export default MainFeed;
