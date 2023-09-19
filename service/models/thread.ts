import mongoose from "mongoose";

const ThreadSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Text is required"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
});

const ThreadModel =
  mongoose.models.Thread || mongoose.model("Thread", ThreadSchema);

export default ThreadModel;
