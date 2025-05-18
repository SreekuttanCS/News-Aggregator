import mongoose from "mongoose";

const userNewsScheme = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model("UserNews", userNewsScheme);
