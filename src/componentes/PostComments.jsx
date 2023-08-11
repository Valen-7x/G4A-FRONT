import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const email = localStorage.getItem("email");
const photo = localStorage.getItem("photo");

const PostComments = (props) => {
  const { img, title, category, price, onClick } = props;
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [recomendation, setRecommendation] = useState(null);
  const [yesRecommendation, setYesRecommendation] = useState(false);
  const [noRecommendation, setNoRecommendation] = useState(false);

  const MaxTitleLength = 30;

  const handleTitleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= MaxTitleLength) {
      setTitleInput(inputValue);
    }
  };
  const handleContentChange = (event) => {
    setContentInput(event.target.value);
  };
  const handleRecommendation = (value) => {
    setYesRecommendation(value === true);
    setNoRecommendation(value === false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", titleInput);
    formData.append("content", contentInput);
    if (yesRecommendation) {
      formData.append("recommendation", "true");
    } else if (noRecommendation) {
      formData.append("recommendation", "false");
    }
    try {
      const response = await fetch("", {
        method: "POST",
        body: formData,
      });

      // Handle the response as needed
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const storedPhoto = localStorage.getItem("photo");
    if (storedPhoto) {
      setPhoto(storedPhoto);
    }
  }, []);
  return (
    <div className="overflow-hidden bg-[#171a1f] flex flex-row justify-center gap-16 w-full items-start py-6">
      <div className="flex flex-col mt-6 w-24 shrink-0 items-center">
        <img src={photo} className="w-20 h-24 rounded-lg shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]" alt="User's Photo" />
        {/* <div className="text-lg font-['Poppins'] font-medium text-white self-stretch ml-3 mr-4">DEEZEE</div> */}
      </div>
      <div className="self-end flex flex-col mt-6 gap-1 w-[767px]">
        <form onSubmit={handleSubmit}>
          <div className="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden bg-[#21232f] relative flex flex-col mb-3 rounded-lg">
            <div className="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden bg-[#21232f] relative flex flex-col justify-center h-24 shrink-0 px-8 rounded-lg">
              <input
                type="text"
                value={titleInput}
                onChange={handleTitleChange}
                className="text-4xl font-['Poppins'] font-semibold text-white/50 ml-2 bg-transparent border-none outline-none"
                placeholder="Write a short title for your review..."
              />
            </div>
          </div>
          <div className="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] bg-[#21232f] flex flex-col mb-6 pt-8 pb-10 px-6 rounded-lg">
            <textarea
              value={contentInput}
              onChange={handleContentChange}
              className="text-lg font-['Poppins'] text-white/50 ml-6 h-[130px] bg-transparent border-none outline-none resize-y"
              placeholder="Please tell us more about the product, other gamers might find it useful :)"
            />
          </div>
          <div className="flex flex-row justify-between items-center ml-12 mr-8">
            <div className="flex flex-row gap-3 items-center">
              <button type="button" className="w-16 h-16 bg-transparent border-none outline-none cursor-pointer" onClick={() => handleRecommendation(true)}>
                <img src={yesRecommendation ? "https://file.rendit.io/n/3LdCsqemgLPHOwwE7U02.png" : "https://file.rendit.io/n/sVPcRaQIt2ZrfFdDIpRF.png"} className="w-full h-full" alt="Yes/true" />
              </button>
              <button type="button" className="w-16 h-16 bg-transparent border-none outline-none cursor-pointer" onClick={() => handleRecommendation(false)}>
                <img src={noRecommendation ? "https://file.rendit.io/n/kVWHAFfmYKRkwsJ1BEeJ.png" : "https://file.rendit.io/n/FhvlJQqUKsIdgMt7GoMg.png"} className="w-full h-full" alt="No/false" />
              </button>
            </div>
            <button type="submit" className="w-16 h-16 bg-transparent border-none outline-none cursor-pointer">
              <img src="https://file.rendit.io/n/Tq3JUSa4q165CvO2JjzH.png" className="w-full h-full" alt="Submit" />
            </button>{" "}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostComments;
