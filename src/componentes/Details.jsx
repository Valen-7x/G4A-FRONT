import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";

export default function Details() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [images, setImages] = useState([])

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/games/${id}`);
      const responseData = await response.json();
      setData(responseData);
      setSelectedImage(responseData.game.header_image); // Aquí accedemos a responseData.game.header_image
      setImages(responseData.game.screenshots)
    } catch (error) {
      console.error("Error fetching data >>>", error);
    }
  };
  console.log("data->", data);
  const game = data.game || {};
  console.log("data->",game);
  console.log(images);
  console.log("selectedimage--->",selectedImage);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handlePrevImage = () => {
    const currentIndex = images.indexOf(selectedImage);
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[newIndex]);
  };

  const handleNextImage = () => {
    const currentIndex = images.indexOf(selectedImage);
    const newIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[newIndex]);
  };

  return (
    <div className="flex flex-col p-8 w-screen h-[95vh] lg:h-[90vh] bg-[black] lg:flex-row bg-gray-900">
      <Sidebar />
      <div className="flex flex-col">
        <div className="lg:w-[51rem] h-[80vh] lg:h-[50vh] flex flex-col h-[40vh] lg:flex-row justify-center items-center w-screen ml-[3rem]">
          <img
            src={typeof selectedImage==="object" && "path_full" in selectedImage? selectedImage.path_full : selectedImage} 
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
                <video className="text-[white] text-[0.7rem]">

                </video>
              </div>
            </div>
          </div>
        </div>
        <div className="flex ml-[1rem] flex mt-[1rem] gap-5">
        <button onClick={handleNextImage}>→</button>
        <div className="flex overflow-x-scroll md:w-[50%]">
        {images.map((image, index) => (
            <img
              key={index}
              className={`w-[5rem] h-[3rem] ${
                selectedImage === image && "border-2 border-blue-500"
              }`}
              src={image.path_full}
              alt={`image-${index}`}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
          
           <button className="" onClick={handlePrevImage}> ← </button>
         
        </div>
      </div>
    </div>
  );
}
