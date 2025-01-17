import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import ConfigType from "../types/Config.type";

const initialState: ConfigType = {
  logo: '',
  whatsapp_sales: ''
};

const store = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfig(state, {payload}) {
      state.logo = payload.logo;
      state.whatsapp_sales = payload.whatsapp_sales;
    }
  }
});

export const { setConfig } = store.actions;
export const getConfig = (state: RootState) => state.config;
export default store.reducer;
