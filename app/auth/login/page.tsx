import Link from 'next/link'

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0C1B] text-white px-4">
      <div className="w-full max-w-md border border-[#7E62D2] rounded-xl p-8 flex flex-col gap-5 shadow-lg bg-[#111324]">
        <h1 className="text-3xl sm:text-4xl font-semibold text-center">
          Login to Nex<span className="text-[#9EE9D9]">Soc</span>
        </h1>
        
        <input
          type="text"
          placeholder="Enter Phone Number"
          className="p-3 rounded-md border border-[#5981D8] bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7E62D2]"
        />
        
        <input
          type="password"
          placeholder="Enter Password"
          className="p-3 rounded-md border border-[#5981D8] bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7E62D2]"
        />
        
        <button className="p-3 bg-[#7E62D2] rounded-md hover:bg-[#6c50c2] transition-colors">
          Login
        </button>
        
        <p className="text-center text-sm text-[#9EE9D9]">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-[#7E62D2] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
