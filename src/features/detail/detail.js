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

const coinCategory = (coinCategory) => {
  let category = "";
  if (coinCategory.length < 5) {
    for (let i = 0; i < coinCategory.length; i++) {
      category += coinCategory[i] + " | ";
    }
  } else {
    for (let i = 0; i < 5; i++) {
      category += coinCategory[i] + " | ";
    }
  }
  return category;
};

const calculatePercentage = (num) => {
  const decimalNum = parseFloat(num);
  const percentage = decimalNum * 100;
  const formattedPercentage = percentage.toFixed(2);
  return Number(formattedPercentage);
};

const webFormat = (web) => {
  let format = [];
  if (web.length > 2) {
    for (let i = 0; i < 2; i++) {
      format.push(web[i]);
    }
  } else {
    for (let i = 0; i < web.length; i++) {
      format.push(web[i]);
    }
  }
  return format;
};

export const searchDetail = createAsyncThunk(
  "detail/searchDetail",
  async ({ id, time }) => {
    const response = await axios.get(
      `https://crypto-api-utnm.onrender.com/api/v1/chart_data?id=${id}&time=${time}`
    );
    return response.data;
  }
);

export const coinDetail = createAsyncThunk(
  "detail/coinDetail",
  async ({ id }) => {
    const response = await axios.get(
      `https://crypto-api-utnm.onrender.com/api/v1/coindetail?id=${id}`
    );
    return response.data;
  }
);

const initialState = {
  coindetail: [],
  img: "",
  isLoading: false,
  pricegraph: [],
  mcap: [],
  vol: [],
  isError: false,
  isMobile: false,
  formated: null,
};

const detailSlice = createSlice({
  name: "detailpage",
  initialState,
  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
  },
  extraReducers: {
    [searchDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [searchDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.pricegraph = action.payload.prices.map((item) => {
        const [time, price] = item;
        const date = new Date(time).toLocaleDateString("en-us");
        return {
          Date: date,
          Price: price,
        };
      });
      state.mcap = action.payload.prices.map((item) => {
        const [time, cap] = item;
        const date = new Date(time).toLocaleDateString("en-us");
        return {
          Date: date,
          Marketcap: cap,
        };
      });
      state.vol = action.payload.prices.map((item) => {
        const [time, vol] = item;
        const date = new Date(time).toLocaleDateString("en-us");
        return {
          Date: date,
          Volume: vol,
        };
      });
    },
    [searchDetail.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    [coinDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [coinDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.coindetail = action.payload;
      const item = action.payload;
      state.formated = action.payload;
      state.formated = {
        ...item,
        circulating_supply: formatNumber(item.market_data.circulating_supply),
        price: formatNumber(item.market_data.current_price.usd),
        max_supply: formatNumber(item.market_data.max_supply),
        total_supply: formatNumber(item.market_data.total_supply),
        market_cap: formatNumber(item.market_data.market_cap.usd),
        fully_diluted_valuation: formatNumber(
          item.market_data.fully_diluted_valuation.usd
        ),
        total_volume: formatNumber(item.market_data.total_volume.usd),
        high_24h: formatNumber(item.market_data.high_24h.usd),
        low_24h: formatNumber(item.market_data.low_24h.usd),
        ath: formatNumber(item.market_data.ath.usd),
        atl: item.market_data.atl.usd,
        price_change_percentage_1h_in_currency: calculatePercentage(
          item.market_data.price_change_percentage_1h_in_currency.usd
        ).toFixed(2),
        coin_category: coinCategory(item.categories),
        website: item.links.homepage ? item.links.homepage[0] : "",
        explorer: webFormat(item.links.blockchain_site),
      };
      state.img = action.payload.image.large;
    },
    [coinDetail.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const { setIsMobile } = detailSlice.actions;
export default detailSlice.reducer;
