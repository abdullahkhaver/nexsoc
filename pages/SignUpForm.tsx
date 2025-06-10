"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Toast from "@/components/Toast";

const SignupForm = () => {
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "error" | "success" | "info";
  } | null>(null);

  const router = useRouter();

  const showToast = useCallback(
    (message: string, type: "error" | "success" | "info" = "info") => {
      setToast({ message, type });
    },
    []
  );

  const validateInputs = () => {
    if (!phone || !username || !password) {
      showToast("Please fill in all fields", "error");
      return false;
    }

    if (!/^\d+$/.test(phone)) {
      showToast("Phone number must contain only digits", "error");
      return false;
    }

    if (!/^[a-zA-Z]+$/.test(username)) {
      showToast("Username must only contain letters", "error");
      return false;
    }

    if (password.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateInputs()) return;

    showToast("Creating user...", "info");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.message || "Something went wrong", "error");
      } else {
        showToast(data.message || "User created successfully", "success");
        setPhone("");
        setUsername("");
        setPassword("");
        router.push("/chat");
      }
    } catch (err) {
      showToast("Network error. Please try again.", err as "error");
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
            Sign up for Nex<span className="text-[#9EE9D9]">Soc</span>
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Phone Number"
              className="p-3 rounded-md border border-[#5981D8] bg-transparent text-[#9EE9D9] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7E62D2]"
            />

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a Username"
              className="p-3 rounded-md border border-[#5981D8] bg-transparent text-[#9EE9D9] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7E62D2]"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create Password"
              className="p-3 rounded-md border border-[#5981D8] bg-transparent text-[#9EE9D9] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7E62D2]"
            />

            <button
              type="submit"
              className="p-3 bg-[#7E62D2] rounded-md hover:bg-[#6c50c2] transition-colors"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-[#9EE9D9]">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-[#7E62D2] hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
