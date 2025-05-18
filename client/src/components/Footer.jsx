import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="h-16 flex items-center justify-center text-gray-500 border-t mt-10 text-center px-2">
      All rights reserved © {year} Omnify. | Made with ❤️ by{" "}
      <a
        href="https://github.com/imdevshiv"
        className="text-blue-500 hover:underline ml-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        Shiv
      </a>
    </footer>
  );
};

export default Footer;
