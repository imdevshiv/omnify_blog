import React, { useEffect, useState } from "react";

const messages = [
  "Hang in... I'm trying to connect 🔄",
  "Still loading, please wait a sec ⏳",
  "Yeah! I'm connected 🎉",
];

const LoadingSpinner = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000); // Switch messages every 2s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
      <p className="mt-4 text-sm text-gray-600">{messages[messageIndex]}</p>
    </div>
  );
};

export default LoadingSpinner;
