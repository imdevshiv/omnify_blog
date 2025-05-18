// src/components/Pagination.jsx
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages)].map((_, i) => i); // 0-based

  return (
    <div className="flex justify-center mt-8 space-x-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)} // pass 0-based index
          className={`px-4 py-2 border rounded ${
            page === currentPage
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          {page + 1} {/* Display 1-based number */}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
