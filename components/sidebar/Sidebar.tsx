"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSettings } from "react-icons/fi";
import UserList from "@/components/sidebar/UserList";
import Header from "@/components/sidebar/Header";

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSettingsClick = () => {
    router.push("/chat/settings");
  };

  return (
    <div className="w-80 bg-gradient-to-b from-[#0F0B33] to-[#1A144B] border-r border-[#7E62D2]/30 flex flex-col shadow-xl">
      <div className="flex-1 overflow-y-auto px-4 space-y-4">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <UserList searchQuery={searchQuery} />
      </div>
      
      <div className="p-4 border-t border-[#7E62D2]/20">
        <button
          onClick={handleSettingsClick}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-[#7E62D2]/10 hover:bg-[#7E62D2]/20 text-[#C2B5FF] transition-all duration-300 group"
        >
          <FiSettings className="text-lg text-[#C2B5FF] group-hover:text-white transition-colors duration-300" />
          <span className="font-medium text-sm group-hover:text-white transition-colors duration-300">
            Settings
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
