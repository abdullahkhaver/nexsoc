'use client';

import React, { useState, useEffect,useRef } from 'react';
import { FiSend, FiSmile, FiPaperclip } from 'react-icons/fi';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onTypingStart?: () => void;
  onTypingEnd?: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  onTypingStart, 
  onTypingEnd 
}) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    
    if (e.target.value && !isTyping) {
      setIsTyping(true);
      onTypingStart?.();
    } else if (!e.target.value && isTyping) {
      setIsTyping(false);
      onTypingEnd?.();
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        onTypingEnd?.();
      }
    }, 2000);
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      if (isTyping) {
        setIsTyping(false);
        onTypingEnd?.();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-[#7E62D2]/20 bg-[#0F0B33]/80 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <button className="p-2 text-[#9EE9D9] hover:text-white transition-colors">
          <FiPaperclip />
        </button>
        <button className="p-2 text-[#9EE9D9] hover:text-white transition-colors">
          <FiSmile />
        </button>
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 rounded-xl bg-[#1A144B] text-white placeholder-[#9EE9D9]/50 focus:outline-none focus:ring-2 focus:ring-[#7E62D2]/50 border border-[#7E62D2]/20"
        />
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="p-3 ml-2 bg-[#7E62D2] text-white rounded-xl hover:bg-[#7E62D2]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;