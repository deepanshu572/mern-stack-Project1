import uploadOnCloudinary from "../config/cloudinary.js";
import genToken from "../config/genToken.js";
import users from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
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
    // console.log(username, email, image , req.body)
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
