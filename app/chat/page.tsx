'use client';

import ChatLayout from '@/components/layout/ChatLayout';
import Sidebar from '@/components/sidebar/Sidebar';
import ChatHeader from '@/components/chatwindow/Header';
import ChatMessages from '@/components/chatwindow/ChatMessages';
import ChatInput from '@/components/chatwindow/ChatInput';
import {useState} from "react"
import { FiMoreVertical, FiVideo, FiPhone } from 'react-icons/fi';

const Page = () => {
  const currentUserId = '123';
  const [isTyping, setIsTyping] = useState(false);

  const messages = [
    { _id: '1', senderId: '123', text: 'Hello Abdullah!', createdAt: new Date(Date.now() - 3600000) },
    { _id: '2', senderId: '456', text: 'We need to implement the backend for this feature', createdAt: new Date() },
  ];

  const sendMessage = (text: string) => {
    console.log('Sending:', text);
    // Add your message sending logic here
  };

  return (
    <ChatLayout>
      <Sidebar />
      <div className="flex flex-col flex-1 h-screen bg-gradient-to-br from-[#0F0B33] to-[#1A144B] text-white">
        <ChatHeader 
          username="DevNull" 
          isOnline={true} 
          avatarUrl="https://api.dicebear.com/7.x/thumbs/svg?seed=DevNull" 
        />

        <ChatMessages 
          messages={messages} 
          currentUserId={currentUserId} 
          isTyping={isTyping}
        />

        <ChatInput 
          onSendMessage={sendMessage} 
          onTypingStart={() => setIsTyping(true)}
          onTypingEnd={() => setIsTyping(false)}
        />
      </div>
    </ChatLayout>
  );
};

export default Page;