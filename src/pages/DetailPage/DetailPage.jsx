import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  searchDetail,
  coinDetail,
  setIsMobile,
} from "../../features/detail/detail";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./style.scss";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

//wait for data and if there's no data return undefined
function getNestedProperty(obj, keys) {
  if (!Array.isArray(keys)) {
    keys = [keys];
  }
  return keys.reduce((acc, key) => {
    return acc ? acc[key] : undefined;
  }, obj);
}

const DetailPage = () => {
  // importing value from detailpage state
  const { isLoading, pricegraph, vol, mcap, isError, isMobile, formated } =
    useSelector((state) => state.detailpage);
  const dispatch = useDispatch();
  const { mode, click } = useSelector((state) => state.mode);

  // getting id from url
  const { id } = useParams();
  const time = 7;

  // getting detail info from api with id from params and time
  useEffect(() => {
    dispatch(searchDetail({ id: id, time: time }));
    dispatch(coinDetail({ id: id }));
  }, [dispatch]);

  // checking media query value to set the stage whether it is mobile view or not
  useEffect(() => {
    // Create a new media query that matches the given condition
    const mediaQuery = window.matchMedia("(max-width: 1000px)");

    // Define a callback function that gets called when the media query matches
    const handleMediaQueryChange = (e) => {
      // Dispatch an action to update the state with the new value of the media query
      dispatch(setIsMobile(e.matches));
    };

    // Call the callback function once with the current value of the media query
    handleMediaQueryChange(mediaQuery);

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addListener(handleMediaQueryChange);

    // Return a function that removes the callback function as a listener when the component unmounts
    // return () => mediaQuery.removeListener(handleMediaQueryChange);
  }, [dispatch]);

  // assigning value from api used with getNestedProperty inorder to assign only when there is data
  const price = getNestedProperty(formated, ["price"]);
  const coinName = getNestedProperty(formated, ["name"]);
  const coinSymbol = getNestedProperty(formated, ["symbol"]);
  const low24 = getNestedProperty(formated, ["low_24h"]);
  const high24 = getNestedProperty(formated, ["high_24h"]);
  const ath = getNestedProperty(formated, ["ath"]);
  const atl = getNestedProperty(formated, ["atl"]);
  const marketcap = getNestedProperty(formated, ["market_cap"]);
  const coingeckoRank = getNestedProperty(formated, ["coingecko_rank"]);
  const marketcapRank = getNestedProperty(formated, ["market_cap_rank"]);
  const circulatingSupply = getNestedProperty(formated, ["circulating_supply"]);
  const totalVolume = getNestedProperty(formated, ["total_volume"]);
  const fullyDiluted = getNestedProperty(formated, ["fully_diluted_valuation"]);
  const totalSupply = getNestedProperty(formated, ["total_supply"]);
  const maxSupply = getNestedProperty(formated, ["max_supply"]);
  const percentageChange = getNestedProperty(formated, [
    "price_change_percentage_1h_in_currency",
  ]);
  const fb = getNestedProperty(formated, ["links", "facebook_username"]);
  const twitter = getNestedProperty(formated, ["links", "twitter_screen_name"]);
  const redit = getNestedProperty(formated, ["links", "subreddit_url"]);
  const github = getNestedProperty(formated, ["links", "repos_url", "github"]);
  const description = getNestedProperty(formated, ["description", "en"]);
  const coin_category = getNestedProperty(formated, ["coin_category"]);
  const communityScore = getNestedProperty(formated, ["community_score"]);
  const website = getNestedProperty(formated, ["website"]);
  const explorer = getNestedProperty(formated, ["explorer"]);
  const image = getNestedProperty(formated, ["image", "large"]);
  const icon =
    percentageChange && percentageChange > 0 ? (
      <NorthIcon style={{ fontSize: "15px" }} />
    ) : (
      <SouthIcon style={{ fontSize: "15px" }} />
    );

  // if (isLoading || !formated) {
  //   return <Loading />;
  // }

  if (!isLoading && isError) {
    return <Error />;
  }

  return (
    <>
      {!isMobile && (
        <div
          className={`detail-container ${mode === "light" ? "light" : "dark"}`}
          style={{ display: formated?.id === id && !isLoading ? "" : "none" }}
        >
          <h1
            style={{
              fontWeight: 500,
              fontSize: "1.3rem",
              margin: "50px 0 20px 80px",
            }}
            className="header"
          >
            {coinName} Price Data (7-days)
          </h1>

          <main className="main--container">
            <AreaChart
              id="graph"
              width={800}
              height={400}
              data={pricegraph}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="Price"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>

            <div className="links-container border-left">
              <h1 className="header">Info</h1>

              <div className="item--container">
                <div className="box">
                  <h6 className="mini-header">Website :</h6>
                  <div>
                    {website && (
                      <Link
                        to={website}
                        className="mini-header mini--header--bg"
                      >
                        {website
                          .replace(/^https?:\/\/(www\.)?/, "")
                          .replace(/\/$/, "")}
                      </Link>
                    )}
                  </div>
                </div>
                <div className="box">
                  <h6 className="mini-header">Explorer :</h6>
                  <div id="link--container">
                    {explorer &&
                      explorer.map((item) => (
                        <Link
                          key={item}
                          to={item}
                          className="mini-header mini--header--bg"
                        >
                          {item
                            .replace(/^https?:\/\/(www\.)?/, "")
                            .replace(/\/$/, "")}
                        </Link>
                      ))}
                  </div>
                </div>
                <div className="box">
                  <h6 className="mini-header">Community :</h6>
                  <div className="link--gp">
                    <Link to={fb} className="mini-header mini--header--bg">
                      <span>Facebook</span>
                      <FacebookIcon className="icons" />
                    </Link>
                    <Link to={twitter} className="mini-header mini--header--bg">
                      <span>Twitter</span>
                      <TwitterIcon className="icons" />
                    </Link>
                    <Link to={redit} className="mini-header mini--header--bg">
                      <span>Reddit</span>
                    </Link>
                  </div>
                </div>
                <div className="box">
                  <h6 className="mini-header">Source Code :</h6>
                  <div className="link--gp">
                    <Link to={github} className="mini-header mini--header--bg">
                      <span>Github</span>
                      <GitHubIcon className="icons" />
                    </Link>
                  </div>
                </div>
                {coin_category && (
                  <div className="box">
                    <h6 className="mini-header">Category :</h6>
                    <div className="category-container">
                      <span className="mini-header mini--header--bg">
                        {coin_category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
          <div className="stats-container">
            <div>
              <div className="rank-container">
                <div className="rank rank--container--bg">
                  Rank #{coingeckoRank}
                </div>
                <div className="rank rank--container--bg">
                  Market Cap Rank #{marketcapRank}
                </div>
              </div>

              <div className="name-container">
                {image && (
                  <img id="coin-img" src={image} alt={coinSymbol}></img>
                )}
                <h1 className="name header">
                  {coinName}{" "}
                  <span className="mini-header">
                    {coinSymbol && coinSymbol.toUpperCase()}
                  </span>
                </h1>
              </div>
            </div>
            <div className="price-container">
              <div className="price">
                <h1 className="header">${price}</h1>
                <h4>
                  <span className="low mini-header">Low: ${low24}</span>
                  <span className="high mini-header">High: ${high24}</span>
                </h4>
              </div>
              <div className="percentage">
                <span
                  style={{
                    color:
                      percentageChange && percentageChange > 0
                        ? "#8dc647"
                        : "#dc3545",
                  }}
                >
                  {percentageChange}%{icon}
                </span>
              </div>
            </div>
          </div>

          <div className="market-data-container">
            <div className="data-container border-bottom">
              <h4 className="mini-header">Market Cap</h4>
              <span className="p">${marketcap}</span>
            </div>
            <div className="data-container border-bottom">
              <h4 className="mini-header">Circulating Supply</h4>
              <span className="p">{circulatingSupply}</span>
            </div>
            <div className="data-container border-bottom">
              <h4 className="mini-header">24 Hours Trading Volume</h4>
              <span className="p">${totalVolume}</span>
            </div>
            <div className="data-container border-bottom">
              <h4 className="mini-header">Fully Diluted Valuation</h4>
              <span className="p">${fullyDiluted}</span>
            </div>
            <div className="data-container border-bottom">
              <h4 className="mini-header">Total Supply</h4>
              <span className="p">{totalSupply}</span>
            </div>
            <div className="data-container border-bottom">
              <h4 className="mini-header">Max Supply</h4>
              <span className="p">{maxSupply}</span>
            </div>
          </div>

          <div className="marketstats border-bottom">
            <h1 className="header ">Market Analysis For {coinName}</h1>

            <div className="bar-container">
              <div className="barchart">
                <BarChart
                  width={500}
                  height={300}
                  data={mcap}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Marketcap" fill="#8884d8" />
                </BarChart>
                <h1
                  className="p"
                  style={{
                    fontSize: "1rem",
                    fontWeight: 400,
                    textAlign: "center",
                  }}
                >
                  Market Cap
                </h1>
              </div>
              <div className="area--chart">
                <AreaChart
                  width={500}
                  height={300}
                  data={vol}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Date" />
                  <YAxis />
                  <Tooltip />
                  <defs>
                    <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                      <stop stopColor="green" stopOpacity={1} />
                      <stop stopColor="red" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="Volume"
                    stroke="#000"
                    fill="url(#splitColor)"
                  />
                </AreaChart>
                <h1
                  className="p"
                  style={{
                    fontSize: "1rem",
                    fontWeight: 400,
                    textAlign: "center",
                  }}
                >
                  Volume
                </h1>
              </div>
              <div className="marketstats-container card--shadow">
                <div className="stats-box border-bottom ">
                  <h4 className="tag mini-header">Current Price</h4>
                  <h1 className="stats p">${price}</h1>
                </div>
                <div className="stats-box border-bottom">
                  <h4 className="tag mini-header">24h high</h4>
                  <h1 className="stats p" style={{ color: "#8dc647" }}>
                    ${high24}
                  </h1>
                </div>
                <div className="stats-box border-bottom">
                  <h4 className="tag mini-header">24h low</h4>
                  <h1 className="stats p" style={{ color: "#dc3545" }}>
                    ${low24}
                  </h1>
                </div>
                <div className="stats-box border-bottom">
                  <h4 className="tag mini-header">All Time High</h4>
                  <h1 className="stats p" style={{ color: "#8dc647" }}>
                    ${ath}
                  </h1>
                </div>
                <div className="stats-box border-bottom">
                  <h4 className="tag mini-header">All Time Low</h4>
                  <h1 className="stats p" style={{ color: "#dc3545" }}>
                    ${atl}
                  </h1>
                </div>
                <div className="stats-box border-bottom">
                  <h4 className="tag mini-header">Market Cap Rank</h4>
                  <h1 className="stats p">#{marketcapRank}</h1>
                </div>
                <div className="stats-box border-bottom">
                  <h4 className="tag mini-header">Community Score</h4>
                  <h1 className="stats p">{communityScore}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="description-container">
            <h4 className="header">Description</h4>
            <p
              className="p"
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>
          </div>
        </div>
      )}

      {isMobile && (
        <div
          className={`detail-container ${mode === "light" ? "light" : "dark"}`}
          style={{ display: formated?.id === id && !isLoading ? "" : "none" }}
        >
          <h1
            id="price--data--header"
            style={{
              fontWeight: 500,
              fontSize: "1.3rem",
              margin: "50px 0 20px 80px",
            }}
            className="header"
          >
            {coinName} Price Data (7-days)
          </h1>

          <main className="main--container">
            <div className="mobile--container">
              <AreaChart
                id="graph"
                width={700}
                height={400}
                data={pricegraph}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Price"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </div>
          </main>
          <div className="stats-container">
            <div className="mobileview--rank--container">
              <div className="rank-container ">
                <div className="rank rank--container--bg">
                  Rank #{coingeckoRank}
                </div>
                <div className="rank rank--container--bg">
                  Market Cap Rank #{marketcapRank}
                </div>
              </div>

              <div className="name--price--container">
                <div className="name-container">
                  {image && (
                    <img id="coin-img" src={image} alt={coinSymbol}></img>
                  )}
                  <h1 className="name">
                    <p className="header">{coinName} </p>
                    <span className="mini-header">
                      {coinSymbol && coinSymbol.toUpperCase()}
                    </span>
                  </h1>
                </div>

                <div className="price-container">
                  <div className="price">
                    <h1 className="header">${price}</h1>
                    <h4>
                      <span className="low mini-header">Low: ${low24}</span>
                      <span className="high mini-header">High: ${high24}</span>
                    </h4>
                  </div>
                  <div className="percentage">
                    <span
                      style={{
                        color:
                          percentageChange && percentageChange > 0
                            ? "#8dc647"
                            : "#dc3545",
                      }}
                    >
                      {percentageChange}%{icon}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="market-data-container">
            <div className="data-container border-bottom">
              <h4 className="p">Market Cap</h4>
              <span className="mini-header">${marketcap}</span>
            </div>
            <div className="data-container border-bottom">
              <h4 className="p">Circulating Supply</h4>
              <span className="mini-header">{circulatingSupply}</span>
            </div>
            <div className="data-container border-bottom">
              <h4 className="p">24 Hours Trading Volume</h4>
              <span className="mini-header">${totalVolume}</span>
            </div>
            <div className="data-container border-bottom">
              <h4 className="p">Fully Diluted Valuation</h4>
              <span className="mini-header">${fullyDiluted}</span>
            </div>
            <div className="data-container border-bottom">
              <h4 className="p">Total Supply</h4>
              <span className="mini-header">{totalSupply}</span>
            </div>
            <div className="data-container border-bottom">
              <h4 className="p">Max Supply</h4>
              <span className="mini-header">{maxSupply}</span>
            </div>
          </div>

          <div className="links-container">
            <h1 className="header">Info</h1>

            <div className="item--container">
              <div className="box">
                <h6 className="mini-header">Website :</h6>
                <div>
                  {website && (
                    <Link className="mini-header mini--header--bg" to={website}>
                      {website
                        .replace(/^https?:\/\/(www\.)?/, "")
                        .replace(/\/$/, "")}
                    </Link>
                  )}
                </div>
              </div>
              <div className="box">
                <h6 className="mini-header">Explorer :</h6>
                <div id="link--container">
                  {explorer &&
                    explorer.map((item) => (
                      <Link
                        className="mini-header mini--header--bg"
                        key={item}
                        to={item}
                        style={{ margin: "5px" }}
                      >
                        {item
                          .replace(/^https?:\/\/(www\.)?/, "")
                          .replace(/\/$/, "")}
                      </Link>
                    ))}
                </div>
              </div>
              <div className="box">
                <h6 className="mini-header">Community :</h6>
                <div className="link--gp">
                  <Link className="mini-header mini--header--bg" to={fb}>
                    <span>Facebook</span>
                    <FacebookIcon className="icons" />
                  </Link>
                  <Link className="mini-header mini--header--bg" to={twitter}>
                    <span>Twitter</span>
                    <TwitterIcon className="icons" />
                  </Link>
                  <Link className="mini-header mini--header--bg" to={redit}>
                    <span>Reddit</span>
                  </Link>
                </div>
              </div>
              <div className="box">
                <h6 className="mini-header">Source Code :</h6>
                <div className="link--gp">
                  <Link className="mini-header mini--header--bg" to={github}>
                    <span>Github</span>
                    <GitHubIcon className="icons" />
                  </Link>
                </div>
              </div>
              {coin_category && (
                <div className="box">
                  <h6 className="mini-header">Category :</h6>
                  <div className="category-container mini-header mini--header--bg">
                    <span>{coin_category}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="marketstats border-bottom">
            <div className="bar-container">
              <h1 className="header">Market Analysis For {coinName}</h1>
              <div className="mobile--container">
                <BarChart
                  className="bar"
                  width={400}
                  height={300}
                  data={mcap}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Marketcap" fill="#8884d8" />
                </BarChart>
                <h1
                  className="p"
                  style={{
                    fontSize: "1rem",
                    fontWeight: 400,
                    textAlign: "center",
                  }}
                >
                  Market Cap
                </h1>
              </div>
              <div className="mobile--container">
                <AreaChart
                  width={400}
                  height={300}
                  data={vol}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Date" />
                  <YAxis />
                  <Tooltip />
                  <defs>
                    <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                      <stop stopColor="green" stopOpacity={1} />
                      <stop stopColor="red" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="Volume"
                    stroke="#000"
                    fill="url(#splitColor)"
                  />
                </AreaChart>
                <h1
                  className="p"
                  style={{
                    fontSize: "1rem",
                    fontWeight: 400,
                    textAlign: "center",
                  }}
                >
                  Volume
                </h1>
              </div>
            </div>

            <div className="marketstats-container card--shadow">
              <div className="stats-box border-bottom">
                <h4 className="tag mini-header">Current Price</h4>
                <h1 className="stats p">${price}</h1>
              </div>
              <div className="stats-box border-bottom">
                <h4 className="tag mini-header">24h high</h4>
                <h1 className="stats p" style={{ color: "#8dc647" }}>
                  ${high24}
                </h1>
              </div>
              <div className="stats-box border-bottom">
                <h4 className="tag mini-header">24h low</h4>
                <h1 className="stats p" style={{ color: "#dc3545" }}>
                  ${low24}
                </h1>
              </div>
              <div className="stats-box border-bottom">
                <h4 className="tag mini-header">All Time High</h4>
                <h1 className="stats p" style={{ color: "#8dc647" }}>
                  ${ath}
                </h1>
              </div>
              <div className="stats-box border-bottom">
                <h4 className="tag mini-header">All Time Low</h4>
                <h1 className="stats p" style={{ color: "#dc3545" }}>
                  ${atl}
                </h1>
              </div>
              <div className="stats-box border-bottom">
                <h4 className="tag mini-header">Market Cap Rank</h4>
                <h1 className="stats p">#{marketcapRank}</h1>
              </div>
              <div className="stats-box border-bottom">
                <h4 className="tag mini-header">Community Score</h4>
                <h1 className="stats p">{communityScore}</h1>
              </div>
            </div>
          </div>

          <div className="description-container">
            <h4 className="header">Description</h4>
            <p
              className="p"
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailPage;
