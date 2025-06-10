"use client";
import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { FaCheckCircle, FaInfoCircle, FaExclamationCircle, FaExclamationTriangle } from "react-icons/fa";

type ToastType = "error" | "success" | "info" | "warning";

type ToastProps = {
  message: string;
  onClose: () => void;
  type?: ToastType;
  duration?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  className?: string;
};

const Toast: React.FC<ToastProps> = ({
  message,
  onClose,
  type = "info",
  duration = 4000,
  position = "top-right",
  className = "",
}) => {
  useEffect(() => {
    if (duration === 0) return; 
    
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const toastConfig = {
    error: {
      bg: "bg-red-600",
      icon: <FaExclamationCircle className="text-lg" />,
    },
    success: {
      bg: "bg-green-600",
      icon: <FaCheckCircle className="text-lg" />,
    },
    info: {
      bg: "bg-blue-600",
      icon: <FaInfoCircle className="text-lg" />,
    },
    warning: {
      bg: "bg-yellow-600",
      icon: <FaExclamationTriangle className="text-lg" />,
    },
  };

  const positionClasses = {
    "top-right": "top-5 right-5 animate-slide-in-right",
    "top-left": "top-5 left-5 animate-slide-in-left",
    "bottom-right": "bottom-5 right-5 animate-slide-in-right",
    "bottom-left": "bottom-5 left-5 animate-slide-in-left",
  };

  return (
    <div
      className={`fixed ${positionClasses[position]} min-w-[200px] max-w-xs text-white px-4 py-3 rounded-lg shadow-lg flex items-start gap-3 z-50 ${toastConfig[type].bg} ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <span className="mt-0.5">{toastConfig[type].icon}</span>
      <p className="flex-1 text-sm">{message}</p>
      <button
        onClick={onClose}
        aria-label="Close toast"
        className="opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50 rounded p-0.5"
      >
        <FiX size={16} />
      </button>
    </div>
  );
};

export default Toast;