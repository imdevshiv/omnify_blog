import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";
import { getBlog } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

const ITEMS_PER_PAGE = 3;

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await getBlog(currentPage, ITEMS_PER_PAGE);
        setBlogs(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  return (
    <main className="flex flex-col flex-grow px-4 pt-6 pb-6 w-full max-w-6xl mx-auto">
      <div className="flex flex-wrap gap-8 justify-center min-h-[300px]">
        {loading ? (
          <LoadingSpinner />
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="w-full sm:w-[90%] md:w-[70%] lg:w-[30%]">
              <BlogCard blog={blog} />
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </main>
  );
};

export default Home;
