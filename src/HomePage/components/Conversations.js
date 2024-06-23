import React, { useContext, useState } from 'react';
import ConvSidebar from './ConvSidebar';
import ConvModal from './ConvModal'; 
import { AuthContext } from '../../AuthContext';

const Conversations = () => {
    const userToken = useContext(AuthContext); 
    const [conversationContent, setConversationContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const users = [{ id: 1, username: 'Alice' }, { id: 2, username: 'Bob' }];
    const groups = [{ id: 1, name: 'Grupa 2' }, { id: 2, name: 'Grupa 2' }];

    const handleUserSelect = (user) => {
        if (userToken){
            const fetchConversationContent = async () => {
                try {
                    const response = await fetch(`/api/v1/conversations/${user.id}`, {
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
                    setConversationContent(result);
                } catch (error) {
                    console.error('Error fetching conversation content:', error);
                }
            };
            fetchConversationContent();
            if (!conversationContent){
                setConversationContent({usernames: [user.username]});
            }
            setIsModalOpen(true);
        }
    };

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

    return (
        <div className='fixed right-0 top-18 w-1/6 h-full flex overflow-auto max-h-[calc(100%-4.5rem)]'>
            <ConvSidebar users={users} groups={groups} userSelect={handleUserSelect} groupSelect={handleGroupSelect} />
            {isModalOpen && <ConvModal content={conversationContent} closeModal={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default Conversations;
