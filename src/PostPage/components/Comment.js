import React, { useContext, useState } from 'react';
import { AuthContext } from "../../AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComments, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import AddComment from './AddComment';

const Comment = ({ comment, fetchPost }) => {
    const [isLiked, setIsLiked] = useState(comment.isLiked);
    const [repliesOpen, setRepliesOpen] = useState(false);
    const [likesCount, setLikesCount] = useState(comment.reactionsCount);
    const { userToken, userId, apiUrl } = useContext(AuthContext);
    console.log(comment)

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

    const toggleReplies = () => {
        setRepliesOpen(!repliesOpen);
    };

    const addReplyComment = async (content) => {
        try {
            const response = await fetch(apiUrl + '/api/v1/comment/addResponse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                credentials: 'include',
                body: JSON.stringify({
                    commentDate: new Date().toISOString(),
                    commentContents: content,
                    userId: userId,
                    mainCommentId: comment.commentId
                })
            });
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }
            fetchPost();
        } catch (error) {
            console.error('Error sending post:', error);
        }
    };

    return (
        <div className='border-b border-borderGrey'>
            <div className='border-borderGrey p-4 break-words transition duration-300 hover:bg-hoverBackgroundGrey'>
                <div className='flex'>
                    <div className='items-start p-1'>
                        <div className='rounded-full h-8 w-8 flex items-center justify-center bg-avatarGrey text-white'>
                            {'M'}
                        </div>
                    </div>
                    <div className='ml-4 mt-1 flex-grow '>
                        <p className='text-white text-xl'>{'mock username'}</p>
                        <p className='text-white break-all' style={{ whiteSpace: 'pre-wrap' }}>{comment.commentContents}</p>
                        <div className='flex mt-2 items-center text-xl text-textGrey'>
                            <div className='w-1/6'>
                                <button onClick={toggleLike} className='flex items-center'>
                                    <FontAwesomeIcon icon={faThumbsUp} className={`mr-2 transition duration-200 ${isLiked ? 'hover:text-hoverRed text-lightRed' : 'hover:text-hoverTextGrey text-textGrey'}`} />
                                    {likesCount}
                                </button>
                            </div>
                            <div className='w-1/6'>
                                <button onClick={toggleLike} className='flex items-center'>
                                    <FontAwesomeIcon icon={faThumbsDown} className={`mr-2 transition duration-200 ${isLiked ? 'hover:text-hoverRed text-lightRed' : 'hover:text-hoverTextGrey text-textGrey'}`} />
                                    {likesCount}
                                </button>
                            </div>
                            {comment.replies !== null ?
                                <div className='w-1/6'>
                                    <button onClick={toggleReplies} className='flex items-center'>
                                        <FontAwesomeIcon icon={faComments} className={`mr-2 transition duration-200 ${repliesOpen ? 'hover:text-hoverRed text-lightRed' : 'hover:text-hoverTextGrey text-textGrey'}`} />
                                        {comment.replies.length}
                                    </button>
                                </div>
                            : <></>}
                        </div>
                    </div>
                </div>
            </div>
            {repliesOpen ?
                <div className='border-l border-t border-borderGrey ml-8 flex-grow'>
                    <AddComment addComment={addReplyComment} />
                    {comment.replies.map(comment => (
                        <Comment key={comment.id} comment={comment} fetchPost={fetchPost} />
                    ))}

                </div>
            : <></>}
        </div>
    );
};

export default Comment;

