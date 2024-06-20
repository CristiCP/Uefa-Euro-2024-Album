import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-blue-900 p-4 fixed w-full z-10 shadow-xl">
      <div className="flex flex-wrap container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link
            to="/"
            className="text-lg mb-2 font-bold text-white bg-opacity-75 px-2 py-1 rounded-md hover:text-yellow-500"
            style={{ textShadow: '0 0 10px black' }}
          >
            Home
          </Link>
        </div>
        <div className="text-white text-lg font-bold">
          <Link
            to="/album"
            className="text-lg mb-2 font-bold text-white bg-opacity-75 px-2 py-1 rounded-md hover:text-yellow-500"
            style={{ textShadow: '0 0 10px black' }}
          >
            Album
          </Link>
        </div>
        <div className="text-white text-lg font-bold">
          <Link
            to="/packing"
            className="text-lg mb-2 font-bold text-white bg-opacity-75 px-2 py-1 rounded-md hover:text-yellow-500"
            style={{ textShadow: '0 0 10px black' }}
            onClick={() => {
              if (location.pathname === '/packing') {
                window.location.reload();
              }
            }}
          >
            Pack opener
          </Link>
        </div>
        <div>
          <a
            href="/login"
            className="text-lg mb-2 font-bold text-white bg-opacity-75 px-2 py-1 rounded-md hover:text-yellow-500"
            style={{ textShadow: '0 0 10px black' }}
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
