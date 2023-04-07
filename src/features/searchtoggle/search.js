import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const modamSlice = createSlice({
  name: "modam",
  initialState,
  reducers: {
    searchToggle: (state) => {
      state.isOpen = true;
    },
    clearSearch: (state) => {
      state.isOpen = false;
    },
  },
});

export const { searchToggle, clearSearch } = modamSlice.actions;
export default modamSlice.reducer;
