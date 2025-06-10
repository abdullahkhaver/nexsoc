'use client';

import React, { useEffect, useState } from 'react';
import { FiUser, FiClock, FiAlertCircle } from 'react-icons/fi';

interface User {
  _id: string;
  username: string;
  status?: 'online' | 'offline' | 'away';
  lastActive?: string;
}

interface UserListProps {
  searchQuery: string;
}

const UserList: React.FC<UserListProps> = ({ searchQuery }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/users');
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err instanceof Error ? err.message : 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'online': return 'bg-emerald-500';
      case 'away': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-[#9EE9D9]/80">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#7E62D2] mb-3"></div>
        <p>Loading teammates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 p-4 text-rose-400 bg-rose-900/20 rounded-lg mx-4 my-2">
        <FiAlertCircle className="text-xl" />
        <div>
          <p className="font-medium">Connection error</p>
          <p className="text-sm text-rose-300">{error}</p>
        </div>
      </div>
    );
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <FiUser className="text-4xl text-[#7E62D2]/50 mb-3" />
        <p className="text-[#9EE9D9]/70">No teammates found</p>
        <p className="text-sm text-[#9EE9D9]/50 mt-1">
          {searchQuery ? 'Try a different search' : 'Invite someone to join'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1 px-2 py-3">
      <p className="text-xs font-medium text-[#9EE9D9]/50 px-3 mb-1">
        {filteredUsers.length} {filteredUsers.length === 1 ? 'teammate' : 'teammates'}
      </p>
      
      {filteredUsers.map((user) => {
        const avatarUrl = `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(user.username)}&backgroundColor=0D8ABC`;
        
        return (
          <div
            key={user._id}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#7E62D2]/10 group transition-colors duration-200 cursor-pointer"
          >
            <div className="relative">
              <img
                src={avatarUrl}
                alt={`${user.username} avatar`}
                className="w-10 h-10 rounded-lg object-cover"
              />
              {user.status && (
                <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#1A144B] ${getStatusColor(user.status)}`}></span>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-[#E0DEF2] font-medium truncate group-hover:text-white transition-colors">
                {user.username}
                {/* {user.phone} */}
              </p>
              {user.lastActive && (
                <div className="flex items-center gap-1 text-xs text-[#9EE9D9]/50">
                  <FiClock className="text-[0.7rem]" />
                  <span>Active {user.lastActive}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;