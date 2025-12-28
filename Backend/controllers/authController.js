import uploadOnCloudinary from "../config/cloudinary.js";
import genToken from "../config/genToken.js";
import users from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import sendMail from "../config/sendMail.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let photoUrl;
    console.log(req.file, "req.file ");

    if (req.file) {
      photoUrl = await uploadOnCloudinary(req.file.path);
    }
    let existUser = await users.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User is already Exist" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "invalid Email" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "enter strong password" });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    console.log(username, email, hashpassword, photoUrl);
    // return null;
    const user = await users.create({
      username,
      email,
      password: hashpassword,
      image: photoUrl,
    });
    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let existing = await users.findOne({ email });
    // console.log(email ,password ,  existing);
    if (!existing || existing == null) {
      return res
        .status(400)
        .json({ message: "User not found, please register !" });
    }

    let matchPass = await bcrypt.compare(password, existing.password);
    if (!matchPass) {
      return res.status(404).send("password is incorrect !");
    }
    let token = await genToken(existing._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });
    return res.status(200).json(existing);
  } catch (error) {
    return res.status(400).json({ message: `login error ${error}` });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { username, email, image } = req.body;
    let googlephotoUrl = image;
    if (googlephotoUrl) {
      try {
        googlephotoUrl = await uploadOnCloudinary(image);
      } catch (error) {
        console.log("Cloudinary upload error: ", error);
      }
    }
    let existUser = await users.findOne({ email });
    let user = existUser;
    if (!existUser) {
      user = await users.create({
        username,
        email,
        image: googlephotoUrl,
      });
    } else {
      if (!existUser.image && googlephotoUrl) {
        existUser.image = googlephotoUrl;
        await existUser.save();
      }
    }
    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });
    return res.status(200).json(existUser);
  } catch (error) {
    return res.status(400).json({ message: ` errorr ${error}` });
  }
};

export const logout = async (req, res) => {
  try {
    console.log(req.cookies);
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
    user.isOtpVerified = false;
    console.log(otp)
    await user.save();
    await sendMail(email, otp);
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);
  }
};


export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    let user = await users.findOne({ email });

    if (!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    user.isOtpVerified = true;
    await user.save();
    return res.status(200).json({ message: "OTP Verified Successfully" });
  } catch (error) {
    return res.status(200).json({ message: `OTP Verified errorr : ${error}` });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, NewPassword } = req.body;
    let user = await users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const hashpassword = await bcrypt.hash(NewPassword, 10);
    user.password = hashpassword;
    user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res
      .status(200)
      .json({ message: `something wents wrong : ${error}` });
  }
};
