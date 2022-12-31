import "../../assets/styles/blogs.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import BlogDetails from "../RenderBlog/RenderBlog";

export default function Blogs() {
  const params = useParams();
  let { pageNum } = params;
  pageNum = pageNum && pageNum > 1 ? pageNum : 1;
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }
  }, []);
  useEffect(() => {
    fetch(`http://localhost:3004/api/v1/blogs/fetch/${pageNum ? pageNum : 1}`, {
      method: "GET",
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs);
      })
      .catch((err) => console.log(err));
  }, [pageNum]);
  return (
    <div className="blogs-main">
      {!blogs.length && pageNum === 1 ? (
        <div className="no-blogs">
          <div>
            <div>You have not created any blogs yet, want to create one?</div>
            <div className="create-one">
              <Link to="/user/create">Create</Link>
            </div>
          </div>
        </div>
      ) : !blogs.length && pageNum > 1 ? (
        <div className="the-end">
          <div>You are at the end of the page</div>
          <div className={`box`}>
            <Link to={`/user/blogs/${pageNum - 1}`}>{`<`}previous</Link>
          </div>
        </div>
      ) : (
        <div className="blogs">
          <div>
            {blogs.map((blog, index) => (
              <BlogDetails key={index} blog={blog} />
            ))}
          </div>
          <div className="pages">
            <Link
              to={`/user/blogs/${pageNum ? pageNum - 1 : 1}`}
              className={`box ${pageNum <= 1 ? "none" : ""}`}>
              {`<`}previous
            </Link>
            <div className="page-num">{pageNum ? pageNum : 1} </div>
            {/* <div className="box"> */}
              <Link className="box" to={`/user/blogs/${pageNum ? parseInt(pageNum) + 1 : 1}`}>
                next{`>`}
              </Link>
            {/* </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
