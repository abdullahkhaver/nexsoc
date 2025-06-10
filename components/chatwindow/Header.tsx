'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiMoreVertical, FiUser, FiFlag } from 'react-icons/fi';

interface ChatHeaderProps {
  username: string;
  isOnline: boolean;
  avatarUrl: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ username, isOnline, avatarUrl }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleReport = () => {
    console.log(`Reporting user: ${username}`);

    setIsDropdownOpen(false);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-[#7E62D2]/30 bg-[#0F0B33]/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img 
            src={avatarUrl} 
            alt={username} 
            className="w-10 h-10 rounded-lg"
          />
          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0F0B33] ${isOnline ? 'bg-emerald-500' : 'bg-gray-500'}`} />
        </div>
        <div>
          <h2 className="font-medium text-white">{username}</h2>
          <p className={`text-xs ${isOnline ? 'text-emerald-400' : 'text-gray-400'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 text-[#C2B5FF]">

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 hover:bg-[#7E62D2]/20 rounded-full transition-colors"
          >
            <FiMoreVertical className="text-lg" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#1A144B] border border-[#7E62D2]/30 rounded-lg shadow-lg z-10 overflow-hidden">
              <button
                onClick={handleReport}
                className="flex items-center w-full px-4 py-2 text-left text-[#E0DEF2] hover:bg-[#7E62D2]/30 transition-colors"
              >
                <FiFlag className="mr-2 text-[#9EE9D9]" />
                Report User
              </button>
              <button className="flex items-center w-full px-4 py-2 text-left text-[#E0DEF2] hover:bg-[#7E62D2]/30 transition-colors">
                <FiUser className="mr-2 text-[#9EE9D9]" />
                View Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;