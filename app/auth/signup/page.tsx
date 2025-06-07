
import Link from 'next/link'

const page = () => {
  return (
       <div className="min-h-screen flex items-center justify-center bg-[#0A0C1B] text-white px-4">
      <div className="w-full max-w-md border border-[#7E62D2] rounded-xl p-8 flex flex-col gap-5 shadow-lg bg-[#111324]">
        <h1 className="text-3xl sm:text-4xl font-semibold text-center">
          Sign up for Nex<span className="text-[#9EE9D9]">Soc</span>
        </h1>

        <input
          type="text"
          placeholder="Enter Phone Number"
          className="p-3 rounded-md border border-[#5981D8] bg-transparent text-[#9EE9D9] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7E62D2]"
        />

        <input
          type="text"
          placeholder="Choose a Username"
          className="p-3 rounded-md border border-[#5981D8] bg-transparent text-[#9EE9D9] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7E62D2]"
        />

        <input
          type="password"
          placeholder="Create Password"
          className="p-3 rounded-md border border-[#5981D8] bg-transparent text-[#9EE9D9] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7E62D2]"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="p-3 rounded-md border border-[#5981D8] bg-transparent text-[#9EE9D9] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7E62D2]"
        />

        <button className="p-3 bg-[#7E62D2] rounded-md hover:bg-[#6c50c2] transition-colors">
          Sign Up
        </button>

        <p className="text-center text-sm text-[#9EE9D9]">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#7E62D2] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default page