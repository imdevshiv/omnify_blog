import React, { useEffect, useState } from "react";

const messages = [
  "I'm on a free server... powered by hopes and dreams 😅",
  "Hang in... I'm trying to connect 🔄",
  "Still loading, please wait a sec ⏳",
  "Yeah! I'm connected 🎉",
  "Fetching data... my hamster just started running 🐹💨",
  "Hold tight! I'm convincing the server with emotional support 🧘",
  "Just a sec... the bits are unionizing 🧑‍💻🪧",
  "Almost there... bribing the server with cookies 🍪",
  "Free tier vibes... performance may vary 😂",
  "It's slow, but at least it's not a group project 💀",
  "Connecting... just resetting the router with prayers 🙏",
  "Your patience is being uploaded to the cloud ☁️",
  "One moment... my code just found a bug and started a therapy session 🐞🛋️",
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
