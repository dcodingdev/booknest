
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://booknest-backend-44av.onrender.com/user/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border mb-3"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border mb-3"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-700 flex justify-center items-center"
          >
            <AiOutlineLogin className="mr-2" /> Login
          </button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account? <Link to="/user/register" className="text-green-500">Register</Link>
        </p>
      </div>
    </div>
  );
}
