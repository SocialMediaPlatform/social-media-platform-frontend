import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

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
            <form onSubmit={handlePostSubmit} className='w-full h-full flex flex-col'>
                    <TextareaAutosize
                        className='bg-backgroundGrey text-lg text-white w-full resize-none focus:outline-none mb-4 flex-grow overflow-y-auto'
                        placeholder="What's on your mind?"
                        value={postContent}
                        onChange={handlePostChange}
                        minRows={3}
                        maxRows={20}
                    ></TextareaAutosize>
                    <div className='border-b border-borderGrey mt-2 mb-5'>
                    </div>
                    <div className='flex justify-end'>
                        <button
                            type='submit'
                            className={`
                                bg-lightRed text-white py-2 px-4 rounded-lg 
                                ${postContent.trim() === '' ? 'opacity-50' : 'transition duration-200 hover:bg-hoverRed'}
                                `}
                            disabled={postContent.trim() === ''}
                        > Post
                        </button>
                    </div>
            </form>
        </div>
    );
};

export default NewPost;

