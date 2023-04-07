import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTrendingCoins = createAsyncThunk(
  "trending/getTrendingCoins",
  async () => {
    const response = await axios.get(
      "https://crypto-api-utnm.onrender.com/api/v1/trending_coins"
    );

    return response.data.coins;
  }
);

export const getBitcoinPrice = createAsyncThunk(
  "trending/getBitcoinPrice",
  async () => {
    const response = await axios.get(
      "https://crypto-api-utnm.onrender.com/api/v1/bitcoin_price"
    );
    return response.data.bitcoin.usd;
  }
);

export const searchCoin = createAsyncThunk(
  "trending/searchCoin",
  async (query) => {
    const response = await axios.get(
      `https://crypto-api-utnm.onrender.com/api/v1/search?query=${query}`
    );
    if (query.length > 0) {
      return response.data.coins;
    } else {
      return [];
    }
  }
);

const initialState = {
  coins: [],
  coinbase: [],
  searchItem: [],
  isLoading: false,
  search: false,
  price: 0,
};

const trendingSlice = createSlice({
  name: "trending",
  initialState,
  reducers: {
    resetSearch: (state) => {
      state.searchItem = [];
    },
  },
  extraReducers: {
    [getTrendingCoins.pending]: (state) => {
      state.isLoading = true;
    },
    [getTrendingCoins.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.coins = action.payload.map((coin) => {
        return {
          id: coin.item.id,
          name: coin.item.name,
          image: coin.item.large,
          priceBtc: coin.item.price_btc.toFixed(10),
          priceUsd: (coin.item.price_btc * state.price).toFixed(6),
        };
      });
    },
    [getTrendingCoins.rejected]: (state) => {
      state.isLoading = false;
    },
    [searchCoin.pending]: (state) => {
      state.isLoading = true;
    },
    [searchCoin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.searchItem = action.payload.map((coin) => {
        return {
          id: coin.id,
          name: coin.name,
          image: coin.large,
          rank: coin.market_cap_rank,
        };
      });
    },
    [searchCoin.rejected]: (state) => {
      state.isLoading = false;
    },
    [getBitcoinPrice.pending]: (state) => {
      state.isLoading = true;
    },
    [getBitcoinPrice.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.price = action.payload;
    },
    [getBitcoinPrice.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { resetSearch } = trendingSlice.actions;
export default trendingSlice.reducer;
