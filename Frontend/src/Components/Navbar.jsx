import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiSolidPhotoAlbum } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { MdLocalGroceryStore } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { FaExchangeAlt } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import useUserStore from '../Components/ZustandStore/ZustandStore';


function Navbar() {
  const username = useUserStore((state) => state.username);
  const setUsername = useUserStore((state) => state.setUsername);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    setUsername(null);
    navigate('/login');
  };

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
            to="/transfer"
            className="flex justify-center items-center text-lg mb-2 font-bold text-white bg-opacity-75 px-2 py-1 rounded-md hover:text-yellow-500"
            style={{ textShadow: '0 0 10px black' }}
            onClick={() => {
              if (location.pathname === '/transfer') {
                window.location.reload();
              }
            }}
          >
            <FaExchangeAlt className='mr-2'/>
            Transfers
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
        <div className="text-white text-lg font-bold">
          <Link
            to="/offers"
            className="flex justify-center items-center text-lg mb-2 font-bold text-white bg-opacity-75 px-2 py-1 rounded-md hover:text-yellow-500"
            style={{ textShadow: '0 0 10px black' }}
            onClick={() => {
              if (location.pathname === '/offers') {
                window.location.reload();
              }
            }}
          >
            <IoMailSharp className='mr-2'/>
            Offers
          </Link>
        </div>
        <div className="text-white text-lg font-bold">
        {username ? (
            <div className="flex items-center">
              <span className="flex justify-center items-center text-lg mb-2 font-bold text-white bg-opacity-75 px-2 py-1 rounded-md"
              style={{ textShadow: '0 0 10px black' }}>
                <FaUser className='mr-2' />
                {username.length > 10 ? username.substring(0, 10) + '...' : username}
              </span>
              <button
                onClick={handleLogout}
                className="flex justify-center items-center text-2xl mb-2 font-bold text-white bg-opacity-75 px-2 py-1 rounded-md hover:text-red-700 "
                style={{ textShadow: '0 0 10px black' }}
              >
                <TbLogout2 />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex justify-center items-center text-lg mb-2 font-bold text-white bg-opacity-75 px-2 py-1 rounded-md hover:text-yellow-500"
              style={{ textShadow: '0 0 10px black' }}
            >
              <FaUser className='mr-2'/>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
