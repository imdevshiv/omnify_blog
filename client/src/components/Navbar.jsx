import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout, loading } = useAuth();

  const onNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const authContainerClass =
    "hidden md:flex space-x-4 w-full max-w-xs justify-end min-w-[250px]";

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white relative">
      {/* Logo */}
      <div
        className="text-2xl font-bold text-green-600 cursor-pointer select-none"
        onClick={() => navigate("/")}
      >
        omnify.blog
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Auth Buttons */}
      {loading ? (
        <div className={authContainerClass}>
          <div className="w-28 h-8 bg-gray-200 animate-pulse rounded" />
        </div>
      ) : (
        <div className={authContainerClass}>
          {isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/profile/createBlog")}
                className="text-gray-700 hover:underline whitespace-nowrap"
              >
                Create Blog
              </button>
              <button
                onClick={() => navigate("/profile/me")}
                className="text-gray-700 hover:underline whitespace-nowrap"
              >
                Profile
              </button>
              <button
                onClick={logout}
                className="text-red-600 hover:underline whitespace-nowrap"
              >
                Logout
              </button>
            </>
          ) : (
            location.pathname !== "/login" &&
            location.pathname !== "/signup" && (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-gray-700 px-4 py-2 rounded shadow hover:bg-black hover:text-white whitespace-nowrap"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-black text-white px-4 py-2 rounded shadow whitespace-nowrap"
                >
                  Sign up for Free
                </button>
              </>
            )
          )}
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {isOpen && !loading && (
        <div
          role="menu"
          aria-label="Mobile navigation"
          className="absolute top-16 right-6 bg-white shadow-md rounded-md p-4 flex flex-col space-y-2 md:hidden"
        >
          {isLoggedIn ? (
            <>
              <button
                onClick={() => onNavigate("/profile/createBlog")}
                className="text-gray-700 hover:underline"
              >
                Create Blog
              </button>
              <button
                onClick={() => onNavigate("/profile/me")}
                className="text-gray-700 hover:underline"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="text-red-600 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            location.pathname !== "/login" &&
            location.pathname !== "/signup" && (
              <>
                <button
                  onClick={() => onNavigate("/login")}
                  className="text-gray-700 px-4 py-2 rounded shadow hover:bg-black hover:text-white"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate("/signup")}
                  className="bg-black text-white px-4 py-2 rounded shadow"
                >
                  Sign up
                </button>
              </>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
