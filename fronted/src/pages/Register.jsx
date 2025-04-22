

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate form data
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }

    try {
      console.log("Submitting form data:", formData); // Log form data for debugging
      const res = await axios.post("http://localhost:3001/user/register", formData);
      alert("Registration successful! Please login.");
      navigate("/user/login");
    } catch (err) {
      console.error("Error during registration:", err.response || err.message); // Log error for debugging
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" className="w-full p-2 border mb-3" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" className="w-full p-2 border mb-3" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className="w-full p-2 border mb-3" onChange={handleChange} required />
          
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 flex justify-center items-center">
            <AiOutlineUserAdd className="mr-2" /> Register
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account? <Link to="/user/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
}