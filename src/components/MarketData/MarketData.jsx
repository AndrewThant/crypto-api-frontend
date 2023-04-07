import React from "react";
import "./style.scss";
import "../../styles/theme/_theme.scss";

function MarketData({
  btc_dominance,
  total_market_cap,
  total_volume_24h,
  defi_market_cap,
  stablecoin_market_cap,
}) {
  let price = String(total_market_cap);
  let vol = String(total_volume_24h);
  price = price.split(".").join("");
  vol = vol.split(".").join("");

  function formatNumbers(num) {
    let formated = "";
    let str = String(num);
    for (let i = str.length - 1, j = 0; i >= 0; i--, j++) {
      if (j > 0 && j % 3 === 0) {
        formated = "," + formated;
      }
      formated = str[i] + formated;
    }
    return formated;
  }

  return (
    <div className="market--data-container">
      <div className="box border-bottom bg">
        <h1 className="p">Market Capitalization</h1>
        <span className="mini-header">${formatNumbers(price)}</span>
      </div>
      <div className="box border-bottom bg">
        <h1 className="p">24h Trading Volume</h1>
        <span className="mini-header">${formatNumbers(vol)}</span>
      </div>
      <div className="box border-bottom bg">
        <h1 className="p">Bitcoin Market Cap Dominance</h1>
        <span className="mini-header">{btc_dominance}%</span>
      </div>
      <div className="box border-bottom bg">
        <div className="span-container">
          <h1 className="p">Defi Market Cap</h1>
          <span className="mini-header">${defi_market_cap} </span>
        </div>
        <div className="span-container">
          <h1 className="p">Stablecoin Market Cap</h1>
          <span className="mini-header">${stablecoin_market_cap}</span>
        </div>
      </div>
    </div>
  );
}

export default MarketData;
