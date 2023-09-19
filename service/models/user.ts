import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: String, default: false },
  activationLink: { type: String },
  onboarded: { type: Boolean, default: false },
});

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
