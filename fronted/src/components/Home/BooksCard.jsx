import React from 'react';
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';

export const BooksCard = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {books.map((item) => (
        <div
          key={item._id}
          className="border border-gray-300 rounded-lg shadow-md p-4 bg-white hover:shadow-xl transition duration-300"
        >
          {/* Book Title */}
          <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>

          {/* Author and Year */}
          <div className="flex items-center gap-2 text-gray-500 mt-2">
            <BiUserCircle className="text-xl text-sky-700" />
            <span>{item.author}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Published: {item.publishYear}</p>

          {/* Icon Section */}
          <div className="flex justify-between items-center mt-4">
            <PiBookOpenTextLight className="text-4xl text-sky-800" />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center gap-4 mt-4 border-t pt-3">
            <Link to={`/books/details/${item._id}`}>
              <BsInfoCircle className="text-2xl text-green-800 hover:text-black transition" />
            </Link>
            <Link to={`/books/edit/${item._id}`}>
              <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black transition" />
            </Link>
            <Link to={`/books/delete/${item._id}`}>
              <MdOutlineDelete className="text-2xl text-red-600 hover:text-black transition" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
