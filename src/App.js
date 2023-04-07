import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import DetailPage from "./pages/DetailPage/DetailPage";
import Navbar from "./components/Navbar/Navbar";
import { useSelector } from "react-redux";
import Footer from "./components/Footer/Footer";
import Loading from "./components/Loading/Loading";

const App = () => {
  const { isError, isLoading } = useSelector((state) => state.detailpage);

  const footer = !isError && !isLoading ? <Footer /> : "";

  return (
    <BrowserRouter>
      {!isError && <Navbar />}
      {isLoading && <Loading />}
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/:id" element={<DetailPage />}></Route>
      </Routes>
      {footer}
    </BrowserRouter>
  );
};

export default App;
