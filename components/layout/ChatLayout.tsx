import React from 'react';

interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-gray-950 text-white">
      {children}
    </div>
  );
};

export default ChatLayout;
