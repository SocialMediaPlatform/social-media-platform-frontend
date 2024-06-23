import React, { useContext, useState } from 'react';
import ConvSidebar from './ConvSidebar';
import ConvModal from './ConvModal'; 
import { AuthContext } from '../../AuthContext';

const Conversations = () => {
    const userToken = useContext(AuthContext); 
    const [selectedUserOrGroup, setSelectedUserOrGroup] = useState(null);
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
                
            }
        }
        setSelectedUserOrGroup(user);
         
        setIsModalOpen(true);
    };

    const handleGroupSelect = (group) => {
        setSelectedUserOrGroup(group);
        setIsModalOpen(true);
    };

    return (
        <div className="fixed right-0 top-18 w-1/6 h-full flex overflow-auto max-h-[calc(100%-4.5rem)]">
            <ConvSidebar users={users} groups={groups} userSelect={handleUserSelect} groupSelect={handleGroupSelect} />
            {isModalOpen && <ConvModal content={`Konwersacja z ${selectedUserOrGroup.name}`} closeModal={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default Conversations;
