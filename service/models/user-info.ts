import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  name: {
    type: String,
    required: true,
  },
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
});

const UserInfoModel =
  mongoose.models.UserInfo || mongoose.model("UserInfo", userInfoSchema);

export default UserInfoModel;
