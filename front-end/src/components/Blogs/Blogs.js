import "../../assets/styles/blogs.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";

import RenderBlog from "../RenderBlog/RenderBlog";

export default function Blogs() {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }
  }, []);

  const params = useParams();
  const [refresh, setRefresh] = useState(false);
  let { pageNum } = params;
  pageNum = pageNum && pageNum > 1 ? pageNum : 1;
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      await fetch(
        `https://blogapp-by-nayabrasool.onrender.com/api/v1/blogs/fetch/${
          pageNum ? pageNum : 1
        }`,
        {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          setBlogs(data.blogs);
        })
        .catch((err) => console.log(err));
      setLoading(false);
    };
    fetchBlogs();
  }, [pageNum, refresh]);
  const change =  useCallback(() =>{
    setRefresh(!refresh);
  },[refresh])
  if(loading){
    return <div className="loading">
      <div>
        <img src="/loading-img.jpg" alt="loading img" />
        <h3 className="text">Loading data, please wait...</h3>
      </div>
    </div>
  }
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
              <RenderBlog change={change} key={index} blog={blog} />
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
            <Link
              className="box"
              to={`/user/blogs/${pageNum ? parseInt(pageNum) + 1 : 1}`}>
              next{`>`}
            </Link>
            {/* </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
