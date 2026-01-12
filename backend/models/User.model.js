import mongoose, { Schema } from "mongoose";
const UserScheme = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  role: { type: String },
  passwordSetupToken: { type: String },
  passwordSetupExpires: Date,
});
const user = mongoose.model("User", UserScheme);
export default user;
