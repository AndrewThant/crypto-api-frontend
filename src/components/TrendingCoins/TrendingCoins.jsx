import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import "../../styles/theme/_theme.scss";

function TrendingCoins({ coin }) {
  return (
    <div className="trending-list">
      <Link to={`/${coin.id}`} className="card--shadow">
        <span className="trending-list-img">
          <img src={coin.image} alt="" />
        </span>
        <div className="trending-list-name mini-header">{coin.name}</div>
        <div className="trending-list-prices">
          <span className="crypto-ptice-btc p">{coin.priceBtc} BTC</span>
          <span className="crypto-ptice-usd link">{coin.priceUsd} USD</span>
        </div>
      </Link>
    </div>
  );
}

export default TrendingCoins;
