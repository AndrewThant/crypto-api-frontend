import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTrendingNews = createAsyncThunk(
  "news/fetchTrendingNews",
  async () => {
    const response = await axios.get(
      "https://crypto-api-utnm.onrender.com/api/v1/trending_news"
    );

    return response.data.value;
  }
);

const initialState = {
  news: [],
  isLoading: false,
};

const news = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTrendingNews.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchTrendingNews.fulfilled]: (state, action) => {
      state.isLoading = false;
      const filter = action.payload;
      for (let i = 0; i < 10; i++) {
        state.news.push(filter[i]);
      }
    },
    [fetchTrendingNews.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default news.reducer;
