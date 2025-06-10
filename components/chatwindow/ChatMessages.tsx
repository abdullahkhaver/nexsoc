'use client';

import React from 'react';
import { format } from 'date-fns';

interface Message {
  _id: string;
  senderId: string;
  text: string;
  createdAt: Date;
}

interface ChatMessagesProps {
  messages: Message[];
  currentUserId: string;
  isTyping?: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, currentUserId, isTyping }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl ${
              msg.senderId === currentUserId
                ? 'bg-[#7E62D2] rounded-tr-none'
                : 'bg-[#1A144B] rounded-tl-none'
            }`}
          >
            <p className="text-white">{msg.text}</p>
            <p className={`text-xs mt-1 ${
              msg.senderId === currentUserId 
                ? 'text-[#C2B5FF]' 
                : 'text-[#9EE9D9]/70'
            }`}>
              {format(msg.createdAt, 'h:mm a')}
            </p>
          </div>
        </div>
      ))}
      
      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-[#1A144B] px-4 py-3 rounded-2xl rounded-tl-none">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-[#9EE9D9] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-[#9EE9D9] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-[#9EE9D9] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;