import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const VerifyCode = () => {
  let navigate = useNavigate()
  const [verificationCode, setVerificationCode] = useState("");

  const handleVerificationSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/api/auth/verify/${verificationCode}`);

      if (response.status === 200) {
        Swal({
          icon: "success",
          title: "Account verified successfully.",
          text: "You can now sign in to your Google account!",
          button: 'OK',
        });
        navigate('/signin')
      } else {
        Swal({
          icon: "error",
          title: "Verification Error.",
          text: "The verification code is invalid. Please check the code and try again.",
        });
      }
    } catch (error) {
      console.error("Verification failed:", error);
      Swal({
        icon: "error",
        title: "Verification failed.",
        text: "The verification code is invalid. Please check the code and try again.",
      });
    }
  };
  return (
    <div className="flex flex-col w-full h-[100vh] items-center justify-center bg-[#111827]">
      <h2 className="text-white text-4xl not-italic font-normal leading-[normal]">Account Verification</h2>
      <form onSubmit={handleVerificationSubmit} className="mt-[5%] flex flex-col items-center">
        <div>
        <label className="text-white text-base not-italic font-normal leading-[normal]">Enter Verification Code:</label>
        <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} required className="bg-slate-200 border-b-2 border-slate-400 ms-5 rounded-lg" />
        </div>
        <div className="flex w-[280px] justify-center items-center gap-2.5 py-5 rounded-[50000px] border-solid border-amber-300 bg-gradient-to-r from-amber-400 to-amber-700 transition-colors duration-500 hover:from-amber-400 hover:to-amber-600 mt-10">
        <button type="submit" className="text-white text-center text-2xl not-italic font-bold leading-[normal]">Verify</button>
        </div>
      </form>
    </div>
  );
};

export default VerifyCode;