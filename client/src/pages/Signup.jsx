import React, { useState } from "react";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const data = await signup({ name, email, password }); // ✅ use service
      alert("Signup successful:", data);
      navigate("/login");
    } catch (error) {
      alert(`Signup failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <input
        className="w-full p-2 mb-4 border"
        placeholder="Name"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-full p-2 mb-4 border"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full p-2 mb-4 border"
        placeholder="Password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full bg-black text-white py-2"
        onClick={handleSignup}
      >
        Create Account
      </button>
    </div>
  );
};

export default Signup;
