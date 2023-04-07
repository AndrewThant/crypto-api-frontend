import { createSlice } from "@reduxjs/toolkit";

// Retrieve the mode from localStorage when the page loads
const storedMode = localStorage.getItem("mode");

const initialState = {
  mode: storedMode ? storedMode : "light",
};

const appSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setMode: (state, action) => {
      // Update the mode in the Redux store
      state.mode = action.payload;
      // Update the mode in localStorage
      localStorage.setItem("mode", action.payload);
    },
  },
});

export const { setMode } = appSlice.actions;

export default appSlice.reducer;
