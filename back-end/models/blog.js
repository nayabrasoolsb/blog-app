const mongoose = require("mongoose");

const { Schema } = mongoose;
const blogSchema = new Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {
      imageUrl: String,
      public_id: {type: String, required: true}
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);
const blogModel = mongoose.model("Blog", blogSchema);
module.exports = blogModel;
