import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { formatBlogDate } from "../utils/formatDate";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!blog) return <p className="text-center mt-10">Blog not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-600 text-sm mb-4">
        By {blog.authorName || "Unknown"} • {formatBlogDate(blog.createdDate)}
      </p>
      <hr className="mb-4" />
      <div className="text-gray-800 whitespace-pre-wrap">{blog.content}</div>
    </div>
  );
};

export default BlogDetail;
