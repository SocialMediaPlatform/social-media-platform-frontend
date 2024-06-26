import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComments, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const Post = ({ post, likes, dislikes }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [dislikesCount, setDislikesCount] = useState(0);
    console.log(post);
    const navigate = useNavigate()
    const { userToken, userId, apiUrl } = useContext(AuthContext);

    const addReaction = async (reaction) => {
        try {
            const response = await fetch(apiUrl + '/api/v1/reaction/addPostReaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                credentials: 'include',
                body: JSON.stringify({
                    postId: post.postId,
                    reactionTypeId: reaction,
                    userId: userId
                })
            });
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }
        } catch (error) {
            console.error('Error adding reaction:', error);
        }
    }

    const removeReaction = async (reaction) => {
        try {
            const response = await fetch(apiUrl + '/api/v1/reaction/removePostReaction', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                credentials: 'include',
                body: JSON.stringify({
                    postId: post.postId,
                    userId: Number(userId)
                })
            });
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }
        } catch (error) {
            console.error('Error adding reaction:', error);
        }
    }

    const toggleLike = async () => {
        try {
            const newIsLiked = !isLiked;
            setIsLiked(newIsLiked);

            setLikesCount(newIsLiked ? likesCount + 1 : likesCount - 1);

            if(newIsLiked) {
                if(isDisliked) {
                    await removeReaction(4);
                    setIsDisliked(false);
                    setDislikesCount(dislikesCount - 1);
                }
                await addReaction(1);
            }
            else {
                await removeReaction(1);
            }



        } catch (error) {
            console.error('Error toggling like:', error);
            setIsLiked(isLiked);
            setLikesCount(likesCount);
        }
    };

    const toggleDislike = async () => {
        try {
            const newIsDisliked = !isDisliked;
            setIsDisliked(newIsDisliked);

            setDislikesCount(newIsDisliked ? dislikesCount + 1 : dislikesCount - 1);

            if(newIsDisliked) {
                if(isLiked) {
                    await removeReaction(1);
                    setIsLiked(false);
                    setLikesCount(likesCount - 1)
                }
                await addReaction(4);
            }
            else {
                await removeReaction(4);
            }

        } catch (error) {
            console.error('Error toggling dislike:', error);
            setIsLiked(isLiked);
            setLikesCount(likesCount);
        }
    };

    const fetchReactions = async () => {
        try {
            const response = await fetch(apiUrl + '/api/v1/post/reactions/' + post.postId, {
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
            setIsLiked(result.some(obj => (obj.user.userId == userId) && (obj.reactionTypeId === 1)));
            setIsDisliked(result.some(obj => (obj.user.userId == userId) && (obj.reactionTypeId === 4)));
            setLikesCount(result.filter(obj => obj.reactionTypeId === 1).length);
            setDislikesCount(result.filter(obj => obj.reactionTypeId === 4).length);
        } catch (error) {
            console.error('Error fetching reactions:', error);
        }
    };

    useEffect(() => {
        fetchReactions();
    }, [])

    return (
        <div className='cursor-pointer border-b border-borderGrey p-4 break-words transition duration-300 hover:bg-hoverBackgroundGrey'>
            <div className='flex'>
                <div className='items-start p-1'>
                    <div className='rounded-full h-8 w-8 flex items-center justify-center bg-avatarGrey text-white' onClick={() => navigate('/profile/' + post.user.userId)}>
                        {post.user.username[0].toUpperCase()}
                    </div>
                </div>
                <div className='ml-4 mt-1 flex-grow '>
                    <p className='text-white text-xl' onClick={() => navigate('/profile/' + post.user.userId)}>{post.user.username}</p>
                    <p className='text-white break-all' style={{ whiteSpace: 'pre-wrap' }}>{post.postContent}</p>
                    <div className='flex mt-2 items-center text-xl text-textGrey'>
                        <div className='w-1/6'>
                            <button onClick={toggleLike} className='flex items-center'>
                                <FontAwesomeIcon icon={faThumbsUp} className={`mr-2 transition duration-200 ${isLiked ? 'hover:text-hoverRed text-lightRed' : 'hover:text-hoverTextGrey text-textGrey'}`} />
                                {likesCount}
                            </button>
                        </div>
                        <div className='w-1/6'>
                            <button onClick={toggleDislike} className='flex items-center'>
                                <FontAwesomeIcon icon={faThumbsDown} className={`mr-2 transition duration-200 ${isDisliked ? 'hover:text-hoverRed text-lightRed' : 'hover:text-hoverTextGrey text-textGrey'}`} />
                                {dislikesCount}
                            </button>
                        </div>
                        <div className='w-1/6'>
                            <button onClick={() => navigate('/post/' + post.postId)} className='flex items-center'>
                                <FontAwesomeIcon icon={faComments} className={`mr-2 transition duration-200 hover:text-hoverTextGrey text-textGrey`} />
                                {post.commentsCount}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;

