import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Card = (props) => {


  const { img, title, category, price, id } = props;
   const firstWordOfTitle = title.split(" ")[0];
  console.log(props);

  return (
    <div className="bg-[#362C29]/50 p-0 flex flex-col gap-1 md:w-[180px] rounded-2xl relative transition-transform duration-200 transform hover:-translate-y-2 hover:shadow-md">
      <Link to={`/details/${id}`}>
        {/* Enlace a los detalles del juego */}
        <img
          src={img}
          className="w-[180px] h-44 xl:w-52 h-62 lg:h-44 object-cover rounded-2xl"
          alt={title}
        />
      </Link>
      <div className="text-white text-lg font-semibold ">
        {firstWordOfTitle}
      </div>
    
    </div>
  );
};

export default Card;