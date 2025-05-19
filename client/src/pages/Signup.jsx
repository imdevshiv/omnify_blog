import React, { useState } from "react";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [globalError, setGlobalError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setGlobalError("");

    let hasError = false;

    if (!name) {
      setNameError("Name is required");
      hasError = true;
    }

    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Invalid email format");
        hasError = true;
      }
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    }

    if (hasError) return;

    try {
      await signup({ name, email, password });
      toast.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      setGlobalError(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

      {globalError && (
        <div className="mb-4 p-2 bg-red-200 text-red-700">{globalError}</div>
      )}

      <div className="mb-4">
        <input
          className={`w-full p-2 border ${nameError ? "border-red-500" : ""}`}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
      </div>

      <div className="mb-4">
        <input
          className={`w-full p-2 border ${emailError ? "border-red-500" : ""}`}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        {emailError && (
          <p className="text-red-500 text-sm mt-1">{emailError}</p>
        )}
      </div>

      <div className="mb-4">
        <input
          className={`w-full p-2 border ${
            passwordError ? "border-red-500" : ""
          }`}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && (
          <p className="text-red-500 text-sm mt-1">{passwordError}</p>
        )}
      </div>

      <button
        className="w-full bg-black text-white py-2"
        onClick={handleSignup}
      >
        Create Account
      </button>

      {/* Already have an account link */}
      <div className="mt-4 text-center">
        <p className="text-sm">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
