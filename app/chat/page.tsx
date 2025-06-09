"use client";

import { useSession, signOut } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Chat Page</h1>
      <p>Welcome, {session?.user?.username || "Guest"}!</p>
      <p>Phone: {session?.user?.phone || "N/A"}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};

export default Page;
