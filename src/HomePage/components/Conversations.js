import React, { useEffect, useContext, useState } from 'react';
import ConvSidebar from './ConvSidebar';
import ConvModal from './ConvModal'; 
import CreateGroupModal from './CreateGroupModal';
import { AuthContext } from '../../AuthContext';

const Conversations = () => {
    const { apiUrl, userToken, userId } = useContext(AuthContext); 
    const [conversationContent, setConversationContent] = useState({ conversationId: null, messages: []});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [useEffectFlag, setUseEffectFlag] = useState(false);
    const [isComponentMounted, setIsComponentMounted] = useState(false);
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);



    useEffect(() => {
        if (userToken) {
            const fetchFollowedUsers = async () => {
                try {
                    const response = await fetch(apiUrl + `/api/v1/userRelation/followed/${userId}`, {
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
    }, [userId, userToken]);


    useEffect(() => {
        if (userToken) {
            const fetchGroups = async () => {
                try {
                    const response = await fetch(apiUrl + '/api/v1/conversations/groupConversations', {
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
                    console.log(result);
                    const groupRecipients = [];
                    for (const group of result) {
                        for (const username of group.usernames) {
                            const userResponse = await fetch(apiUrl + `/api/v1/user/getUser/${username}`)
                            if (!userResponse.ok) {
                                throw new Error(`${userResponse.status}`);
                            }
                            const userResult = await userResponse.json();
                            groupRecipients.push(userResult);
                        }
                    }
                    console.log(groupRecipients);
                    setGroups({conversationId: result.conversationId, recipients: groupRecipients});
                } catch (error) {
                    console.error('Error fetching groups:', error);
                }
            };
            fetchGroups();
        }
    }, [userId, userToken]);

    const handleUserSelect = (user) => {
        if (userToken){
            const fetchConversationContent = async () => {
                try {
                    const response = await fetch(apiUrl + `/api/v1/conversations/${user.userId}/conversation`, {
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
                    result.recipients = [user];
                    setConversationContent(result);
                    setSelectedUser(user);
                    setUseEffectFlag(!useEffectFlag);
                } catch (error) {
                    console.error('Error fetching conversation content:', error);
                }
            };
            fetchConversationContent();
        }
    };
    
    // Use effect to ensure synchronic user selection
    useEffect(() => {
        if (isComponentMounted) {
            if (!conversationContent.conversationId && selectedUser){
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
            setIsModalOpen(true);
        } else {
            setIsComponentMounted(true);
        }
    }, [useEffectFlag]);

    const handleGroupSelect = (group) => {
        if (userToken) {
            const fetchConversationContent = async () => {
                try {
                    const response = await fetch(apiUrl + `/api/v1/conversations/${group.conversationId}/messages`, {
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
                    setConversationContent(
                        {result}
                    );
                } catch (error) {
                    console.error('Error fetching conversation content:', error);
                }
            };
            fetchConversationContent();
            setIsModalOpen(true);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setConversationContent({ conversationId: null, messages: []});
        setSelectedUser(null);
    };
    
    const handleCreateGroupModalClose = () => {
        setIsCreateGroupModalOpen(false);
    };

    const handleCreateGroup = () => {
        setIsCreateGroupModalOpen(true);
    };

    const handleGroupCreateSuccess = (group) => {
        setGroups([...groups, group])
    } 

    const openConvModalWithGroup = (groupUsers) => {
        setConversationContent({
            conversationId: null,
            recipients: groupUsers,
            messages: []
        });
        setIsModalOpen(true);
    };

    return (
        <div className='fixed right-0 top-18 w-1/6 h-full flex flex-col overflow-auto max-h-[calc(100%-4.5rem)]'>
            <ConvSidebar users={users} groups={groups} userSelect={handleUserSelect} groupSelect={handleGroupSelect}/>
            {isModalOpen && <ConvModal content={conversationContent} addGroup={handleGroupCreateSuccess} closeModal={handleModalClose} />}
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
