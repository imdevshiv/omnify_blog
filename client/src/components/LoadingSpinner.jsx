import React, { useEffect, useState } from "react";

const messages = [
  "Hang in... I'm trying to connect 🔄",
  "Still loading, please wait a sec ⏳",
  "Yeah! I'm connected 🎉",
  "Fetching data... my hamster just started running 🐹💨",
  "Just a sec... the bits are unionizing 🧑‍💻🪧",
  "Almost there... bribing the server with cookies 🍪",
  "Free tier vibes... performance may vary 😂",
  "It's slow, but at least it's not a group project 💀",
  "Connecting... just resetting the router with prayers 🙏",
  "Your patience is being uploaded to the cloud ☁️",
];

const LoadingSpinner = () => {
  const [messageIndex, setMessageIndex] = useState(
    Math.floor(Math.random() * messages.length)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(Math.floor(Math.random() * messages.length));
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
