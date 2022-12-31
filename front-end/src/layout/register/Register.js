import "../../assets/styles/register.css";

import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConPass] = useState(false);
  const [err, setErr] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  function submitHandler(e) {
    e.preventDefault();
    if (!userData.email || !userData.password || !userData.confirmPassword) {
      alert("fields cannot empty");
      return;
    }
    if (err.email || err.password || err.confirmPassword) {
      alert("please check the error");
      return;
    }
    if (userData.password !== userData.confirmPassword) {
      setErr((prevErr) => ({
        ...prevErr,
        confirmPassword: "password fields must be same",
      }));
      return;
    }
    fetch("http://localhost:3004/api/v1/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        name: userData.name
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "Failed") {
          alert("email already exists please try to login");
        } else if(data.status === "success") {
          alert("registration successful");
          navigate("/sign-in")
        }else if(data.errors){
          alert("check name if it have space or special key words/mail/check password to be of length 6")
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="main-sign-in">
      <form onSubmit={(e) => submitHandler(e)} action="#" method="POST">
        <div className="content">
          <div className="error">
            <h2>SIGN UP</h2>
            <div className="label">
              <label htmlFor="name">Name</label>
            </div>
            <div style={{marginBottom: "15px"}}>
              <input
                onChange={(e) => {
                  setUserData((prevData) => ({
                    ...prevData,
                    name: e.target.value,
                  }));
                  if (!e.target.value) {
                    setErr((prevErr) => ({
                      ...prevErr,
                      name: "name cannot be empty",
                    }));
                  } else {
                    setErr((prevErr) => ({
                      ...prevErr,
                      name: "",
                    }));
                  }
                }}
                className={err.name && "border-err"}
                id="name"
                type="text"
                name="name"
                placeholder="Name"
                value={userData.name}
              />
              {err.name && <div className="err"> {err.name}</div>}
            </div>
            <div className="label">
              <label htmlFor="email">Email</label>
            </div>
            <div>
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
                id="email"
                type="text"
                name="email"
                placeholder="Email"
                value={userData.email}
              />
              {err.email && <div className="err"> {err.email}</div>}
            </div>
          </div>
          <div className="pass error">
            <div className="label">
              <label htmlFor="password">Password</label>
            </div>
            <div>
              <input
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
                style={{ width: "85%" }}
                className={err.password && "border-err"}
                id="password"
                type={!showPass ? "password" : "text"}
                name="password"
                placeholder="Password"
                value={userData.password}
              />
              <span>
                <img
                  onClick={() => setShowPass(!showPass)}
                  src="padlock.png"
                  alt="lock img"
                />
              </span>

              {err.password && <div className="err"> {err.password}</div>}
            </div>
          </div>
          <div className="pass error">
            <div className="label">
              <label htmlFor="confirm-password">Confirm Password</label>
            </div>
            <div>
              <input
                onChange={(e) => {
                  setUserData((prevData) => ({
                    ...prevData,
                    confirmPassword: e.target.value,
                  }));
                  if (e.target.value.length < 6) {
                    setErr((prevErr) => ({
                      ...prevErr,
                      confirmPassword:
                        "password should be atlease 6 characters",
                    }));
                  } else {
                    setErr((prevErr) => ({
                      ...prevErr,
                      confirmPassword: "",
                    }));
                  }
                }}
                style={{ width: "85%" }}
                className={err.confirmPassword && "border-err"}
                value={userData.confirmPassword}
                id="confirm-password"
                type={!showConfPass ? "password" : "text"}
                name="confirmPassword"
                placeholder="Confirm Password"
              />
              <span>
                <img
                  onClick={() => setShowConPass(!showConfPass)}
                  src="padlock.png"
                  alt="lock img"
                />
              </span>
              {err.confirmPassword && (
                <div className="err"> {err.confirmPassword}</div>
              )}
            </div>
          </div>
          <div>
            <button type="submit">Sign Up</button>
          </div>
          <div className="forgot-pass">Forgot Password?</div>
          <div className="sign-up">
            Already have An Account? <Link to="/sign-in">Log In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
