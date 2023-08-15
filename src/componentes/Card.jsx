import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import './styles/card.css'

const Card = (props) => {


  const { img, title, category, price, id, descr } = props;
   const firstWordOfTitle = title.split(" ")[0];
  console.log(props);

  return (
    <div className="my-card-container
    bg-[#362C29]/50 flex flex-col rounded-sm 
    w-[28rem]
    lg:w-[20rem]
    transition-transform duration-100 transform 
    hover:shadow-lg">
      <div className="my-card-image-container relative ">
        {/* Enlace a los detalles del juego */}
        <img
          src={img}
          className="object-contain rounded-sm"
          alt={title}
        />
        <p className="my-card-description backdrop-blur-sm ">
          {descr}</p>
      </div>

      <Link to={`/details/${id}`}>
      <div className="my-card-title text-white text-lg font-semibold transition-all duration-100 hover:bg-orange-600">
        {title}
      </div>
      </Link>
    
    </div>
  );
};

export default Card;