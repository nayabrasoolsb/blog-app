const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const connection = require("./connection/connection.js");
const loginRoutes = require("./routes/login.js");
const blogsRoutes = require("./routes/blogs.js");
const cors = require("cors");
var jwt = require("jsonwebtoken");
const secret = "RESTAPI";
const dotenv = require("dotenv").config();

app.use(cors());
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
// app.use(express.json());
// app.use(
//   express.json({
//     limit: "50mb",
//   }),
// );

app.use("/api/v1/blogs", (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    if (token) {
      // verify a token symmetric
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(403).json({
            status: "failed",
            message: "Invalid token",
          });
        }
        req.user = decoded.data;
        next();
      });
    } else {
      return res.status(403).json({
        status: "failed",
        message: "Invalid token",
      });
    }
  } else {
    return res
      .status(403)
      .json({ status: "Failed", message: "Not authenticated user" });
  }
});

app.get("/", (req, res) => {
  res.status(200).send("ok");
});

app.use("/api/v1/blogs", blogsRoutes);
app.use("/api/v1/user", loginRoutes);

app.get("*", (req, res) => {
  res.status(404).send("page not found");
});

app.listen(process.env.PORT, () => {
  console.log("server is up in ", process.env.PORT);
});
