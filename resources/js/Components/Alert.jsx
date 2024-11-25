import React, { useEffect, useState } from "react";

const Alert = ({ message, type = "success", duration = 2000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };
  if (!isVisible) return null;
  return (
    <div className="fixed top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform">
      {/* <strong className="font-bold">Success!</strong> */}
      <span className="block sm:inline"> {message}</span>
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-green-700 hover:text-green-900 focus:outline-none"
      >
        &times;
      </button>
    </div>
  );
};

export default Alert;
