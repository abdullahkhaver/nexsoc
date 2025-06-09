"use client";
import { useEffect } from "react";

type ToastProps = {
  message: string;
  onClose: () => void;
  type?: "error" | "success" | "info";
  duration?: number;
};

const Toast: React.FC<ToastProps> = ({
  message,
  onClose,
  type = "info",
  duration = 4000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const backgroundColor = {
    error: "bg-red-600",
    success: "bg-green-600",
    info: "bg-blue-600",
  }[type];

  return (
    <div
      className={`fixed top-5 right-5 max-w-xs text-white px-4 py-3 rounded shadow-lg flex items-center justify-between space-x-4 animate-slide-in z-50 ${backgroundColor}`}
    >
      <p className="flex-1">{message}</p>
      <button
        onClick={onClose}
        aria-label="Close"
        className="font-bold text-xl leading-none focus:outline-none"
      >
        &times;
      </button>
    </div>
  );
};

export default Toast;
