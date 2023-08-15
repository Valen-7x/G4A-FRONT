export default function Footer() {
  return (
    <footer className=" h-[20vh] w-screen flex flex-col items-center pt-14 bg-gray-900 sm:h-[35vh]">
    <div className=" h-[30vh] w-screen flex flex-col justify-center items-center sm-[25vh] px-8 bg-[#080C13]">
     <p className="text-[#FAFCFC] text-sm">© 2023 G4A Corporation. All rights reserved. All trademarks are the property of their respective owners in the US and other countries.
</p>
<p className="text-[#FAFCFC] text-sm">All prices include VAT (where applicable). <span className="cursor-pointer text-amber-400 hover:text-amber-300"> Privacy Policy </span> | <span className="cursor-pointer text-amber-400 hover:text-amber-300"> Legal information </span> | <span className="cursor-pointer text-amber-400 hover:text-amber-300"> G4A Subscriber Agreement </span> | <span className="cursor-pointer text-amber-400 hover:text-amber-300"> Refunds </span> | <span className="cursor-pointer text-amber-400 hover:text-amber-300"> cookies </span></p>
    </div>
  </footer>
  );
}
