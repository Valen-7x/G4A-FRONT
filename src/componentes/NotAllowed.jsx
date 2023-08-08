import React from 'react';
import { Link as Anchor } from "react-router-dom";

export default function NotAllowed() {
  return (
    <div className='flex flex-col justify-center items-center  gap-10 w-full h-[87vh] bg-[black]'>
      <h1 className=" md:text-[white] hidden md:w-[100%] md:flex md:self-center font-bold md:text-[2rem] md:text-center md:justify-center relative z-10">
      route not found, if you are already logged in, verify that your account is role 1 or role 2. If you are not logged in yet, click on the button to log in
      </h1>
<Anchor to="/signin"
                /*</div>onClick={handleFormSubmit}*/
                className="w-[40vh]  bg-[blue] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Log In
              </Anchor>
    </div>
  );
}