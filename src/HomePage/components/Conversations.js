import React, { useEffect, useContext, useState } from 'react';
import ConvSidebar from './ConvSidebar';
import ConvModal from './ConvModal'; 
import CreateGroupModal from './CreateGroupModal';
import { AuthContext } from '../../AuthContext';

const Conversations = () => {
    const { userToken, userId } = useContext(AuthContext); 
    const [conversationContent, setConversationContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isComponentMounted, setIsComponentMounted] = useState(false);
    const [users, setUsers] = useState([{ userId: 1, username: 'Alice' }, { userId: 2, username: 'Bob' }]);
    const [groups, setGroups] = useState([{ id: 1, name: 'Grupa 2' }, { id: 2, name: 'Grupa 2' }]);

    useEffect(() => {
        if (userToken) {
            const fetchFollowedUsers = async () => {
                try {
                    const response = await fetch(`/api/v1/userRelation/followed/${userId}`, {
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
                    setUsers(result);
                } catch (error) {
                    console.error('Error fetching followed users:', error);
                }
            };
            fetchFollowedUsers();
        }
    }, [userId, userToken, users]);


    useEffect(() => {
        if (userToken) {
            const fetchGroups = async () => {
                try {
                    const response = await fetch(`/api/v1/userRelation/followed/${userId}`, {
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
                    setGroups(result);
                } catch (error) {
                    console.error('Error fetching groups:', error);
                }
            };
            fetchGroups();
        }
    }, [userId, userToken, groups]);

    const handleUserSelect = (user) => {
        if (userToken){
            const fetchConversationContent = async () => {
                try {
                //    const response = await fetch(`/api/v1/conversations/${user.id}`, {
                //        method: 'GET',
                //        headers: {
                //            'Authorization': `Bearer ${userToken}`
                //        },
                //        credentials: 'include'
                //    });
                //    if (!response.ok) {
                //        throw new Error(`${response.status}`);
                //    }
                //    if (response.headers.get('Content-Length') === '0'){
                //        setConversationContent(null);
                //        return;
                //    }
                //    const result = await response.json();
                    const result = {
                        conversationId: 1, 
                        recipients: [
                            {
                            userId: user.userId,
                            username: user.username
                            }
                            ], 
                        messages:[
                            {
                            messageId: 1, 
                            messageContent: "kocham lajsa",
                            messageDate: new Date().toISOString(),
                            senderId: 1
                            }]
                    };
                    setConversationContent(result);
                    setSelectedUser(user);
                } catch (error) {
                    console.error('Error fetching conversation content:', error);
                }
            };
            fetchConversationContent();
            setIsModalOpen(true);
        }
    };
    
    // Use effect to ensure synchronic user selection
    useEffect(() => {
        if (isComponentMounted) {
            if (!conversationContent && selectedUser){
                setConversationContent({
                        conversationId: null, 
                        recipients: [
                            {
                            userId: selectedUser.userId,
                            username: selectedUser.username
                            }
                            ], 
                        messages:[]
                });
            }
        } else {
            setIsComponentMounted(true);
        }
    }, [conversationContent]);

    const handleGroupSelect = (group) => {
        if (userToken) {
            //const fetchConversationContent = async () => {
            //    try {
            //        const response = await fetch(`/api/v1/conversations/${group.id}`, {
            //            method: 'GET',
            //            headers: {
            //                'Authorization': `Bearer ${userToken}`
            //            },
            //            credentials: 'include'
            //        });
            //        if (!response.ok) {
            //            throw new Error(`${response.status}`);
            //        }
            //        const result = await response.json();
            //        setConversationContent(result);
            //    } catch (error) {
            //        console.error('Error fetching conversation content:', error);
            //    }
            //};
            //fetchConversationContent();

            setConversationContent({
                    conversationId: 1, 
                    recipients: [
                            {
                            userId: 1,
                            username: 'maksde25'
                            },
                            {
                            userId: 2,
                            username: 'lajsu69'
                            }
                            ], 
                    messages:[
                            {
                            messageId: 1, 
                            messageContent: "kocham lajsa",
                            messageDate: "23-06-2024",
                            senderId: 1
                            },
                            {
                            messageId: 2, 
                            messageContent: "beeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                            messageDate: "23-06-2024",
                            senderId: 2
                            }, 
                            {
                            messageId: 3, 
                            messageContent: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                            messageDate: "23-06-2024",
                            senderId: 0
                            }] 
            });
            setIsModalOpen(true);
        }
    };

    const handleModalClose = () => {
        setConversationContent(null);
        setSelectedUser(null);
        setIsModalOpen(false);
    };
    
    const handleCreateGroupModalClose = () => {
        setIsCreateGroupModalOpen(false);
    };

    const handleCreateGroup = () => {
        setIsCreateGroupModalOpen(true);
    };

    const openConvModalWithGroup = (group) => {
        setConversationContent({
            conversationId: null,
            recipients: group.members,
            messages: []
        });
        setIsModalOpen(true);
    };

    return (
        <div className='fixed right-0 top-18 w-1/6 h-full flex flex-col overflow-auto max-h-[calc(100%-4.5rem)]'>
            <ConvSidebar users={users} groups={groups} userSelect={handleUserSelect} groupSelect={handleGroupSelect}/>
            {isModalOpen && <ConvModal content={conversationContent} closeModal={handleModalClose} />}
            {isCreateGroupModalOpen && (
                <CreateGroupModal
                    users={users}
                    closeCreateGroupModal={handleCreateGroupModalClose}
                    openConvModal={openConvModalWithGroup}
                />
            )}
            <div className='border-b border-borderGrey mx-8 opacity-50'></div>
            <div className='flex justify-center py-8 border-l border-borderGrey opacity-50'>
                <button onClick={handleCreateGroup} className='my-auto bg-lightRed text-white p-2 rounded-md'>Create Group</button>
            </div>
        </div>
    );
};

export default Conversations;
