import React from "react";
import { Outlet } from "react-router-dom";
import CustomLink from "./CustomLink";
import NavBar from "./Navbar/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
        <ToastContainer />
      </main>
    </>
  );
};

export default Layout;
