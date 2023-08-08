import React, { useState } from "react";
import Sidebar from "./Sidebar";

export default function Details() {
  const [selectedImage, setSelectedImage] = useState(
    "https://cdn.akamai.steamstatic.com/steam/apps/220/header.jpg?t=1666823596"
  );

  const smallImages = [
    "https://cdn.akamai.steamstatic.com/steam/apps/220/0000001871.600x338.jpg?t=1666823596",
    "https://cdn.akamai.steamstatic.com/steam/apps/220/0000001869.600x338.jpg?t=1666823596",
    "https://cdn.akamai.steamstatic.com/steam/apps/220/0000001868.600x338.jpg?t=1666823596",
    "https://cdn.akamai.steamstatic.com/steam/apps/220/0000001866.600x338.jpg?t=1666823596",
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handlePrevImage = () => {
    const currentIndex = smallImages.indexOf(selectedImage);
    const newIndex = (currentIndex - 1 + smallImages.length) % smallImages.length;
    setSelectedImage(smallImages[newIndex]);
  };

  const handleNextImage = () => {
    const currentIndex = smallImages.indexOf(selectedImage);
    const newIndex = (currentIndex + 1) % smallImages.length;
    setSelectedImage(smallImages[newIndex]);
  };

  return (
    <div className="flex flex-col p-8 w-screen h-[95vh] lg:h-[90vh] bg-[black] lg:flex-row bg-gray-900">
      <Sidebar />
      <div className="flex flex-col">
        <div className="lg:w-[51rem] h-[80vh] lg:h-[50vh] flex flex-col h-[40vh] lg:flex-row justify-center items-center w-screen ml-[3rem]">
          <img
            src={selectedImage}
            className="h-[15rem] w-[20rem] lg:h-[50vh] lg:w-[40rem] rounded-[5px]"
            alt="img"
          />
          <div className="lg:w-[30%] lg:h-[48vh] flex items-center">
            <div className="w-[30rem] h-[48vh] flex flex-col px-[1.5rem]">
              <div className="w-[100%] h-[48vh] flex flex col">
                <div className="flex flex-col w-[15rem] justify-around">
                  <img
                    src="https://cdn.akamai.steamstatic.com/steam/apps/220/0000001864.600x338.jpg?t=1666823596"
                    className="w-[15rem] h-[7rem]"
                    alt="photo-profile"
                  />
                  <p className="text-[#ffffff93] text-[0.8rem] text-left">
                    En 1998, HALF-LIFE definitivamente lanzó una bomba en la
                    industria del juego porque combinó a la perfección juegos de
                    acción intensos en una historia continua y apasionante.{" "}
                  </p>
                </div>
              </div>
              <div className="w-[100%] h-auto flex flex-col justify-between items-center gap-7">
                <h1 className="lg:text-[1.8rem] text-[1.2rem] font-bold text-[white]"></h1>
                <p className="text-[white] text-[0.7rem]"></p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex ml-[3rem] flex mt-[1rem] gap-5">
        <button onClick={handleNextImage}>→</button>
          {smallImages.map((image, index) => (
            <img
              key={index}
              className={`w-[5rem] h-[3rem] ${
                selectedImage === image && "border-2 border-blue-500"
              }`}
              src={image}
              alt={`image-${index}`}
              onClick={() => handleImageClick(image)}
            />
          ))}
           <button className="" onClick={handlePrevImage}> ← </button>
         
        </div>
      </div>
    </div>
  );
}
