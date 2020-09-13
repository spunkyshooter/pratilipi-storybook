import React from "react";
import logo from "assets/logo.webp";
import { Link } from "react-router-dom";

const Navbar = ({ nameInAuth = null, onClickHandler }) => {
  return (
    <nav className="flex justify-between px-4 pt-4 lg:px-20 lg:pt-4 relative items-center">
      <Link to="/">
        <img src={logo} className="navbar-logo" alt="logo" />
      </Link>
      <div
        className="absCenterX text-3xl hidden md:block"
        style={{ color: "#A22823" }}
      >
        <Link to="/"> StoryBook </Link>
      </div>
      {nameInAuth && (
        <div className="cursor-pointer text-primary" onClick={onClickHandler}>
          {nameInAuth}
        </div>
      )}
      {!nameInAuth && (
        <Link to="/auth">
          {" "}
          <span className=" text-primary">Register/Login</span>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
