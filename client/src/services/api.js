// src/services/api.js
import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // 🟢 This sends cookies (like your JWT)
});

export default api;

// Signup
export const signup = async ({ name, email, password }) => {
  const response = await api.post("/auth/signup", { name, email, password });
  return response.data;
};

// Login
export const login = async ({ email, password }) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

// Fetch current user profile
export const getMyProfile = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

// Fetch blogs created by current user
export const getMyBlogs = async (page = 0, size = 3) => {
  const response = await api.get(`/blog/my-blogs?page=${page}&size=${size}`, {
    withCredentials: true, // ✅ Required for sending cookies
  });
  return response.data;
};

// Update a blog by ID
export const updateBlog = async (id, data) => {
  const response = await api.put(`/blog/${id}`, data);
  return response.data;
};

// Delete a blog by ID
export const deleteBlog = async (id) => {
  const response = await api.delete(`/blog/${id}`);
  return response.data;
};

export const getBlogById = async (id) => {
  const response = await api.get(`/blog/${id}`);
  return response.data;
};

export const logoutUser = async () => {
  await api.post("/auth/logout"); // adjust the path as per your backend
};

export const getBlog = async (page = 0, size = 3) => {
  const response = await api.get(`/blog?page=${page}&size=${size}&sort=createdDate,desc`);
  return response.data;
};


export const loginUser = async (email, password, login, navigate) => {
  try {
    await api.post(
      "/auth/login",
      { email, password }
    );
    login(); // update context/auth state
    toast.success("Login successful!");
    navigate("/profile/me");
  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed");
    throw err;
  }
};
