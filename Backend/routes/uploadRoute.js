import express from "express";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";
import {
  handleUploadVideo,
  handleUploadShort,
  handleUploadPlaylist,
  handleUploadCommunityPost,
} from "../controllers/uploadsController.js";

const uploadRouter = express.Router();

uploadRouter.post(
  "/video",
  isAuth,
  upload.fields([
    { name: "videoBanner", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  handleUploadVideo
);
uploadRouter.post(
  "/short",
  isAuth,
  upload.fields([
    { name: "videoBanner", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  handleUploadShort
);
uploadRouter.post("/playlist", isAuth, handleUploadPlaylist);
uploadRouter.post("/communityPost", isAuth, handleUploadCommunityPost);

export default uploadRouter;
