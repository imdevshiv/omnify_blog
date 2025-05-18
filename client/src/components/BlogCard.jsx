import React from "react";
import { Link } from "react-router-dom";
import { formatBlogDate } from "../utils/formatDate";

const BlogCard = ({ blog, isOwnerView = false, onEdit, onDelete }) => {
  if (!blog) return null;

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition flex flex-col w-full max-w-sm min-h-[400px]">
      {/* Image Section */}
      <div className="mb-4 w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
        {blog.imageUrl ? (
          <Link to={`/blogs/${blog.id}`} className="w-full h-full">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </Link>
        ) : (
          <div className="text-gray-400">No image</div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow">
        <Link to={`/blogs/${blog.id}`} className="hover:text-indigo-600 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="text-xl font-bold mb-2 text-gray-800">
            {blog.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
            {blog.content || "No description provided."}
          </p>

          {/* Author and Date */}
          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <div className="font-semibold">
              {capitalizeFirstLetter(blog.authorName) || "You"}
            </div>
            <div>{formatBlogDate(blog.createdDate)}</div>
          </div>
        </Link>

        {/* Action Buttons */}
        {isOwnerView && (
          <div className="flex gap-4 mt-auto">
            <button
              onClick={() => onEdit(blog)}
              className="text-indigo-600 font-medium hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(blog.id)}
              className="text-red-600 font-medium hover:underline"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
