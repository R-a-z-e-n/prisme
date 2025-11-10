
import React, { useState } from 'react';
// Fix: The 'Conversation' type is exported from `types.ts`, not `App.tsx`.
import type { Page } from '../App';
import type { Conversation } from '../types';
import { conversations } from '../services/mockData';
import { ArrowLeftIcon, SendIcon } from './IconComponents';

interface MessagesPageProps {
    setCurrentPage: (page: Page) => void;
}

const MessagesPage: React.FC<MessagesPageProps> = ({ setCurrentPage }) => {
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

    if (selectedConversation) {
        return (
            <div className="flex flex-col h-[calc(100vh-4rem)]">
                {/* Header */}
                <div className="flex items-center gap-3 p-3 border-b bg-white">
                    <button onClick={() => setSelectedConversation(null)}>
                        <ArrowLeftIcon className="h-6 w-6"/>
                    </button>
                    <img src={selectedConversation.avatarUrl} alt={selectedConversation.userName} className="w-10 h-10 rounded-full" />
                    <h2 className="font-bold text-lg">{selectedConversation.userName}</h2>
                </div>
                {/* Chat Area */}
                <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-100">
                    {selectedConversation.messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'me' ? 'bg-purple-500 text-white rounded-br-none' : 'bg-white text-black rounded-bl-none'}`}>
                                <p>{msg.text}</p>
                                <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-purple-200' : 'text-gray-400'}`}>{msg.timestamp}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Input */}
                <div className="p-2 bg-white border-t flex items-center gap-2">
                    <input type="text" placeholder="Type a message..." className="w-full bg-gray-100 border-transparent rounded-full px-4 py-2 focus:ring-purple-500" />
                    <button className="bg-purple-600 p-2 rounded-full text-white">
                        <SendIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-6">Messages</h1>
            <div className="space-y-2">
                {conversations.map(convo => (
                    <div 
                        key={convo.id} 
                        onClick={() => setSelectedConversation(convo)} 
                        className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer"
                    >
                        <img src={convo.avatarUrl} alt={convo.userName} className="w-14 h-14 rounded-full" />
                        <div className="flex-grow">
                            <div className="flex justify-between">
                                <h3 className="font-bold">{convo.userName}</h3>
                                <p className="text-xs text-gray-500">{convo.timestamp}</p>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{convo.lastMessage}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessagesPage;