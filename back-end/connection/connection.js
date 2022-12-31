const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const dotenv = require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("connected to mongodb")
}).catch((err) => {
  console.log(err)
})