import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/actions/cart.js';


export default function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => {
    console.log("Cart state >>>", state.cart);
    console.log("Cart Items :O >>>", state.cart.items)
    
    return state.cart.items;
  });
  
  const [data, setData] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [images, setImages] = useState([]);
  const [propImages, setPropImages] = useState({
    header_image: "",
    background_image: "",
  });
  const [gameInfo, setGameInfo] = useState({
    name: "",
    short_description: "",
    detailed_description: "",
    supported_languages: "",
    pc_requirements: "",
    publishers: [""],
    price: 0,
    platforms: {
      windows: false,
      mac: false,
      linux: false,
    },
    rating_pos: 0,
    rating_neg: 0,
    rating: 0,
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  //    --------- FETCH ---------
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/games/${id}`);
      const responseData = await response.json();
      setData(responseData);
      setSelectedImage(responseData.game.screenshots[0]); // Aquí accedemos a responseData.game.header_image
      setImages(responseData.game.screenshots);
      setPropImages({
        header_image: responseData.game.header_image,
        background_image: responseData.game.background,
      });
      setGameInfo({
        name: responseData.game.name,
        short_description: responseData.game.short_description,
        detailed_description: responseData.game.detailed_description,
        supported_languages: responseData.game.supported_languages,
        pc_requirements: responseData.game.pc_requirements,
        publishers: responseData.game.publishers,
        price: responseData.game.price,
        platforms: {
          windows: responseData.game.platforms.windows,
          mac: responseData.game.platforms.mac,
          linux: responseData.game.platforms.linux,
        },
        rating_pos: responseData.game.rating_pos,
        rating_neg: responseData.game.rating_neg,
        rating: Math.floor(
          (responseData.game.rating_pos /
            (responseData.game.rating_pos + responseData.game.rating_neg)) *
            100
        ),
      });
    } catch (error) {
      console.error("Error fetching data >>>", error);
    }
  };


  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  const isItemInCart = cartItems.some(item => item.id === id);
  //    --------- HANDLERS ---------
  const handleAddToCart = () => {
    if (isItemInCart) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(addToCart({ id, game: data.game })); // Pass the entire game object
    }
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
  console.log("--- game info ---");
  console.log(gameInfo.platforms);
  console.log('--- images ---')
  console.log(propImages)

  //    --------- RENDER ---------
  return (
    <div className={`bg-gray-900 lg:flex bg-no-repeat px-8 py-4`}
    style={{
      backgroundImage: `url(${propImages.background_image})`,
    }}>
      <Sidebar />
      <div className={`flex flex-col p-4 max-w-[70rem]`}>
        <div className="flex justify-center">
          <div
            className={`flex flex-col items-center`}
          >
            <img
              src={
                typeof selectedImage === "object" &&
                "path_full" in selectedImage
                  ? selectedImage.path_full
                  : selectedImage
              }
              className="min-h-[22rem] max-h-[28rem] object-contain bg-black"
              alt="img"
            />

            <div className="flex w-[100%] mt-[0.5rem] gap-3">
              <button
                className="text-[white] w-[7%] rounded-lg flex justify-center items-center"
                onClick={handlePrevImage}
              >
                <img src="../../public/arrows/angle-left-solid.svg"
                className="h-[3rem]"></img>
              </button>

              <div className="flex overflow-x-scroll w-[86%] text-[white]">
                {images.map((image, index) => (
                  <img
                    key={index}
                    className={`h-[5rem] ${
                      selectedImage === image && "border-2 border-orange-500"
                    }`}
                    src={image.path_full}
                    alt={`image-${index}`}
                    onClick={() => handleImageClick(image)}
                  />
                ))}
              </div>
              <button
                className="text-[white] w-[7%] rounded-lg flex justify-center items-center"
                onClick={handleNextImage}
              >
                <img src="../../public/arrows/angle-right-solid.svg"
                className="h-[3rem]"></img>
              </button>
            </div>
          </div>

          <div
            className="hidden lg:flex flex-col text-left items-center py-[0.25rem] px-[0.5rem] text-white
          bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#2222] via-[#8882] to-[#fff2]
          lg:w-[40vw]"
          >

            <img
              src={propImages.header_image}
              className=""
              alt="photo-profile"
            />

            <p className="text-[#cce] text-[13px] mt-3">{`${gameInfo.short_description}`}</p>

          <div className="flex gap-5">
          <div className="flex-col">
              <p className="flex items-center font-semibold text-[50px]">
                Rating
              </p>
              <div className="flex gap-4 my-2 ml-5">
                <img
                  className="h-[25px]"
                  src="../../public/thumbs/thumbs-up-solid.svg"
                ></img>
                <span className="font-semibold text-[20px]">
                  {gameInfo.rating_pos}
                </span>
              </div>

            <div className="h-[2px] bg-[#fff3] mx-4 my-2"></div>

            <div className="flex gap-4 ml-5">
              <img
                className="h-[25px]"
                src="../../public/thumbs/thumbs-down-solid.svg"
              ></img>
              <span className="font-semibold text-[20px]">
                {gameInfo.rating_neg}
              </span>
            </div>
          </div>


            <div className="h-[180px] w-[160px] top-[20px] relative">
              <div
                className="p-[20px] h-[160px] w-[160px] rounded-[50%]
                shadow-[6px_6px_10px_-1px_rgba(0,0,0,0.6),6px_6px_10px_-1px_rgba(255,255,255,0.15)]"
              >
                <div
                  className="h-[120px] w-[120px] rounded-[50%]
                  shadow-[inset_4px_4px_10px_-1px_rgba(0,0,0,0.6),inset_4px_4px_10px_-1px_rgba(255,255,255,0.15)]
                  flex justify-center items-center"
                >
                  <p className="font-bold text-[30px]">{gameInfo.rating}%</p>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="160px"
                height="160px"
                className="absolute left-0 top-0"
              >
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: `${(435 * gameInfo.rating) / 100}`,
                  }}
                  className="fill-none stroke-[#f28a22] stroke-[20px]"
                />
              </svg>
            </div>
          </div>
          


          </div>
        </div>

        <div className="h-[2px] bg-[#fff9] mx-4 my-2 lg:hidden"></div>

        <div
          className="flex flex-col text-left py-[1rem] px-[5%]
          bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#2222] via-[#8882] to-[#fff2]
          lg:hidden"
        >
          <h1 className="text-white font-bold">{gameInfo.name}</h1>
          <p className="text-[#cce] text-[13px]">{`${gameInfo.short_description}`}</p>
          
        </div>

        <div className="h-[2px] bg-[#fff9] mx-4 my-2"></div>

        <div className="flex gap-3">
          <div
            className="pt-4 pb-6 px-[5%] flex flex-col justify-between w-[100%]
            bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#2222] via-[#8882] to-[#fff2]"
          >
            
            <h2 className="text-white mb-2 text-left text-[20px] font-semibold">Buy {gameInfo.name}</h2>
              
            
            <div className="flex justify-center gap-[5rem]">
              <button
                className="bg-lime-500 w-[18ch] font-semibold p-3 rounded-[4px]
              shadow-[6px_6px_10px_-1px_rgba(0,0,0,0.6),6px_6px_10px_-1px_rgba(255,255,255,0.15)]
              transition-all
              hover:bg-lime-300"
              onClick={() => handleAddToCart(id)}
              >
                {isItemInCart ? 'Remove from Cart' : `ARS $${gameInfo.price}`}
              </button>

              <button
                className="bg-blue-500 w-[18ch] font-semibold p-3 rounded-[4px]
              shadow-[6px_6px_10px_-1px_rgba(0,0,0,0.6),6px_6px_10px_-1px_rgba(255,255,255,0.15)]
              transition-all
              hover:bg-blue-300"
              >
                Add to wishlist
              </button>
            </div>                  

            <div className="flex justify-between">
              <p className="text-white">Supported platforms</p>
              <div className="flex justify-end items-end gap-2">
                  <img
                    src="../../public/platforms/apple.svg"
                    className={`h-[20px]  ${
                      gameInfo.platforms.mac == true ? "" : "hidden"
                    }`}
                  ></img>
                  <img
                    src="../../public/platforms/linux.svg"
                    className={`h-[20px]  ${
                      gameInfo.platforms.linux == true ? "" : "hidden"
                    }`}
                  ></img>
                  <img
                    src="../../public/platforms/windows.svg"
                    className={`h-[20px]  ${
                      gameInfo.platforms.windows == true ? "" : "hidden"
                    }`}
                  ></img>
                </div>
            </div>
          </div>
          <div 
        className="text-white text-left
        p-4 w-[100%]
        bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#2222] via-[#8882] to-[#fff2]"
        dangerouslySetInnerHTML={{ __html: gameInfo.pc_requirements }} />

        </div>

        

        <div className="h-[2px] bg-[#fff9] mx-4 my-2"></div>

        <div
          className="text-white text-left px-[5%]
          bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#2222] via-[#8882] to-[#fff2]
          flex justify-between
          lg:hidden"
        >
          <div className="flex-col">
            <p className="flex items-center font-semibold text-[50px]">
              Rating
            </p>
            <div className="flex gap-4 my-2 ml-5">
              <img
                className="h-[25px]"
                src="../../public/thumbs/thumbs-up-solid.svg"
              ></img>
              <span className="font-semibold text-[20px]">
                {gameInfo.rating_pos}
              </span>
            </div>

            <div className="h-[2px] bg-[#fff3] mx-4 my-2"></div>

            <div className="flex gap-4 ml-5">
              <img
                className="h-[25px]"
                src="../../public/thumbs/thumbs-down-solid.svg"
              ></img>
              <span className="font-semibold text-[20px]">
                {gameInfo.rating_neg}
              </span>
            </div>
          </div>
          <div className="h-[180px] w-[160px] top-[10px] relative">
            <div
              className="p-[20px] h-[160px] w-[160px] rounded-[50%]
              shadow-[6px_6px_10px_-1px_rgba(0,0,0,0.6),6px_6px_10px_-1px_rgba(255,255,255,0.15)]"
            >
              <div
                className="h-[120px] w-[120px] rounded-[50%]
                shadow-[inset_4px_4px_10px_-1px_rgba(0,0,0,0.6),inset_4px_4px_10px_-1px_rgba(255,255,255,0.15)]
                flex justify-center items-center"
              >
                <p className="font-bold text-[30px]">{gameInfo.rating}%</p>
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="160px"
              height="160px"
              className="absolute left-0 top-0"
            >
              <circle
                cx="80"
                cy="80"
                r="70"
                strokeLinecap="round"
                style={{
                  strokeDasharray: `${(435 * gameInfo.rating) / 100}`,
                }}
                className="fill-none stroke-[#f28a22] stroke-[20px]"
              />
            </svg>
          </div>
        </div>

        {/*----------aca abajo manda los comentarios---------*/}

      </div>
    </div>
  );
}