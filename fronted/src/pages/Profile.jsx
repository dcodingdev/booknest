

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";


export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/user/login");
        return;
      }

      try {
        const response = await axios.get(`https://booknest-backend-44av.onrender.com/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/user/login");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return null; // Return null while redirecting
  }

  return (
    <div className="p-4">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
}
