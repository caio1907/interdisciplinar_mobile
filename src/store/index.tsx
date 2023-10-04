import { configureStore } from "@reduxjs/toolkit";
import LoaderReducer from "./Loader.store";
import CartReducer from "./Cart.store";

const store = configureStore({
  reducer: {
    loader: LoaderReducer,
    cart: CartReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export default store;
