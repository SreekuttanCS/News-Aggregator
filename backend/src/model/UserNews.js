import mongoose from "mongoose";

const userNewsScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("UserNews", userNewsScheme);
