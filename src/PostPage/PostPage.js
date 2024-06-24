import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../AuthContext";
import Header from '../HomePage/components/Header';
import Post from '../HomePage/components/Post';
import { useParams } from 'react-router-dom';

const PostPage = () => {
    const [post, setPost] = useState(null);

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
    };

    useEffect(() => {
        if (userToken) {
            fetchPost();
        }
    }, [userToken, userId]);

    return (
        <div className='flex flex-col h-screen overflow-hidden'>
            <Header />
            <div className='bg-backgroundGrey flex flex-1 justify-center items-stretch'>
                <div className='max-h-screen overflow-y-auto box-border border border-t-backgroundGrey border-borderGrey flex-col flex-grow max-w-2xl bg-backgroundGrey '>
                    {post ? <Post post={post} /> : <></>}
                </div>
            </div>
        </div>
    );
};

export default PostPage;

