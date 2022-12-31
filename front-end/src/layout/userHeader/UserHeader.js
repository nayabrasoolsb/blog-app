import "../../assets/styles/user-header.css";

import { Link, Outlet, useNavigate } from "react-router-dom";

import React from "react";

export default function UserHeader() {
  const navigate = useNavigate();
  return (
    <>
      <div className="header1">
        <div>Blog App</div>
        <div className="home">
          <Link to="blogs/1">Home</Link>
        </div>
        <div className="create1">
          <Link to="create">Create</Link>
        </div>
        <div className="user-name">
          Hi<span> {localStorage.getItem("userName")}</span>
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}>
          Log Out
        </div>
      </div>
      <Outlet />
    </>
  );
}
