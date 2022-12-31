import "../../assets/styles/blog-details.css";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function BlogDetails() {
  const params = useParams();
  const { id } = params;
  const [blog, setBlog] = useState({
    imageUrl: "",
    title: "",
    description: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }
  }, []);
  useEffect(() => {
    fetch(`https://blogapp-by-nayabrasool.onrender.com/api/v1/blogs/fetch/blog/${id}`, {
      method: "GET",
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setBlog(data.blogs[0]));
  }, []);
  return (
    <div className="details-main">
      <div className="options">
        <div onClick={()=> navigate(-1)} className="back">←</div>
        <div className="back">...</div>
      </div>
      <div className="data">
        <div className="blog-title">
          <div>
            <h2>{blog.title}</h2>
          </div>
        </div>
        <div>
          <img src={`${blog.imageUrl.imageUrl}`} alt="blog img" />
        </div>
        <div className="desc">{blog.description} </div>
      </div>
    </div>
  );
}
