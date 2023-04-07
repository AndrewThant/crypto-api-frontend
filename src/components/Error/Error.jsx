import React from "react";
import { Link, useParams } from "react-router-dom";
import "./style.scss";
import ErrorIcon from "@mui/icons-material/Error";

const Error = () => {
  const { id } = useParams();

  const handleTryAgain = () => {
    window.location.reload();
  };

  return (
    <div className="error--page">
      <div className="error--container">
        <article>
          <ErrorIcon style={{ color: "red" }} />
          <h4 className="error--text">Something Went Wrong.Please Try Again</h4>
        </article>
        <div className="btn--group">
          <button className="btn" onClick={handleTryAgain}>
            <Link to="/" style={{ fontSize: "14px" }}>
              Home
            </Link>
          </button>
          <button className="btn" onClick={handleTryAgain}>
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
