import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../pages/Header";
import Footer from "../pages/Footer";
const Layout = () => {
  return (
    <>
      <Header />
      <div className="main-content">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default Layout;
