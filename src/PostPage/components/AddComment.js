import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

const AddComment = ({ addComment }) => {
    const [commentContent, setCommentContent] = useState('');

    const handleCommentChange = (e) => {
        setCommentContent(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (commentContent.trim() === '') return;
        addComment(commentContent);
        setCommentContent('');
    };

    return (
        <div className='border-b border-borderGrey p-4 items-start'>
            <form onSubmit={handleCommentSubmit} className='w-full h-full flex flex-col'>
                    <TextareaAutosize
                        className='bg-backgroundGrey text-lg text-white w-full resize-none focus:outline-none mb-4 flex-grow overflow-y-auto'
                        placeholder="What do you think about it?"
                        value={commentContent}
                        onChange={handleCommentChange}
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
                                ${commentContent.trim() === '' ? 'opacity-50' : 'transition duration-200 hover:bg-hoverRed'}
                                `}
                            disabled={commentContent.trim() === ''}
                        > Comment
                        </button>
                    </div>
            </form>
        </div>
    );
};

export default AddComment;

