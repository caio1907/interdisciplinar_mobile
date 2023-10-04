import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import ProductType from "../types/Product.type";

const initialState: {cart: {[key: number]: ProductType}} = {
  cart: {}
};

const store = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, {payload}) => {
      if (state.cart[payload.id]) {
        state.cart[payload.id].quantity++;
      } else {
        state.cart[payload.id] = {...payload, quantity: 1};
      }
    },
    decreaseCartItem: (state, {payload}) => {
      if (state.cart[payload.id].quantity === 1) {
        delete state.cart[payload.id];
      } else {
        state.cart[payload.id].quantity--;
      }
    }
  }
});

export const { addToCart, decreaseCartItem } = store.actions;
export const getCart = (state: RootState) => state.cart;
export default store.reducer;
