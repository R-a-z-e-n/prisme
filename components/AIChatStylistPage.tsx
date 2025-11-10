import React, { useState, useEffect, useRef } from 'react';
import type { Page } from '../App';
import { ArrowLeftIcon, SendIcon, SparklesIcon } from './IconComponents';
import { GoogleGenAI, Chat } from "@google/genai";

interface AIChatStylistPageProps {
  setCurrentPage: (page: Page) => void;
}

interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

const AIChatStylistPage: React.FC<AIChatStylistPageProps> = ({ setCurrentPage }) => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const API_KEY = process.env.API_KEY;
        if (!API_KEY) {
            setError("AI features are disabled. Please set your API_KEY.");
            return;
        }
        try {
            const ai = new GoogleGenAI({ apiKey: API_KEY });
            const chatSession = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: 'You are FashionGPT, a friendly and knowledgeable AI fashion stylist. Provide concise, helpful, and encouraging fashion advice. Keep your responses to a few sentences. Use markdown for formatting like lists or bold text where appropriate.',
                },
            });
            setChat(chatSession);
            setMessages([{ role: 'model', text: "Hello! I'm your AI Fashion Stylist. Ask me anything from what to wear for an occasion to styling tips!" }]);
        } catch (e) {
            console.error(e);
            setError("Failed to initialize the AI Chat Stylist.");
        }
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chat) return;

        const userMessage: ChatMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const result = await chat.sendMessageStream({ message: input });
            let text = '';
            setMessages(prev => [...prev, { role: 'model', text: '' }]);
            
            for await (const chunk of result) {
                text += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = text;
                    return newMessages;
                });
            }
        } catch (e) {
            console.error(e);
            setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)]">
            {/* Header */}
            <div className="flex items-center gap-3 p-3 border-b bg-white/80 backdrop-blur-sm z-10">
                <button onClick={() => setCurrentPage('home')}>
                    <ArrowLeftIcon className="h-6 w-6"/>
                </button>
                <SparklesIcon className="h-6 w-6 text-purple-500" />
                <h2 className="font-bold text-lg">AI Chat Stylist</h2>
            </div>
            {/* Chat Area */}
            <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-50">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-purple-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex justify-start">
                        <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm bg-white text-gray-800 rounded-bl-none flex items-center gap-2">
                           <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                           <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                           <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        </div>
                    </div>
                )}
                {error && (
                    <div className="flex justify-center">
                        <p className="text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            {/* Input */}
            <div className="p-2 bg-white border-t">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask for fashion advice..." 
                        className="w-full bg-gray-100 border-transparent rounded-full px-4 py-3 focus:ring-purple-500 focus:border-purple-500" 
                        disabled={isLoading || !!error}
                    />
                    <button type="submit" disabled={isLoading || !input.trim() || !!error} className="bg-purple-600 p-3 rounded-full text-white disabled:bg-gray-400">
                        <SendIcon className="h-6 w-6" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AIChatStylistPage;