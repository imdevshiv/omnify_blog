import React, { createContext, useContext, useEffect, useState } from "react";
import { getMyProfile, logoutUser } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await getMyProfile();
      if (res) {
        setIsLoggedIn(true);
      }
    } catch (err) {
      setIsLoggedIn(false);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Sync logout across tabs
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === "logout") {
        setIsLoggedIn(false);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Refresh auth on tab switch
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        checkAuth();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const login = () => setIsLoggedIn(true);

  const logout = () => {
    setIsLoggedIn(false);
    logoutUser();
    localStorage.setItem("logout", Date.now());

    // Segment: reset anonymous ID and clear user state
    if (window.analytics && typeof window.analytics.reset === "function") {
      window.analytics.reset();
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
