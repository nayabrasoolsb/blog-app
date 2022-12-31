import "../../assets/styles/create-blog.css";

import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const [img, setImg] = useState("");
  function changeHandler(e) {
    setBlog((prevBlog) => ({ ...prevBlog, [e.target.name]: e.target.value }));
  }
  function preViewFiles(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImg(reader.result);
    };
  }
  function imageHandler(e) {
    let file = e.target.files[0];
    preViewFiles(file);
  }
  function submitHandler(e) {
    e.preventDefault();
    fetch("http://localhost:3004/api/v1/blogs/upload", {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: blog.title,
        description: blog.description,
        imageUrl: img,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.status === "success"){
          navigate("/user")
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="create">
      
      <div className="content">
        <h2>CreateBlog</h2>
        <form onSubmit={(e) => submitHandler(e)}>
          <div>
            <input
              value={blog.title}
              name="title"
              type="text"
              placeholder="title"
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <div>
            <input
              onChange={(e) => imageHandler(e)}
              type="file"
              name="img"
              placeholder="pick Image"
            />
          </div>
          <div>
            <textarea
              value={blog.description}
              name="description"
              type="text"
              placeholder="description"
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <div>
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
