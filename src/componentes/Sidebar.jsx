import React, { useState } from "react";
import {
  RiMoneyDollarCircleLine,
  RiFacebookLine,
  RiYoutubeLine,
  RiInstagramLine,
  RiTwitterLine,
  RiFilter3Line,
  RiCloseLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <div
        className={`w-[40%] md:w-[40%] fixed lg:static top-0
         rounded-[0_1rem_1rem_0] transform transition-transform
          lg:w-[10rem] h-full text-gray-400 backdrop-blur-sm bg-green-900 shadow-2xl lg:shadow-none z-50 ${
          showSidebar ? "translate-x-0" : "-translate-x-[100%] lg:translate-x-0"
        } ${showSidebar ? "md:w-[40%]" : ""}`}
      >
        {/* Button mobile */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="lg:hidden fixed bottom-4 right-[-3rem] bg-[#E58D27] p-[0.7rem] rounded-full text-xl"
        >
          {showSidebar ? <RiCloseLine /> : <RiFilter3Line />}
        </button>

        <div className="flex flex-col mt-[1rem] gap-10">
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
