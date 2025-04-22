

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { BackButton } from "../components/BackButton";
import { Spinner } from "../components/Spinner";

export const DeleteBook = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDelete = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token"); // Get stored token

            await axios.delete(`https://booknest-backend-44av.onrender.com/books/${id}`, {
                headers: { Authorization: `Bearer ${token}` }, // Send token
            });

            navigate("/"); // Redirect after deletion
        } catch (error) {
            alert("An error occurred. Please check the console.");
            console.error("Error deleting book:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <BackButton />
            <h1 className="text-3xl my-6 text-center font-semibold text-gray-800">
                Delete Book
            </h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className="flex flex-col items-center border-2 border-red-500 rounded-xl w-full max-w-lg p-8 mx-auto shadow-lg bg-white">
                    <div className="my-4 text-center">
                        <span className="text-xl text-gray-700 font-medium">
                            Are you sure you want to delete this book?
                        </span>
                    </div>
                    <div className="my-4 w-full">
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white w-full py-2 px-6 rounded-md text-lg font-medium transition-all duration-300 hover:bg-red-700"
                        >
                            Yes, Delete It
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
