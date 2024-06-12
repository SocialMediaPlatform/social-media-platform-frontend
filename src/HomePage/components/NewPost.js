import React, { useState } from 'react';

const NewPost = ({ addPost }) => {
    const [postContent, setPostContent] = useState('');

    const handlePostChange = (e) => {
        setPostContent(e.target.value);
    };

    const handlePostSubmit = (e) => {
        e.preventDefault();
        if (postContent.trim() === '') return;
        addPost(postContent);
        setPostContent('');
    };

    return (
        <div className='border-b border-borderGrey p-4 items-start'>
            <form onSubmit={handlePostSubmit} className='w-full'>
                <div className='flex flex-col'>
                    <textarea
                        className='bg-backgroundGrey text-lg text-white w-full resize-none focus:outline-none mb-4 max-h-40 overflow-y-auto'
                        placeholder="What's on your mind?"
                        value={postContent}
                        onChange={handlePostChange}
                    ></textarea>
                    <div className='border-b border-borderGrey mt-2 mb-5'>
                    </div>
                    <div className='flex justify-end'>
                        <button
                            type='submit'
                            className='bg-lightRed text-white px-4 py-2 rounded-2xl'
                            disabled={postContent.trim() === ''}
                        > Post
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NewPost;

