import "../../assets/styles/sign-in.css";

import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function SignIn() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  async function submitHandler(e) {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      alert("fields cannot empty");
      return;
    }
    if (err.email || err.password) {
      alert("please check the error");
      return;
    }
    setLoading(true);
    await fetch(
      "https://blogapp-by-nayabrasool.onrender.com/api/v1/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "Failed") {
          alert("Invalid Credential please check password/email");
        } else if (data.status === "Success") {
          alert(data.message);
          localStorage.setItem("token", data.token);
          localStorage.setItem("userName", data.userName);
          navigate("/user/blogs");
        }
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }
  return (
    <div className="main-sign-in">
      <form action="#" method="POST" onSubmit={(e) => submitHandler(e)}>
        <div className="content">
          <div className="label">
            <h2>LOGIN</h2>
            <div>
              <label htmlFor="email">Email</label>
            </div>
            <div className="error">
              <input
                onChange={(e) => {
                  setUserData((prevData) => ({
                    ...prevData,
                    email: e.target.value,
                  }));
                  if (!e.target.value.includes("@")) {
                    setErr((prevErr) => ({
                      ...prevErr,
                      email: "email should include @",
                    }));
                  } else {
                    setErr((prevErr) => ({
                      ...prevErr,
                      email: "",
                    }));
                  }
                }}
                className={err.email && "border-err"}
                value={userData.email}
                id="email"
                type="text"
                name="email"
                placeholder="Email"
              />
              {err.email && <div className="err"> {err.email}</div>}
            </div>
          </div>
          <div className="error pass">
            <div className="label">
              <label htmlFor="password">Password</label>
            </div>
            <div>
              <input
                style={{ width: "85%" }}
                onChange={(e) => {
                  setUserData((prevData) => ({
                    ...prevData,
                    password: e.target.value,
                  }));
                  if (e.target.value.length < 6) {
                    setErr((prevErr) => ({
                      ...prevErr,
                      password: "password should be atlease 6 characters",
                    }));
                  } else {
                    setErr((prevErr) => ({
                      ...prevErr,
                      password: "",
                    }));
                  }
                }}
                className={err.password && "border-err"}
                value={userData.password}
                id="password"
                type={!showPass ? "password" : "text"}
                name="password"
                placeholder="Password"
              />
              <span>
                <img
                  onClick={() => setShowPass(!showPass)}
                  src="/padlock.png"
                  alt="lock img"
                />
              </span>
              {err.password && <div className="err"> {err.password}</div>}
            </div>
          </div>
          <div style={{ marginBottom: "5px" }}>
            <button type="submit">
              {loading && (
                <div className="loading-login">
                  <div>
                    <img src="/loading-img.jpg" alt="loading img" />
                  </div>
                </div>
              )}
              Log In
            </button>
          </div>
          <div className="forgot-pass">Forgot Password?</div>
          <div className="sign-up">
            Need An Account? <Link to="/register">Sign up</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
