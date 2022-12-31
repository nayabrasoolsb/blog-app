import "../../assets/styles/header.css";

import { Link, Outlet } from "react-router-dom";

import React from "react";

export default function Header() {
  return (
    <>
      <div className="header">
        <div>Blog App</div>
        <div>Home</div>
        <div>About</div>
        <div>Careers</div>
        
        <div>
          <Link to="sign-in">Sign In</Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}
