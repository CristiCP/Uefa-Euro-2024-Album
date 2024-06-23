import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiSolidPhotoAlbum } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { MdLocalGroceryStore } from "react-icons/md";
import { FaUser } from "react-icons/fa";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-blue-900 fixed w-full z-10 shadow-xl">
      <div className="flex flex-wrap justify-center items-center mt-2">
        <div className="text-white text-lg font-bold">
          <Link
            to="/"
            className="flex justify-center items-center text-lg mb-2 font-bold text-white bg-opacity-75 px-2 py-1 rounded-md hover:text-yellow-500"
            style={{ textShadow: '0 0 10px black' }}
          >
            <FaHome className='mr-2' />
            Home
          </Link>
        </div>
        <div className="text-white text-lg font-bold">
          <Link
            to="/album"
            className="flex justify-center items-center text-lg mb-2 font-bold text-white bg-opacity-75 px-2 py-1 rounded-md hover:text-yellow-500"
            style={{ textShadow: '0 0 10px black' }}
          >
            <BiSolidPhotoAlbum className='mr-2' />
            Album
          </Link>
        </div>
        <div className="text-white text-lg font-bold">
          <Link
            to="/packing"
            className="flex justify-center items-center text-lg mb-2 font-bold text-white bg-opacity-75 px-2 py-1 rounded-md hover:text-yellow-500"
            style={{ textShadow: '0 0 10px black' }}
            onClick={() => {
              if (location.pathname === '/packing') {
                window.location.reload();
              }
            }}
          >
            <MdLocalGroceryStore className='mr-2'/>
            Store
          </Link>
        </div>
        <div>
          <Link
            to="/login"
            className="flex justify-center items-center text-lg mb-2 font-bold text-white bg-opacity-75 px-2 py-1 rounded-md hover:text-yellow-500"
            style={{ textShadow: '0 0 10px black' }}
          >
            <FaUser className='mr-2'/>
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
