import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
      default: "",
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "channel",
    },
    history: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "history",
    },
    resetOtp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

const users = mongoose.model("user", userSchema);

export default users;
