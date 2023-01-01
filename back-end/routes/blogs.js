const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const Blogs = require("../models/blog.js");
const cloudinary = require("../cloudinary/cloudinary");
const cors = require("cors");
const dotenv = require("dotenv").config();

router.use(cors());
router.use(bodyParser.json());
// router.use(
//   express.json({
//     limit: "50mb",
//   }),
// );
router.use(bodyParser.json({ limit: "50mb" }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
router.use(express.json());

router.get("/fetch/:pageNum", async (req, res) => {
  try {
    const { pageNum } = req.params;
    const blogs = await Blogs.find({ user: req.user })
      .skip(pageNum > 0 && pageNum ? (pageNum - 1) * 3 : 0)
      .limit(3)
      .sort({ _id: -1 })
      .populate("user");
    res.json({
      status: "success",
      blogs,
    });
  } catch (error) {
    res.json({
      status: "Failed",
      message: error.message,
    });
  }
});
router.get("/fetch/blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await Blogs.find({ _id: id, user: req.user });
    res.json({
      status: "success",
      blogs,
    });
  } catch (error) {
    res.json({
      status: "Failed",
      message: error.message,
    });
  }
});
router.post("/upload", async (req, res) => {
  const { title, description, imageUrl } = req.body;
  try {
    const uploadedResponse = await cloudinary.v2.uploader.upload(
      imageUrl,
      { upload_preset: "ml_default" },
      function (error, result) {
        if (error) {
          res.sendStatus(500);
        } //else console.log(result);
        return { url: result.secure_url, public_id: result.public_id };
      },
    );
    if (uploadedResponse) {
      const posts = await Blogs.create({
        title,
        description,
        imageUrl: {
          imageUrl: uploadedResponse.url,
          public_id: uploadedResponse.public_id,
        },
        user: req.user,
      });
      res.json({
        status: "success",
        posts,
      });
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    res.json({
      status: "Failed",
      message: error.message,
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await Blogs.findOneAndDelete({ _id: id });
    res.json({
      status: "success",
      blogs,
    });
  } catch (error) {
    console.log(error)
    res.json({
      status: "Failed",
      test: "test",
      message: error.message,
    });
  }
});

module.exports = router;
