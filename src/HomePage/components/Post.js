import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComments } from '@fortawesome/free-solid-svg-icons';

const Post = ({ post }) => {
    const [isLiked, setIsLiked] = useState(post.isLiked);
    const [likesCount, setLikesCount] = useState(post.reactionsCount);
    console.log(post)

    const toggleLike = async () => {
        try {
            const newIsLiked = !isLiked;
            setIsLiked(newIsLiked);

            setLikesCount(newIsLiked ? likesCount + 1 : likesCount - 1);



        } catch (error) {
            console.error('Error toggling like:', error);
            setIsLiked(isLiked);
            setLikesCount(likesCount);
        }
    };

    return (
        <div className='border-b border-borderGrey p-4 break-words transition duration-300 hover:bg-hoverBackgroundGrey'>
            <div className='flex'>
                <div className='items-start p-1'>
                    <div className='rounded-full h-8 w-8 flex items-center justify-center bg-avatarGrey text-white'>
                        {post.user.username[0].toUpperCase()}
                    </div>
                </div>
                <div className='ml-4 mt-1 flex-grow '>
                    <p className='text-white text-xl'>{post.user.username}</p>
                    <p className='text-white break-all' style={{ whiteSpace: 'pre-wrap' }}>{post.postContent}</p>
                    <div className='flex mt-2 items-center text-xl text-textGrey'>
                        <div className='w-1/6'>
                            <button onClick={toggleLike} className='flex items-center'>
                                <FontAwesomeIcon icon={faThumbsUp} className={`mr-2 transition duration-200 ${isLiked ? 'hover:text-hoverRed text-lightRed' : 'hover:text-hoverTextGrey text-textGrey'}`} />
                                {likesCount}
                            </button>
                        </div>
                        <span className='flex items-center'>
                            <FontAwesomeIcon icon={faComments} className='mr-2 text-textGrey' />
                            {post.commentsCount}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;

