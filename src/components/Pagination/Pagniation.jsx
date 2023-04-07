import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  changeCurrPage,
  clearPageItems,
} from "../../features/newlisted/newlisted";
import "./style.scss";
import "../../styles/theme/_theme.scss";

function Pagniation() {
  const { totalPost, postPerPage, currentPage } = useSelector(
    (state) => state.newlisted
  );
  const dispatch = useDispatch();
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pages.push(i);
  }

  const setCurrentPage = (page) => {
    dispatch(changeCurrPage(page));
    dispatch(clearPageItems());
  };

  const changePage = (event) => {
    const id = event.currentTarget.getAttribute("data-id");
    if (id === "prev" && currentPage > 1) {
      const prev = currentPage - 1;
      dispatch(changeCurrPage(prev));
      dispatch(clearPageItems());
    } else if (id === "next") {
      const next = currentPage + 1;
      dispatch(changeCurrPage(next));
      dispatch(clearPageItems());
    }
    if (currentPage === 5) {
      dispatch(changeCurrPage(1));
      dispatch(clearPageItems());
    }
  };

  return (
    <div>
      <button data-id="prev" onClick={changePage} className="border bg p">
        &#60;
      </button>
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={`border ${currentPage === index + 1 ? "hover" : "bg"} p`}
          >
            {page}
          </button>
        );
      })}
      <button data-id="next" onClick={changePage} className="border bg p">
        &#62;
      </button>
      <button className="border bg p">
        <Link to="https://www.coingecko.com/" className="link">
          More...
        </Link>
      </button>
    </div>
  );
}

export default Pagniation;
