import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full py-4 px-4 border-t mt-10 text-center text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
      <span>All rights reserved © {year} Omnify.</span>
      <span>
        Made with ❤️ by{" "}
        <a
          href="https://github.com/imdevshiv"
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shiv
        </a>
      </span>
    </footer>
  );
};

export default Footer;
