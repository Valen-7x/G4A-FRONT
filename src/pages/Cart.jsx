import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../componentes/Sidebar";
import {
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
} from "../redux/actions/cart.js";
import Market from "../componentes/Market";

export default function CartView() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleIncreaseQuantity = (itemId, availableKeys) => {
    dispatch(increaseQuantity(itemId, availableKeys));
  };

  const handleDecreaseQuantity = (itemId, quantity) => {
    if (quantity > 1) {
      dispatch(decreaseQuantity(itemId));
    }
  };

  const handleUpdateQuantity = (item, newQuantity) => {
    dispatch(updateQuantity(item, newQuantity));
  };

  // ------ TOTAL ------
  const totalCartPrice = cartItems
    .reduce((total, item) => total + item.game.game.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="bg-gray-900">
      <div className="flex bg-gray-900 text-white">
        <Sidebar />
          <div className="w-[100%]">
            <h2
              className="h-[5rem] w-[100%] mb-8
        flex items-center justify-center
        font-extrabold
        bg-[#2224]
        shadow-[1px_1px_15px_1px_rgba(255,255,255,0.2)]"
            >
              YOUR SHOPPING CART
            </h2>
            <ul className="flex flex-col gap-5 mx-[5%]">
              {cartItems.map((item) => (
                <li
                  className="p-2
              bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#2222] via-[#8882] to-[#fff2]
              flex flex-col
              shadow-[2px_2px_5px_1px_rgba(0,0,0,0.25)]
              rounded-[2px] relative
              bg-[#22223a]
              md:flex-row
              md:h-[15rem]"
                  key={item.id}
                >
                  {/* ------ CART ITEM ------ <div className="h-4 overflow-hidden text-ellipsis" dangerouslySetInnerHTML={{ __html: item.game.game.short_description }} />*/}
                  <button
                    className="h-[20px] w-[20px] m-1 flex justify-center items-center bg-[#D94444] absolute top-0 right-0 rounded-[2px] shadow-[2px_2px_5px_1px_rgba(0,0,0,0.25)]
                md:bottom-0"
                  >
                    X
                  </button>
                  <img
                    className="
                md:w-[20rem]
                md:object-contain"
                    src={item.game.game.header_image}
                  ></img>
                  <div>
                    <div
                      className="flex justify-between items-center
                  md:flex-col md:ml-5
                  md:items-start
                  
                  md:h-[100%]
                  "
                    >
                      <div>
                        <p className="font-bold text-[30px] text-left">
                          {item.game.game.name}
                        </p>
                        <p className="text-left text-[#fffc]">{item.game.game.short_description}</p>
                      </div>
                      <div
                        className="
                    md:flex md:flex-row-reverse md:justify-between md:w-[100%]
                    md:mt-5"
                      >
                        <p className="font-semibold text-[20px]">
                          {(item.game.game.price * item.quantity).toFixed(2)}
                        </p>
                        {/* ------ QUANTITY ------*/}
                        <div className="flex shadow-[2px_2px_5px_1px_rgba(0,0,0,0.25)]">
                          <button
                            className="px-2 font-bold bg-[#E58D27]"
                            onClick={() => handleIncreaseQuantity(item.id, 3)}
                          >
                            +
                          </button>

                          <p className="w-[3ch] font-bold px-1 bg-gray-600">
                            {item.quantity}
                          </p>
                          <button
                            className={`px-2 font-bold bg-[#E58D27] ${
                              item.quantity === 1 ? "cursor-not-allowed" : ""
                            }`}
                            onClick={() =>
                              handleDecreaseQuantity(item.id, item.quantity)
                            }
                            disabled={item.quantity === 1}
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {/* ------ TOTAL ------ */}
          </div>
      </div>
      <Market
      className="w-[100%]"
      total={totalCartPrice}/>
    </div>
  );
}
