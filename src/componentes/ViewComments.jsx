import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ViewComments() {
  const title = useRef("");
  const content = useRef("");
  const game_id = localStorage.getItem("game_id");
  const [comments, setComments] = useState([]);
  const [yesRecommendation, setYesRecommendation] = useState(false);
  const [noRecommendation, setNoRecommendation] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [commentRecommendations, setCommentRecommendations] = useState({}); // Object to track
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRecommendation = (commentId, isRecommended) => {
    setCommentRecommendations((prevRecommendations) => ({
      ...prevRecommendations,
      [commentId]: isRecommended,
    }));
  };

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
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/comment/${commentId}`);
      if (response.status === 200) {
        setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  async function handleEditComment(event, commentId) {
    event.preventDefault();

    const requestData = {
      title: title.current.value,
      content: content.current.value,
      recommends: commentRecommendations[commentId] ? "true" : "false",
    };

    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.put(`http://localhost:8080/api/comment/${commentId}`, requestData, headers);
      console.log(res, "res");
      setComments((prevComments) =>
        prevComments.map((comment) => (comment._id === commentId ? { ...comment, title: requestData.title, content: requestData.content, recommends: requestData.recommends } : comment))
      );
      setEditingCommentId(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error.message);
      console.error("Response data:", error.response.data);
    }
  }

  const userIdLS = localStorage.getItem("id");

  return (
    <div className="overflow-hidden bg-[#111827] flex flex-col justify-center gap-10 w-full items-center">
      {comments.map((comment, index) => (
        <div key={index} className="flex flex-row gap-4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#2222] via-[#8882] to-[#fff2] p-5 rounded-lg">
          <div className="">
            <img src={comment.user_photo} className="w-[64px] h-[64px] rounded-lg " alt={`User ${index} Photo`} />
            <div className="flex gap-2 w-5 ">
              {comment.user_id === userIdLS && (
                <>
                  <img
                    src="https://file.rendit.io/n/Vv6i7X17BGo2Uw6GHWmU.png"
                    className="ml-[7px] mt-3 cursor-pointer"
                    alt="Edit button"
                    onClick={() => {
                      setEditingCommentId(comment._id);
                      setIsModalOpen(true);
                    }}
                  />
                  <img src="https://file.rendit.io/n/YPCikyQncft0Xodg7741.png" className=" mt-3 cursor-pointer" alt="Delete button" onClick={() => handleDeleteComment(comment._id)} />
                </>
              )}
            </div>
          </div>
          <div className=" ">
            <div className="flex flex-col gap-4 w-[500px]" key={index}>
              <div className="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden bg-[#334155] w-[500px] flex flex-row  gap-4 items-center p-2  rounded-lg">
                <img
                  src={comment.recommends ? "https://file.rendit.io/n/EDOaSnkxn383UHSrCEfn.png" : "https://file.rendit.io/n/uPHwGYfAI0VPPie68nV9.png"}
                  className="w-12 h-[64px]pl-[12px] rounded-lg  "
                  id="RecommendImage"
                  alt="Recommend Icon"
                />
                <span className="text-4xl font-['Poppins'] font-semibold  text-[#FFFFFF] self-start mt-2 w-[500px] text-left">{comment.title}</span>
              </div>
              <div className="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] bg-[#334155] flex flex-col justify-center px-8 py-6 rounded-lg">
                <div className="text-sm font-['Poppins'] text-[#ccccee] ml-px h-full text-left">{comment.content}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {comments.map((comment, index) => (
        <div key={index} className="">
          {editingCommentId === comment._id && isModalOpen && (
            <div className="fixed inset-0 z-50 flex  items-center justify-center backdrop-blur ">
              <div className="">
                <div className="">
                  <button className="ml-[490px] mb-[5px] text-gray-500 hover:text-gray-700 focus:outline-none" onClick={() => setIsModalOpen(false)}>
                    <img src="https://file.rendit.io/n/u1gzBlDhfdRsSOSJJOvB.png" />
                  </button>
                </div>
                <div className=" bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#2222] via-[#8882] to-[#fff2] p-4 rounded-lg shadow-lg ">
                  <form onSubmit={(e) => handleEditComment(e, comment._id)} method="post" encType="multipart/form-data">
                    <div className="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden bg-[#21232f] relative flex flex-col mb-3 rounded-lg">
                      <div className="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden bg-[#334155] w-[500px] flex flex-row  gap-4 items-center p-2  rounded-lg">
                        <input
                          type="text"
                          ref={title}
                          name="title"
                          defaultValue={comment.title}
                          className="text-4xl font-['Poppins'] font-semibold text-white/100 ml-2 bg-transparent border-none outline-none"
                        />
                      </div>
                    </div>
                    <div className="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] bg-[#334155] flex flex-col justify-center px-8 py-6 rounded-lg">
                      <textarea ref={content} name="content" defaultValue={comment.content} className="text-sm font-['Poppins'] text-left text-[#ccccee] ml-px bg-transparent resize-y" />
                    </div>
                    <div className="flex flex-row justify-between items-center ml-12 mr-8">
                      <div className="flex flex-row gap-3 items-center">
                        <button
                          type="button"
                          className={`w-16 h-16 bg-transparent border-none outline-none cursor-pointer ${commentRecommendations[comment._id] ? "selected" : ""}`}
                          onClick={() => handleRecommendation(comment._id, true)}
                        >
                          <img
                            src={yesRecommendation ? "https://file.rendit.io/n/BcPCfvQYPxFTdjUy9IQE.png" : "https://file.rendit.io/n/6gmV1BE7nsc2UzaxwmqB.png"}
                            className="w-[50px] h-[50px]  rounded-lg"
                            alt="Yes/true"
                          />
                        </button>
                        <button
                          type="button"
                          className={`w-16 h-16 bg-transparent border-none outline-none cursor-pointer ${!commentRecommendations[comment._id] ? "selected" : ""}`}
                          onClick={() => handleRecommendation(comment._id, false)}
                        >
                          <img
                            src={noRecommendation ? "https://file.rendit.io/n/mxD3xAIxJPPTcaK3waS5.png" : "https://file.rendit.io/n/NUvWI0XEiaMdd3HaryY1.png"}
                            className="w-[50px] h-[50px]  rounded-lg"
                            alt="No/false"
                          />
                        </button>
                      </div>
                      <div>
                        <button type="submit" className="w-16 h-16 bg-transparent border-none outline-none cursor-pointer">
                          <img src="https://file.rendit.io/n/Tq3JUSa4q165CvO2JjzH.png" className="w-[50px] h-[50px] " alt="Submit" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
