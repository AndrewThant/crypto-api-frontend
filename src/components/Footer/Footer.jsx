import React from "react";
import "../../styles/theme/_theme.scss";
import "./style.scss";
import { useSelector } from "react-redux";

const Footer = () => {
  const { mode } = useSelector((state) => state.mode);
  return (
    <footer className={`${mode === "light" ? "light" : "dark"}`}>
      <article className="bg border-top">
        <div className="credit--container p ">
          <p id="powerby">Powerd By: CoinGecko, Rapid API, Coinmarketcap</p>
          <p className="disclaimer p" id="disclaimer--box">
            <span className="mini-header">DISCLAIMER</span> : This site displays
            cryptocurrency data obtained from third-party sources, and none of
            the content should be construed as providing financial advice. It is
            important to "Do Your Own Due Diligence" (DYOD) and "Do Your Own
            Research" (DYOR) before making any investment decisions. This
            website was created for entertainment purposes, drawing inspiration
            from popular crypto pages such as Coingecko. I hope you enjoy
            exploring the fascinating world of cryptocurrencies on this site!
          </p>
        </div>
        <div className="copyright--container">
          <p className="coyright p">
            CopyRight &copy; 2023 all rights reserved
          </p>
        </div>
      </article>
    </footer>
  );
};

export default Footer;
