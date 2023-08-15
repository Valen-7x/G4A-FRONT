import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  const { img, title, category, price, onClick } = props;
  const firstWordOfTitle = title.split(" ")[0];
  console.log(props);
  return (
    <div className="bg-[#362C29]/50 p-0 flex flex-col gap-1 md:w-[200px] rounded-2xl relative transition-transform duration-200 transform hover:-translate-y-2 hover:shadow-md">
      <Link to="" onClick={onClick}>
        <img
          src={img}
          className="w-[200px] h-64 xl:w-52 h-62 lg:h-54 object-cover rounded-2xl"
          alt={title}
        />
      </Link>
      <div className="text-white text-lg font-semibold mt-2">
        {firstWordOfTitle}
      </div>
      <Link>
        <img
          className="absolute mt-[5rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[55px] h-[40px] object-cover rounded-2xl"
          src="public\carbon_add-alt.svg"
          alt=""
        />
      
      </Link>
    </div>
  );
};

export default Card;
