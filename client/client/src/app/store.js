import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
// import userReducer from "../features/user/userSlice";
import cardReducer from "../features/card/cardSlice";
// import orderReducer from "../features/order/orderSlice";

const store = configureStore({
  reducer: {
    // user: userReducer,
    product: productReducer,
    card: cardReducer,
    // order: orderReducer,
  },
});

export default store;
