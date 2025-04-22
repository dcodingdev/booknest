// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { Spinner } from '../components/Spinner';
// // import { Link } from 'react-router-dom';
// // import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
// // import { PORT } from '../../../backend/config';
// // import { BooksTable } from '../components/Home/BooksTable';
// // import { BooksCard } from '../components/Home/BooksCard';


// // export const Home = () => {
// //     const [books, setBooks] = useState([]);
// //     const [loading, setLoading] = useState(false);
// //     const [showType, setShowType] = useState('table');

// //     useEffect(() => {
// //         setLoading(true);
// //         axios.get(`http://localhost:${PORT}/books`)
// //             .then((response) => {
// //                 setBooks(response.data);
// //                 setLoading(false);
// //             })
// //             .catch((err) => {
// //                 console.log(err.message);
// //                 setLoading(false);
// //             });
// //     }, []);

// //     return (
// //         <div className='p-4'>
// //             <div className='flex justify-center items-center gap-x-4'>
// //                 <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg ' onClick={()=>setShowType('table')}>
// //                     Table
// //                 </button>
// //                 <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg ' onClick={()=>setShowType('card')}>
// //                     Card
// //                 </button>
            
// //             </div>
// //             <div className='flex justify-between items-center'>
// //                 <h1 className='text-3xl my-8'>Books List</h1>
// //                 <Link to='/books/create'>
// //                     <MdOutlineAddBox className='text-sky-800 text-4xl' />
// //                 </Link>
// //             </div>
// //             {loading ? (
// //                 <Spinner />
// //             ) : (
// //                 // books.length > 0 ? <BooksTable books={books} /> : <BooksCard />
// //                 showType === 'table' ? <BooksTable books={books} /> : <BooksCard books={books} />
// //             )}
// //         </div>
// //     );
// // };

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Redirect if not logged in
// import { Spinner } from '../components/Spinner';
// import { Link } from 'react-router-dom';
// import { MdOutlineAddBox } from 'react-icons/md';
// import { BooksTable } from '../components/Home/BooksTable';
// import { BooksCard } from '../components/Home/BooksCard';

// export const Home = () => {
//     const [books, setBooks] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [showType, setShowType] = useState('table');
//     const navigate = useNavigate(); // ✅ Redirect user if not authenticated

//     useEffect(() => {
//         const token = localStorage.getItem("token"); // ✅ Get token from localStorage

//         if (!token) {
//             navigate("/user/login"); // ✅ Redirect to login if not authenticated
//             return;
//         }

//         setLoading(true);
//         axios.get(`http://localhost:5001/books`, { // ✅ Use hardcoded port (avoid PORT import issue)
//             headers: { Authorization: `Bearer ${token}` } // ✅ Send token in request headers
//         })
//         .then((response) => {
//             setBooks(response.data);
//             setLoading(false);
//         })
//         .catch((err) => {
//             console.error("Error fetching books:", err.message);
//             setLoading(false);
//         });
//     }, []); // ✅ Depend on navigate to redirect properly

//     return (
//         <div className='p-4'>
//             <div className='flex justify-center items-center gap-x-4'>
//                 <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={() => setShowType('table')}>
//                     Table
//                 </button>
//                 <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={() => setShowType('card')}>
//                     Card
//                 </button>
//             </div>

//             <div className='flex justify-between items-center'>
//                 <h1 className='text-3xl my-8'>Books List</h1>
//                 <Link to='/books/create'>
//                     <MdOutlineAddBox className='text-sky-800 text-4xl' />
//                 </Link>
//             </div>

//             {loading ? (
//                 <Spinner />
//             ) : (
//                 showType === 'table' ? <BooksTable books={books} /> : <BooksCard books={books} />
//             )}
//         </div>
//     );
// };

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // Redirect if not logged in
// import { Spinner } from "../components/Spinner";
// import { Link } from "react-router-dom";
// import { MdOutlineAddBox } from "react-icons/md";
// import { PORT } from "../../../backend/config";
// import { BooksTable } from "../components/Home/BooksTable";
// import { BooksCard } from "../components/Home/BooksCard";

// export const Home = () => {
//     const [books, setBooks] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [showType, setShowType] = useState("table");
//     const navigate = useNavigate(); // Redirect user if not authenticated

//     useEffect(() => {
//         const fetchBooks = async () => {
//             const token = localStorage.getItem("token"); // Get stored token

//             if (!token) {
//                 navigate("/user/login"); // Redirect to login if not authenticated
//                 return;
//             }

//             setLoading(true);
//             try {
//                 const response = await axios.get(`http://localhost:${PORT}/books`, {
//                     headers: { Authorization: `Bearer ${token}` }, // Send token
//                 });

//                 setBooks(response.data);
//             } catch (err) {
//                 console.error("Error fetching books:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBooks();
//     }, [navigate]);

//     return (
//         <div className="p-4">
//             <div className="flex justify-center items-center gap-x-4">
//                 <button
//                     className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
//                     onClick={() => setShowType("table")}
//                 >
//                     Table
//                 </button>
//                 <button
//                     className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
//                     onClick={() => setShowType("card")}
//                 >
//                     Card
//                 </button>
//             </div>
//             <div className="flex justify-between items-center">
//                 <h1 className="text-3xl my-8">Books List</h1>
//                 <Link to="/books/create">
//                     <MdOutlineAddBox className="text-sky-800 text-4xl" />
//                 </Link>
//             </div>
//             {loading ? (
//                 <Spinner />
//             ) : showType === "table" ? (
//                 <BooksTable books={books} />
//             ) : (
//                 <BooksCard books={books} />
//             )}
//         </div>
//     );
// };

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import { BooksTable } from "../components/Home/BooksTable";
import { BooksCard } from "../components/Home/BooksCard";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Home = () => {
    const [books, setBooks] = useState([]); // ✅ Store books data
    const [loading, setLoading] = useState(false); // ✅ Loading state
    const [showType, setShowType] = useState("table"); // ✅ Toggle between table & card view
    const navigate = useNavigate(); // ✅ Redirect if user is not authenticated

    // 🔹 Function to fetch books with token
    const fetchBooks = async () => {
        const token = localStorage.getItem("token"); // ✅ Get stored token

        if (!token) {
            toast.error('You are not authorized to perform this action.');
            navigate("/user/login"); // ✅ Redirect to login if not authenticated
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5001/books", {
                headers: { Authorization: `Bearer ${token}` }, // ✅ Send token in headers
            });

            setBooks(response.data); // ✅ Store array of books in state
        } catch (err) {
            console.error("Error fetching books:", err.message);
            if (err.response && err.response.status === 401) {
                toast.error('Session expired. Please log in again.');
                navigate("/user/login"); // Redirect to login if token is expired
            } else {
                toast.error('An error occurred. Please check console');
            }
        } finally {
            setLoading(false);
        }
    };

    // 🔹 useEffect runs on component mount
    useEffect(() => {
        fetchBooks();
    }, [navigate]); // ✅ Depend on `navigate` to redirect properly

    return (
        <div className="p-4">
            {/* 🔹 Toggle between table & card view */}
            <div className="flex justify-center items-center gap-x-4">
                <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={() => setShowType("table")}>
                    Table
                </button>
                <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={() => setShowType("card")}>
                    Card
                </button>
            </div>

            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Books List</h1>
                <Link to="/books/create">
                    <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
            </div>

            {loading ? (
                <Spinner />
            ) : showType === "table" ? (
                <BooksTable books={books} />
            ) : (
                <BooksCard books={books} />
            )}
            <ToastContainer />
        </div>
    );
};