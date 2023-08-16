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
    <div className="overflow-hidden bg-[#111827] flex flex-row justify-center gap-10 w-full items-start py-6">
      <div className="flex flex-row gap-4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#2222] via-[#8882] to-[#fff2] p-5 rounded-lg">
        <div className="flex flex-col    items-center">
          <img src={photo} className="w-[64px] h-[64px] rounded-lg " alt="User's Photo" />
          {/* <div className="text-lg font-['Poppins'] font-medium text-white self-stretch ml-3 mr-4">DEEZEE</div> */}
        </div>
        <div className="">
          <form onSubmit={(e) => handleSubmit(e)} method="post" encType="multipart/form-data">
            <div className="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden bg-[#21232f] relative flex flex-col mb-3 rounded-lg ">
              <div className="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden bg-[#334155] w-[500px] h-[64px] flex flex-row  gap-4 items-center p-2  rounded-lg">
                <input type="text" ref={title} name="title" placeholder="Title" className="text-4xl font-['Poppins'] font-semibold text-white/100 ml-5 bg-transparent border-none outline-none" />
              </div>
            </div>
            <div className="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] bg-[#334155] flex flex-col justify-center px-8 py-6 rounded-lg">
              <textarea
                ref={content}
                name="content"
                placeholder="Please share your opinion about this game! Other gamers might find it useful :)"
                className="text-sm font-['Poppins'] text-left text-[#ccccee] ml-px bg-transparent resize-y"
              />
            </div>
            <div className="flex flex-row justify-between mt-5 mx-2 items-center  ">
              <div className="flex flex-row gap-0 items-center">
                <button type="button" className={`cursor-pointer ${yesRecommendation ? "selected" : ""}`} onClick={() => handleRecommendation(true)}>
                  <img
                    src={yesRecommendation ? "https://file.rendit.io/n/BcPCfvQYPxFTdjUy9IQE.png" : "https://file.rendit.io/n/6gmV1BE7nsc2UzaxwmqB.png"}
                    className="w-[50px] h-[50px]  rounded-lg"
                    alt="Yes/true"
                  />
                </button>
                <button type="button" className={`cursor-pointer ${noRecommendation ? "selected" : ""}`} onClick={() => handleRecommendation(false)}>
                  <img
                    src={noRecommendation ? "https://file.rendit.io/n/mxD3xAIxJPPTcaK3waS5.png" : "https://file.rendit.io/n/NUvWI0XEiaMdd3HaryY1.png"}
                    className="w-[50px] h-[50px]  rounded-lg"
                    alt="No/false"
                  />
                </button>
              </div>
              <div>
                <Anchor onClick={handleSubmit} className="cursor-pointer">
                  <img src="https://file.rendit.io/n/Tq3JUSa4q165CvO2JjzH.png" className="w-[40px] h-[40px] " alt="Submit" />
                </Anchor>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
