import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (filepath) => {
  try {
    if (!filepath) return null;
    const result = await cloudinary.uploader.upload(filepath, {
      resourse_type: "auto",
    });
    fs.unlinkSync(filepath);
    return result.secure_url;
  } catch (error) {
    console.log(error);
  }
};
export default uploadOnCloudinary;
