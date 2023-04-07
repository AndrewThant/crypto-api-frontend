import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import debounce from "../../helpers/debounce";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchCoin, resetSearch } from "../../features/trending/trending";
import { searchToggle, clearSearch } from "../../features/searchtoggle/search";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import icon from "../../images/logo.png";
import { Avatar } from "@mui/material";
import "../../styles/theme/_theme.scss";
import LightModeIcon from "@mui/icons-material/LightMode";
import { setMode } from "../../features/mode/mode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import iconBlack from "../../images/logoblack.png";

function Navbar() {
  const { isLoading, searchItem } = useSelector((state) => state.trending);
  const { mode } = useSelector((state) => state.mode);
  const { isOpen } = useSelector((state) => state.modam);
  const dispatch = useDispatch();

  const updateBodyBackgroundColor = () => {
    document.documentElement.style.setProperty(
      "--bg-color",
      mode === "light" ? "#f5f5f5" : "#121212"
    );
  };

  updateBodyBackgroundColor();

  useEffect(() => {
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  function handleClick(event) {
    if (
      event.target.closest(".input-box") ||
      event.target.closest(".search-container")
    ) {
      return;
    }
    dispatch(clearSearch());
  }

  const debouncedSearchCoin = debounce((query) => {
    dispatch(searchCoin(query, isLoading));
  }, 500);

  const handleSearch = (event) => {
    let query = event.target.value;
    debouncedSearchCoin(query);
  };

  if (isLoading) {
    document.querySelector("input").value = "";
  }

  const searchToggler = () => {
    dispatch(clearSearch());
    dispatch(resetSearch());
  };

  function toggleMode(mode) {
    dispatch(setMode(mode));
  }

  const searchItems = searchItem.map((item) => {
    return (
      <div
        key={item.id}
        className={`searchitem ${mode === "light" ? "light" : "dark"}`}
      >
        <Link to={`/${item.id}`} onClick={searchToggler}>
          <div className="search-list-items border-bottom">
            <img src={item.image} alt={item.id} />
            <div className="span-container">
              <h3 className="search-list-items-name mini-header">
                {item.name}
              </h3>
              <h3 className="search-list-items-rank p">#{item.rank}</h3>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <div className={`${mode === "light" ? "light" : "dark"}`}>
      <header className={`navbar bg border-bottom`}>
        <h1 className="logo">
          <Link to="/">
            {mode === "dark" && (
              <Avatar
                src={icon}
                size="large"
                sx={{
                  marginRight: 1,
                }}
              />
            )}
            {mode === "light" && (
              <Avatar
                src={iconBlack}
                size="large"
                sx={{
                  marginRight: 1,
                }}
              />
            )}
            <span className="header">Crypto Daily</span>{" "}
          </Link>
        </h1>

        <div className="left--container">
          <div className="mode--container">
            {mode === "dark" && (
              <LightModeIcon
                style={{ color: "white", width: "25px" }}
                onClick={() => toggleMode("light")}
              />
            )}
            {mode === "light" && (
              <DarkModeIcon
                style={{ color: "black", width: "25px" }}
                onClick={() => toggleMode("dark")}
              />
            )}
          </div>
          <div className="input-box" onClick={() => dispatch(searchToggle())}>
            <SearchIcon id="search" className="header" />

            <input
              id="normal-input"
              type="text"
              onChange={handleSearch}
              onClick={() => dispatch(searchToggle())}
              placeholder="Search"
            />
          </div>
        </div>

        {isOpen && (
          <div className="search-container bg search--container--shadow border">
            <div className="input-box-modal ">
              <SearchIcon id="searchModal" className="header" />
              <input
                id="modal--input"
                className="p"
                type="text"
                onChange={handleSearch}
                onClick={() => dispatch(searchToggle())}
                placeholder="Search"
              />
              <CloseIcon
                id="close--icon"
                className="p"
                onClick={() => dispatch(clearSearch())}
              />
            </div>
            <div>{searchItems}</div>
          </div>
        )}
      </header>
    </div>
  );
}

export default Navbar;
