'use client';

import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiLogOut, FiCamera, FiSave } from 'react-icons/fi';
import { useSession, signOut } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';

const page = () => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    username: session?.user?.username || '',
    avatar: session?.user?.image || '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData({ ...formData, avatar: event.target.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      setIsEditing(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await update({
        ...session?.user,
        username: formData.username,
        image: formData.avatar,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0B33] to-[#1A144B] text-white">
      {/* Header with Back Button */}
      <header className="sticky top-0 p-4 border-b border-[#7E62D2]/30 bg-[#0F0B33]/80 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-[#7E62D2]/20 transition-colors"
          >
            <FiArrowLeft className="text-lg" />
          </button>
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-md mx-auto">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group mb-4">
            <img
              src={formData.avatar || `https://ui-avatars.com/api/?name=${formData.username}&background=7E62D2&color=fff`}
              alt="Profile"
              className="w-24 h-24 rounded-xl object-cover border-2 border-[#7E62D2]/50"
            />
            <button
              onClick={handleAvatarClick}
              className="absolute bottom-0 right-0 p-2 bg-[#7E62D2] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FiCamera className="text-white" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          <h2 className="text-xl font-medium">{formData.username}</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-[#C2B5FF]">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onFocus={() => setIsEditing(true)}
              className="w-full px-4 py-3 bg-[#1A144B] border border-[#7E62D2]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E62D2]/50"
            />
          </div>
          <div className="flex flex-col gap-3 pt-4">
            {isEditing && (
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#7E62D2] text-white rounded-lg hover:bg-[#7E62D2]/90 transition-colors disabled:opacity-50"
              >
                <FiSave />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            )}

            <button
              type="button"
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-transparent border border-rose-500/50 text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default page;