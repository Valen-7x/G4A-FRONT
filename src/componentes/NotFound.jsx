import { Link as Anchor } from "react-router-dom";

export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center gap-10 w-full h-[85vh] bg-[#111827]'>
      <h1 className=" md:text-[white] hidden md:w-[70%] md:flex md:self-center font-bold md:text-[2rem] md:text-center md:justify-center relative z-10">
      The page you are trying to access does not exist. Return to the G4A home and continue browsing
      </h1>
      <Anchor to="/"
                className="w-[40vh]  border border-solid border-amber-300 bg-gradient-to-r from-amber-400 to-amber-700 transition-colors duration-500 hover:from-amber-400 hover:to-amber-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Home
              </Anchor>
    </div>
  );
}