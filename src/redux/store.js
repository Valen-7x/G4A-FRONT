import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/reducers/auth.js";
import cartReducer from "./reducers/cart.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
})
