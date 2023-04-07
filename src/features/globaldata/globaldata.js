import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGlobalMetrics = createAsyncThunk(
  "globalMetrics/fetchGlobalMetrics",
  async () => {
    const response = await axios.get(
      `https://crypto-api-utnm.onrender.com/api/v1/global_data`
    );
    return response.data;
  }
);

const globalMetricsSlice = createSlice({
  name: "globalMetrics",
  initialState: {
    data: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalMetrics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGlobalMetrics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchGlobalMetrics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default globalMetricsSlice.reducer;
