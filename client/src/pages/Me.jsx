import React, { useEffect, useState } from "react";
import { getMyProfile, getMyBlogs, deleteBlog } from "../services/api";
import BlogCard from "../components/BlogCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EditBlogModal from "../modal/EditBlogModal";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Me = () => {
  const [user, setUser] = useState(null);
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 3;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const profileData = await getMyProfile();
        const blogData = await getMyBlogs(currentPage, pageSize);
        setUser(profileData);
        setMyBlogs(blogData.content);
        setTotalPages(blogData.totalPages);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  const handleEdit = (blog) => setEditingBlog(blog);
  const handleCloseModal = () => setEditingBlog(null);

  const handleUpdate = (updatedBlog) => {
    setMyBlogs((prevBlogs) =>
      prevBlogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );
    setEditingBlog(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlog(id);

      setMyBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      navigate("/");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete the blog. Please try again.");
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  if (loading) return <LoadingSpinner />;

  return (
    <main className="flex flex-col flex-grow px-4 pt-6 pb-6 w-full max-w-6xl mx-auto no-scrollbar">
      {/* Profile Info */}
      {user && (
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-2">Welcome, {user.name}</h2>
          <p className="text-gray-600">Email: {user.email}</p>
        </div>
      )}

      {/* Blog List */}
      <div className="flex flex-wrap gap-8 justify-center">
        {myBlogs.length === 0 ? (
          <p className="text-gray-500 text-center w-full">
            You haven't posted any blogs yet.
          </p>
        ) : (
          myBlogs.map((blog) => (
            <div
              key={blog.id}
              className="w-full sm:w-[90%] md:w-[70%] lg:w-[30%]"
            >
              <BlogCard
                blog={blog}
                isOwnerView={true}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Edit Blog Modal */}
      {editingBlog && (
        <EditBlogModal
          blog={editingBlog}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
        />
      )}
    </main>
  );
};

export default Me;
