

import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/user/login");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg">Home</Link>
        <div>
          {token && <Link to="/profile" className="text-white ml-4">Profile</Link>}
          {token ? (
            <button onClick={handleLogout} className="text-white ml-4">Logout</button>
          ) : (
            <Link to="/user/login" className="text-white ml-4">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}