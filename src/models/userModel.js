import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter username"],
  },
  email: {
    type: String,
    required: [true, "Please enter username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter username"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpriy: Date,
});

const User = mongoose.models.users3 || mongoose.model("users3", userSchema);
export default User;
