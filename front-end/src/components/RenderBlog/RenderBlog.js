import "../../assets/styles/render-blog.css";

import { Link } from "react-router-dom";
import React from "react";

export default function RenderBlogs({ blog }) {
  let s = new Date(blog.createdAt).toLocaleString(undefined, {
    timeZone: "Asia/Kolkata",
  });
  const date = s.split(", ")[0];
  const time = s.split(", ")[1].split(" ")[0];
  const meredian = s.split(", ")[1].split(" ")[1].toUpperCase();
  return (
    <div className="blog-main">
      <div>
        <img src={blog.imageUrl.imageUrl} alt="blog-img" />
      </div>
      <div>
        <div className="blog-title">
          <Link to={`/user/blog/${blog._id}`}><h3>{blog.title}</h3></Link>
          
          <div className="userName">
            by <span>{localStorage.getItem("userName")}</span>  {date} {time} {meredian}
          </div>
        </div>
        <div>{blog.description} </div>
      </div>
    </div>
  );
}
