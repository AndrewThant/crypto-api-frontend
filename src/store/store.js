import { configureStore } from "@reduxjs/toolkit";
import trendingCoinsReducer from "../features/trending/trending";
import detailPageReducer from "../features/detail/detail";
import globalMetricsReducer from "../features/globaldata/globaldata";
import newListedReducer from "../features/newlisted/newlisted";
import modamReducer from "../features/searchtoggle/search";
import newsReducer from "../features/news/news";
import modeReducer from "../features/mode/mode";

const store = configureStore({
  reducer: {
    trending: trendingCoinsReducer,
    detailpage: detailPageReducer,
    globalMetrics: globalMetricsReducer,
    newlisted: newListedReducer,
    modam: modamReducer,
    news: newsReducer,
    mode: modeReducer,
  },
});

export default store;
