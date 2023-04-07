import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const formatNumber = (num) => {
  if (num === null || num === undefined) return "";
  if (num < 10000) return num;
  let formated = "";
  let str = String(num);
  for (let i = str.length - 1, j = 0; i >= 0; i--, j++) {
    if (j > 0 && j % 3 === 0) {
      formated = "," + formated;
    }
    formated = str[i] + formated;
  }
  return formated;
};

export const fetchNewListed = createAsyncThunk(
  "newlisted/fetchNewListed",
  async () => {
    const response = await axios.get(
      `https://crypto-api-utnm.onrender.com/api/v1/coin_list`
    );
    return response.data;
  }
);

const newListed = createSlice({
  name: "newlisted",
  initialState: {
    coinlist: [],
    pagnitation: [],
    sts: "idle",
    error: null,
    currentPage: 1,
    postPerPage: 20,
    totalPost: 0,
  },
  reducers: {
    changeCurrPage: (state, action) => {
      state.currentPage = action.payload;
      state.pagnitation = [];
    },
    clearPageItems: (state) => {
      const firstPostIndex = (state.currentPage - 1) * state.postPerPage;
      const lastPostIndex = state.currentPage * state.postPerPage;
      state.pagnitation = state.coinlist.slice(firstPostIndex, lastPostIndex);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewListed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNewListed.fulfilled, (state, action) => {
        state.status = "succeeded";
        const item = action.payload;
        state.totalPost = item.length;
        state.coinlist = item.map((item) => {
          return {
            ...item,
            price: formatNumber(item.current_price),
            vol_24: formatNumber(item.current_price),
            market_cap: formatNumber(item.total_volume),
            price_change_percentage_24h: Number(
              item.price_change_percentage_24h
            ).toFixed(2),
            market_cap_change_percentage_24h: Number(
              item.market_cap_change_percentage_24h
            ).toFixed(2),
          };
        });
        state.pagnitation = state.coinlist.slice(0, 19);
      })

      .addCase(fetchNewListed.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { changeCurrPage, clearPageItems } = newListed.actions;
export default newListed.reducer;
