"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "error" | "success" | "info";
  } | null>(null);
  const router = useRouter();

  const showToast = (
    message: string,
    type: "error" | "success" | "info" = "info"
  ) => {
    setToast({ message, type });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);

    if (!phone || !password) {
      showToast("Please fill in all fields", "error");
      return;
    }

    try {
      const res = await signIn("credentials", {
        phone,
        password,
        redirect: false,
      });

      if (res?.error) {
        showToast("Invalid Credentials", "error");
      } else {
        showToast("Login successful", "success");
        router.replace("/chat");
      }
    } catch (error) {
      console.error("Login failed:", error);
      showToast("Something went wrong. Please try again.", "error");
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="min-h-screen flex items-center justify-center bg-[#0A0C1B] text-white px-4">
        <div className="w-full max-w-md border border-[#7E62D2] rounded-xl p-8 flex flex-col gap-5 shadow-lg bg-[#111324]">
          <h1 className="text-3xl sm:text-4xl font-semibold text-center">
            Login to Nex<span className="text-[#9EE9D9]">Soc</span>
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Phone Number"
              className="p-3 rounded-md border border-[#5981D8] bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7E62D2]"
            />

            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="p-3 rounded-md border border-[#5981D8] bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7E62D2]"
            />

            <button className="p-3 bg-[#7E62D2] rounded-md hover:bg-[#6c50c2] transition-colors">
              Login
            </button>

            <p className="text-center text-sm text-[#9EE9D9]">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-[#7E62D2] hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
