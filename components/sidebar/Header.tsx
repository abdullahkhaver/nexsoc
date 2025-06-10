'use client';

import React from 'react';
import { FiSearch } from 'react-icons/fi';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="p-5 border-b border-[#7E62D2]/20 bg-gradient-to-r from-[#0F0B33]/80 to-[#1A144B]/80 backdrop-blur-sm">
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9EE9D9]/70" />
        <input
          type="text"
          placeholder="Find teammates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0F0B33]/60 border border-[#7E62D2]/30 text-white placeholder-[#9EE9D9]/50 focus:outline-none focus:ring-2 focus:ring-[#7E62D2]/50 focus:border-transparent transition-all duration-300 shadow-lg"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9EE9D9]/50 hover:text-white transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;