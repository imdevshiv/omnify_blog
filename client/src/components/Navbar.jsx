import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, Pencil, User, LogOut } from "lucide-react";

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
                className="flex items-center gap-1 text-gray-700 hover:text-green-600 font-medium"
              >
                <Pencil size={18} />
                Create Blog
              </button>
              <button
                onClick={() => navigate("/profile/me")}
                className="flex items-center gap-1 text-gray-700 hover:text-green-600 font-medium"
              >
                <User size={18} />
                Profile
              </button>
              <button
                onClick={logout}
                className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium"
              >
                <LogOut size={18} />
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
          className="absolute top-16 right-6 bg-white shadow-md rounded-md p-4 flex flex-col space-y-2 md:hidden z-10"
        >
          {isLoggedIn ? (
            <>
              <button
                onClick={() => onNavigate("/profile/createBlog")}
                className="flex items-center gap-2 text-gray-700 hover:text-green-600"
              >
                <Pencil size={18} />
                Create Blog
              </button>
              <button
                onClick={() => onNavigate("/profile/me")}
                className="flex items-center gap-2 text-gray-700 hover:text-green-600"
              >
                <User size={18} />
                Profile
              </button>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <LogOut size={18} />
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
