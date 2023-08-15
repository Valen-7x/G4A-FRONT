import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ViewComments() {
  const [comments, setComments] = useState([]);
  const game_id = localStorage.getItem("game_id");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/comment/${game_id}`);
        // const response = await axios.get(`http://localhost:8080/api/comment/64d207e5c3feb0197f2e2fef`);
        setComments(response.data);
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [game_id]);

  const userIdLS = localStorage.getItem("id");

  return (
    <div className="overflow-hidden bg-[#171a1f] flex flex-row justify-center gap-16 w-full items-center">
      {comments.map((comment, index) => (
        <div key={index} className="flex flex-row gap-16">
          <div className="flex flex-col justify-between w-24 shrink-0 h-[456px] items-center mt-12 mb-10">
            <img src={comment.user_photo} className="w-24" id="Ellipse" alt={`User ${index} Photo`} />
            <div className="flex flex-row gap-2 w-16 items-center">
              {comment.user_id === userIdLS && (
                <>
                  <img src="https://file.rendit.io/n/Vv6i7X17BGo2Uw6GHWmU.png" className="w-8 shrink-0" alt="Edit Icon" />{" "}
                  <img src="https://file.rendit.io/n/YPCikyQncft0Xodg7741.png" className="w-8 shrink-0" id="Eraser" alt="Eraser Icon" />
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 w-[767px]" key={index}>
            <div className="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden bg-[#21232f] flex flex-row justify-end gap-4 items-center pt-2 px-2 rounded-lg">
              <img
                src={comment.recommends ? "https://file.rendit.io/n/3LdCsqemgLPHOwwE7U02.png" : "https://file.rendit.io/n/kVWHAFfmYKRkwsJ1BEeJ.png"}
                className="w-12 "
                id="RecommendImage"
                alt="Recommend Icon"
              />
              <span className="text-4xl font-['Poppins'] font-semibold text-white self-start mt-2 w-[636px] h-[51.81%]">{comment.title}</span>
            </div>
            <div className="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] bg-[#21232f] flex flex-col justify-center px-8 py-6 rounded-lg">
              <div className="text-sm font-['Poppins'] text-white ml-px h-full">{comment.content}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
