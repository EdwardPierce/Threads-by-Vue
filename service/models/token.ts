import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  refreshToken: { type: String, required: true },
});

const TokenModel =
  mongoose.models.Token || mongoose.model("Token", TokenSchema);

export default TokenModel;
