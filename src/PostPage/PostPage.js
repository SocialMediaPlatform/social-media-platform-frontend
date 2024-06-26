import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../AuthContext";
import Header from '../HomePage/components/Header';
import Post from '../HomePage/components/Post';
import { useParams } from 'react-router-dom';
import AddComment from './components/AddComment';
import Comment from './components/Comment';

const PostPage = () => {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    const { userToken, userId, apiUrl } = useContext(AuthContext);
    const { postid } = useParams();

    const fetchPost = async () => {
        try {
            const response = await fetch(apiUrl + '/api/v1/post/post/' + postid, {
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
            setPost(result);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
        try {
            const response = await fetch(apiUrl + '/api/v1/comment/' + postid, {
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
            result.reverse();
            console.log(result)
            setComments(result);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        if (userToken) {
            fetchPost();
        }
    }, [userToken, userId]);

    const addMainComment = async (content) => {
        try {
            const response = await fetch(apiUrl + '/api/v1/comment/add', {
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
                    postId: postid
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
        <div className='flex flex-col h-screen overflow-hidden'>
            <Header />
            <div className='bg-backgroundGrey flex flex-1 justify-center items-stretch h-0'>
                <div className='max-h-screen overflow-y-auto box-border border border-t-backgroundGrey border-borderGrey flex-col flex-grow max-w-2xl bg-backgroundGrey flex'>
                    {post ?
                    <>
                        <Post post={post} />
                        <div className='border-l border-borderGrey ml-8 flex-grow'>
                            <AddComment addComment={addMainComment} />
                            {comments.map(comment => (
                                <Comment key={comment.commentId} comment={comment} fetchPost={fetchPost} />
                            ))}

                        </div>
                    </>
                    : <></>}
                </div>
            </div>
        </div>
    );
};

export default PostPage;

