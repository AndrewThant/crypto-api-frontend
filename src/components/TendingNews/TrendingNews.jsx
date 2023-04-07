import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import moment from "moment";
import "../../styles/theme/_theme.scss";

function TrendingNews({ news }) {
  const img = news?.image?.thumbnail?.contentUrl;

  return (
    <Link to={news?.url} id="new--link">
      <div className="new--container card--shadow">
        <div className="news--name--container">
          <h6 className="header">{news?.name}</h6>
        </div>
        <div className="content--container">
          <img src={img} alt={"news"} />
          <p className="p">
            {news?.description.length > 200
              ? `${news?.description.substring(0, 200)}...`
              : news?.description}
          </p>
        </div>
        <div className="provider--container">
          <div>
            <img
              src={news?.provider[0]?.image?.thumbnail?.contentUrl}
              alt="provider"
            />
            <span className="provider--name text-muted">
              {news?.provider[0]?.name}
            </span>
          </div>
          <p className="text-muted">
            {moment(news?.datePublished).startOf("ss").fromNow()}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default TrendingNews;
