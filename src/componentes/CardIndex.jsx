import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  const { img, title, category, price, onClick } = props;
  const firstWordOfTitle = title.split(" ")[0];
  console.log(props);
  return (
    <div className="my-card-container
    bg-[#362C29]/50 flex flex-col rounded-sm 
    w-[28rem]
    lg:w-[15rem]
    transition-transform duration-100 transform 
    hover:shadow-lg">
      <Link to="" onClick={onClick}>
        <img
          src={img}
          className="object-contain rounded-sm"
          alt={title}
        />
      </Link>
      <div className="text-white text-lg font-semibold mt-2">
        {firstWordOfTitle}
      </div>
    </div>
  );
};

export default Card;
