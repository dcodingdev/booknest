

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { PORT } from '../../../backend/config';
import { BackButton } from '../components/BackButton';
import { Spinner } from '../components/Spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); // Add initial loading state
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      setInitialLoading(true); // Set initial loading to true
      try {
        const token = localStorage.getItem("token"); // Get stored token

        if (!token) {
          toast.error('You are not authorized to perform this action.');
          navigate('/user/login');
          return;
        }

        const res = await axios.get(`http://localhost:${PORT}/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` }, // Send token
        });
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
      } catch (err) {
        console.log(err);
        toast.error('An error occurred. Please check console');
      } finally {
        setInitialLoading(false); // Set initial loading to false
      }
    };

    fetchBook();
  }, [id, navigate]);

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Get stored token

      if (!token) {
        toast.error('You are not authorized to perform this action.');
        navigate('/user/login');
        return;
      }

      await axios.put(`http://localhost:${PORT}/books/${id}`, {
        title,
        author,
        publishYear,
      }, {
        headers: { Authorization: `Bearer ${token}` }, // Send token
      });

      toast.success('Book updated successfully!');
      navigate('/');
    } catch (error) {
      toast.error('An error occurred. Please check console');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <Spinner />; // Show spinner while initial loading
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      <form onSubmit={handleEdit}>
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Title</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
              required
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Author</label>
            <input
              type='text'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
              required
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
            <input
              type='number'
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <button
            type='submit'
            className='bg-sky-800 text-white p-2 rounded'
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Book'}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};