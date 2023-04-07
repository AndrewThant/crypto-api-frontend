import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  getTrendingCoins,
  getBitcoinPrice,
} from "../../features/trending/trending";
import { useEffect } from "react";
import TrendingCoins from "../../components/TrendingCoins/TrendingCoins";
import MarketData from "../../components/MarketData/MarketData";
import { fetchGlobalMetrics } from "../../features/globaldata/globaldata";
import { fetchNewListed } from "../../features/newlisted/newlisted";
import TopCoins from "../../components/TopCoins/TopCoins";
import Loading from "../../components/Loading/Loading";
import Pagniation from "../../components/Pagination/Pagniation";
import { fetchTrendingNews } from "../../features/news/news";
import TrendingNews from "../../components/TendingNews/TrendingNews";
import "../../styles/theme/_theme.scss";


const Home = () => {
  const { coins, isLoading } = useSelector((state) => state.trending);
  const { data, status } = useSelector((state) => state.globalMetrics);
  const { coinlist, pagnitation } = useSelector((state) => state.newlisted);
  const { news } = useSelector((state) => state.news);
  const { isMobile } = useSelector((state) => state.detailpage);
  const { mode, click } = useSelector((state) => state.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBitcoinPrice());
    dispatch(getTrendingCoins());
    dispatch(fetchGlobalMetrics());
    dispatch(fetchNewListed());
    dispatch(fetchTrendingNews());
  }, [dispatch]);

  // if (isLoading) {
  //   return <Loading />;
  // }

  const trendingCoins = coins.map((item) => (
    <TrendingCoins key={item.id} coin={item} />
  ));
  const topCoins = pagnitation.map((item) => (
    <TopCoins key={item.id} coin={item} />
  ));
  const trendingNews = news.map((item, index) => (
    <TrendingNews key={index} news={item} />
  ));

  return (
    <div>
      <main className={`homepage-coins ${mode === "light" ? "light" : "dark"}`}>
        <div className="landing--container">
          {isMobile && (
            <h1 className="header--mobile header border-bottom">
              Trending News
            </h1>
          )}
          <div className="news--container">
            {!isMobile && <h1 className="header">Trending News</h1>}
            <div>{trendingNews}</div>
          </div>
          <div className="sts--container">
            <div className="hp-coins">
              <h4 className="header">Market Status For Today</h4>
              {status === "succeeded" && (
                <MarketData
                  btc_dominance={data.btc_dominance.toFixed(3)}
                  total_market_cap={data.quote.USD.total_market_cap}
                  total_volume_24h={data.quote.USD.total_volume_24h}
                  defi_market_cap={data.defi_market_cap}
                  stablecoin_market_cap={data.stablecoin_market_cap}
                />
              )}
            </div>
            <div className="hp-coins">
              <h1 className="header">Trending Coins</h1>
              {trendingCoins}
            </div>
          </div>
        </div>

        <div className="coin--list">
          <h1 className="header border-bottom">Top MarketCap Coins</h1>
          <div className="header--container border-bottom mini--header--bg">
            <div className="rank--container">
              <span className="list--header mini-header">#</span>
            </div>
            <div className="coin-box--name">
              <span className="list--header mini-header">Coin</span>
            </div>
            <div className="coin-box">
              <span className="list--header mini-header">Price</span>
            </div>
            {!isMobile && (
              <div className="coin-box">
                <span className="list--header mini-header">Mkt cap</span>
              </div>
            )}
            {!isMobile && (
              <div className="coin-box--price">
                <span className="list--header mini-header">24h Vol</span>
              </div>
            )}

            <div className="coin-box--percentage">
              <span className="list--header mini-header">Price%</span>
            </div>

            {!isMobile && (
              <div className="coin-box--percentage">
                <span className="list--header mini-header">Mkcap%</span>
              </div>
            )}
          </div>
          {topCoins}
        </div>
        <div className="page--btn--container">
          <Pagniation />
        </div>
      </main>
    </div>
  );
};

export default Home;
