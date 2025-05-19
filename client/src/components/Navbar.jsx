import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authButtonClicked, setAuthButtonClicked] = useState(false); // NEW STATE
  const navigate = useNavigate();
  const { isLoggedIn, logout, loading } = useAuth();

  const authContainerClass =
    "hidden md:flex space-x-4 w-full max-w-xs justify-end min-w-[250px]";

  if (loading) {
    return (
      <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white relative">
        <div
          className="text-2xl font-bold text-green-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          omnify.blog
        </div>

        <div className={authContainerClass}>
          <div className="w-28 h-8 bg-gray-200 animate-pulse rounded" />
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white relative">
      <div
        className="text-2xl font-bold text-green-600 cursor-pointer select-none"
        onClick={() => navigate("/")}
      >
        omnify.blog
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Auth Buttons */}
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
          !authButtonClicked && (
            <>
              <button
                onClick={() => {
                  setAuthButtonClicked(true);
                  navigate("/login");
                }}
                className="text-gray-700 px-4 py-2 rounded shadow hover:bg-black hover:text-white whitespace-nowrap"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setAuthButtonClicked(true);
                  navigate("/signup");
                }}
                className="bg-black text-white px-4 py-2 rounded shadow whitespace-nowrap"
              >
                Sign up for Free
              </button>
            </>
          )
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 right-6 bg-white shadow-md rounded-md p-4 flex flex-col space-y-2 md:hidden">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  navigate("/profile/createBlog");
                  setIsOpen(false);
                }}
              >
                Create Blog
              </button>
              <button
                onClick={() => {
                  navigate("/profile/me");
                  setIsOpen(false);
                }}
              >
                Profile
              </button>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            !authButtonClicked && (
              <>
                <button
                  onClick={() => {
                    setAuthButtonClicked(true);
                    navigate("/login");
                    setIsOpen(false);
                  }}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setAuthButtonClicked(true);
                    navigate("/signup");
                    setIsOpen(false);
                  }}
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
