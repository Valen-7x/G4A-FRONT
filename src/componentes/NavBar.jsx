import React, { useState } from 'react';
import { Link as Anchor, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


let user = JSON.parse(localStorage.getItem("user"))
console.log(localStorage.getItem("user"));
let role = user?.role
/* console.log(user.email) */

let userEmail = user?.email
let photoUser = user?.photo

function NavBar({cartCount}) {
  let token = localStorage.getItem('token');
  console.log(token);
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  const logout = () => {
    navigate("/");
    localStorage.removeItem('user');
    localStorage.removeItem('photo');
    localStorage.removeItem('token');
  };

  return (

    <nav className="flex items-center w-100vw w-[100%] h-[auto] justify-between md:w-[100%] md:h-[auto] relative z-20 ">
      <div className="max-w-screen mx-auto px-4 w-[100%] z-10 bg-[#111827]">        
          <div className="flex flex-col sm:justify-between sm:flex sm:flex-row items-center">
            <div className="flex flex-col  sm:flex-row sm:justify-around  sm:gap-[11rem] items-center flex-shrink-0">
              <img
                className="flex items-center m-[21px] w-[4rempx] h-[50px] md:h-[60px] md:mt-[27px] sm:mr-[0rem] rounded-2xl"
                src="public\Captura de pantalla (101).png"
                alt="Logo" />
            
            </div>
            <div className='flex gap-5'>
            <Link to="/cart">
          <img className="hover:scale-150 green" src="public\Vector (1).svg" alt="" />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
        <Link to="/"> 
        <img className='w-[2rem] mb-[0rem] sm:mb-[0] hover:scale-150' src="public\Vector.png" alt="" />
        </Link>
        
           
            </div>
          </div>
        </div>
      
    </nav>
  );
}
export default NavBar;