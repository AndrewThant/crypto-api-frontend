import React from "react";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { setIsMobile } from "../../features/detail/detail";
import { useEffect } from "react";
import "../../styles/theme/_theme.scss";

function TopCoins({ coin }) {
  const { isMobile } = useSelector((state) => state.detailpage);
  const dispatch = useDispatch();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    const handleMediaQueryChange = (e) => {
      dispatch(setIsMobile(e.matches));
    };
    handleMediaQueryChange(mediaQuery);
    mediaQuery.addListener(handleMediaQueryChange);
  }, [dispatch]);

  return (
    <div className="coin-list--container">
      <a href={`/${coin.id}`} className="border-bottom">
        <div className="rank--container p">
          <span>#{coin.market_cap_rank}</span>
        </div>
        <div className="coin-box--name mini-header">
          <img className="coin-image" src={coin.image} alt={coin.name} />
          <div className="coin-name">
            <span>{coin.name}</span>
          </div>
        </div>
        <div className="coin-box p">
          <span>${coin.price}</span>
        </div>
        {!isMobile && (
          <div className="coin-box p">
            <span>${coin.market_cap}</span>
          </div>
        )}
        {!isMobile && (
          <div className="coin-box--price p">
            <span>${coin.total_volume}</span>
          </div>
        )}

        <div
          className="coin-box--percentage p"
          style={{
            color: coin.price_change_percentage_24h > 0 ? "green" : "#DC3545",
          }}
        >
          <span>{coin.price_change_percentage_24h}%</span>
        </div>

        {!isMobile && (
          <div
            className="coin-box--percentage p"
            style={{
              color:
                coin.market_cap_change_percentage_24h > 0 ? "green" : "#DC3545",
            }}
          >
            <span>{coin.market_cap_change_percentage_24h}%</span>
          </div>
        )}
      </a>
    </div>
  );
}

export default TopCoins;
