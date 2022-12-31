const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/blogs1").then(() => {
  console.log("connected to mongodb")
}).catch((err) => {
  console.log(err)
})