import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import ConfigType from "../types/Config.type";

const initialState: ConfigType = {
  logo: ''
};

const store = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfig(state, {payload}) {
      state.logo = payload.logo;
    }
  }
});

export const { setConfig } = store.actions;
export const getConfig = (state: RootState) => state.config;
export default store.reducer;
