import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { apiUrl, endpoints } from "../../utils/api";
import { Link as Anchor } from "react-router-dom";

export default function PostComments() {
  const title = useRef("");
  const content = useRef("");
  const [yesRecommendation, setYesRecommendation] = useState(false);
  const [noRecommendation, setNoRecommendation] = useState(false);
  const game_id = localStorage.getItem("game_id");
  const user_id = localStorage.getItem("id");
  const user_photo = localStorage.getItem("photo");

  const handleRecommendation = (isRecommended) => {
    setYesRecommendation(isRecommended);
    setNoRecommendation(!isRecommended);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const requestData = {
      user_id: user_id,
      game_id: game_id,
      user_photo: user_photo,
      title: title.current.value,
      content: content.current.value,
      recommends: yesRecommendation ? "true" : "false",
    };

    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.post(apiUrl + endpoints.comment, requestData, headers);
      console.log(res, "res");

      localStorage.removeItem("game_id");
    } catch (error) {
      console.error("Error submitting form:", error.message);
      console.error("Response data:", error.response.data);
    }
  }

  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const storedPhoto = localStorage.getItem("photo");
    if (storedPhoto) {
      setPhoto(storedPhoto);
    }
  }, []);

  const [comments, setComments] = useState([]);
  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get(apiUrl + endpoints.comment + `/${game_id}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error.message);
      }
    }

    fetchComments();
  }, [game_id]);

  const hasMatchingComment = comments.some((comment) => comment.user_id === user_id);

  if (hasMatchingComment) {
    return null;
  }

  return (
    <div className="overflow-hidden bg-[#171a1f] flex flex-row justify-center gap-16 w-full items-start py-6">
      <div className="flex flex-col mt-6 w-24 shrink-0 items-center">
        <img src={photo} className="w-20 h-24 rounded-lg shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]" alt="User's Photo" />
        {/* <div className="text-lg font-['Poppins'] font-medium text-white self-stretch ml-3 mr-4">DEEZEE</div> */}
      </div>
      <div className="self-end flex flex-col mt-6 gap-1 w-[767px]">
        <form onSubmit={(e) => handleSubmit(e)} method="post" encType="multipart/form-data">
          <div className="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden bg-[#21232f] relative flex flex-col mb-3 rounded-lg">
            <div className="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden bg-[#21232f] relative flex flex-col justify-center h-24 shrink-0 px-8 rounded-lg">
              <input
                type="text"
                ref={title}
                name="title"
                className="text-4xl font-['Poppins'] font-semibold text-white/50 ml-2 bg-transparent border-none outline-none"
                placeholder="Write a short title for your review..."
              />
            </div>
          </div>
          <div className="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] bg-[#21232f] flex flex-col mb-6 pt-8 pb-10 px-6 rounded-lg">
            <textarea
              type="text"
              ref={content}
              name="content"
              className="text-lg font-['Poppins'] text-white/50 ml-6 h-[130px] bg-transparent border-none outline-none resize-y"
              placeholder="Please tell us more about the product, other gamers might find it useful :)"
            />
          </div>
          <div className="flex flex-row justify-between items-center ml-12 mr-8">
            <div className="flex flex-row gap-3 items-center">
              <button type="button" className={`w-16 h-16 bg-transparent border-none outline-none cursor-pointer ${yesRecommendation ? "selected" : ""}`} onClick={() => handleRecommendation(true)}>
                <img src={yesRecommendation ? "https://file.rendit.io/n/3LdCsqemgLPHOwwE7U02.png" : "https://file.rendit.io/n/sVPcRaQIt2ZrfFdDIpRF.png"} className="w-full h-full" alt="Yes/true" />
              </button>
              <button type="button" className={`w-16 h-16 bg-transparent border-none outline-none cursor-pointer ${noRecommendation ? "selected" : ""}`} onClick={() => handleRecommendation(false)}>
                <img src={noRecommendation ? "https://file.rendit.io/n/kVWHAFfmYKRkwsJ1BEeJ.png" : "https://file.rendit.io/n/FhvlJQqUKsIdgMt7GoMg.png"} className="w-full h-full" alt="No/false" />
              </button>
            </div>
            <div>
              <Anchor onClick={handleSubmit} className="w-16 h-16 bg-transparent border-none outline-none cursor-pointer">
                <img src="https://file.rendit.io/n/Tq3JUSa4q165CvO2JjzH.png" className="w-full h-full" alt="Submit" />
              </Anchor>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
