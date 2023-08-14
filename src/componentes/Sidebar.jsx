import { useState, useRef, useEffect } from 'react';
import { api, apiUrl, endpoints } from '../../utils/api';

import {
  RiMoneyDollarCircleLine,
  RiFacebookLine,
  RiYoutubeLine,
  RiInstagramLine,
  RiTwitterLine,
  RiFilter3Line,
  RiCloseLine,
} from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const navbarRef = useRef(null);
  const menuRef = useRef(null);

  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const photo = localStorage.getItem('photo');
    return token && email && photo;
  };

  const isAuth = () => {
    const email = localStorage.getItem('email');
    const role = email.role
    
    return (role === 1 || role === 2)
  }

  const signout = async () => {
    const token = localStorage.getItem('token');
    const headers = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await api.post(apiUrl + endpoints.signout, null, headers);
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('photo');
      navigate('/');
    } catch (error) {
      alert('¡Error al cerrar sesión!');
    }
  };

  return (
    <>
      <div
        className={`w-[90%] md:w-[40%] fixed lg:static top-0 rounded-2xl transform transition-transform lg:w-[15rem] h-full text-gray-400 backdrop-blur-sm bg-black/50 shadow-2xl lg:shadow-none z-50 ${
          showSidebar ? "translate-x-0" : "-translate-x-[90%] lg:translate-x-0"
        } ${showSidebar ? "md:w-[40%]" : ""}`}
      >
        {/* Button mobile */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="lg:hidden fixed  bottom-4 right-4 bg-[#E58D27] p-[0.7rem] rounded-full text-xl"
        >
          {showSidebar ? <RiCloseLine /> : <RiFilter3Line />}
        </button>

        <div className="flex flex-col items-center mt-[1rem] gap-10 pr-[1rem] p-4 mb-4">
        {isLoggedIn() ? (
              <div className="flex flex-col items-center text-center justify-center gap-2">
                <img
                  src={localStorage.getItem('photo')}
                  className="w-[50px] mb-2 sm:m-0"
                />
                <div className="flex flex-col ms-3">
                  <p className="text-[15px] text-white font-bold">
                    {localStorage.getItem('name')}
                  </p>
                </div>
              </div>
            ) : (
              <>
          <Link
            to="/"
            className="flex gap-4 items-center transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <img className="w-[2.5rem]" src="public\Vector.png" alt="" />{" "}
            <h4 className="text-white text-lg">Home</h4>
          </Link>
          <Link
            to="/register"
            className="flex gap-4 items-center transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <img className="w-[2.5rem]" src="public\bi_people.svg" alt="" />
            <h4 className="text-white text-lg">Register</h4>
          </Link>
          <Link
            to="/signin"
            className="flex gap-4 items-center transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <img className="w-[2.5rem]" src="public\bi_people.svg" alt="" />
            <h4 className="text-white text-lg">Sign In</h4>
          </Link>
          </>
            )}
            {isLoggedIn() && (
              <>
            <Link
            to="/"
            className="flex gap-4 items-center transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <img className="w-[2.5rem]" src="public\Vector.png" alt="" />{" "}
            <h4 className="text-white text-lg">Home</h4>
          </Link>
          <Link
            to="/games"
            className="flex gap-4 items-center transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <img className="w-[2.5rem]" src="public\Group.svg" alt="" />
            <h4 className="text-white text-lg">Games</h4>
          </Link>
          <Link
            to="/market"
            className="flex gap-4 items-center transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <img className="w-[2.5rem]" src="public\Vector (1).svg" alt="" />
            <h4 className="text-white text-lg">Market</h4>
          </Link>
          <Link
            to="/contact"
            className="flex gap-4 items-center transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <img className="w-[2.5rem]" src="public\bi_people.svg" alt="" />
            <h4 className="text-white text-lg">Contact</h4>
          </Link>
          <Link
            to="/adminPanel"
            className="flex gap-4 items-center transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <img className="w-[2.5rem]" src="public\bi_people.svg" alt="" />
            <h4 className="text-white text-lg">Admin Panel</h4>
          </Link>
          <button
                  onClick={signout}
                  className="p-3 transition-all duration-300 ease-in-out transform hover:scale-105 text-white text-lg">Log Out</button>
         </>
            )}
        </div>
            
        <div className="pt-[2rem] lg:block hidden flex flex-col items-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/010/265/391/original/cute-3d-robot-fly-png.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
