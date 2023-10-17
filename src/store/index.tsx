import { configureStore } from "@reduxjs/toolkit";
import LoaderReducer from "./Loader.store";
import CartReducer from "./Cart.store";
import ConfigReducer from "./Config.store";

const store = configureStore({
  reducer: {
    loader: LoaderReducer,
    cart: CartReducer,
    config: ConfigReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export default store;
