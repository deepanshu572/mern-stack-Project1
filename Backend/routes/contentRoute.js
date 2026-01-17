import express from "express";
import isAuth from "../middleware/isAuth.js";
import {
  getAllVideos,
  getAllShorts,
  getAllPlaylist,
  getAllPost,
  getLikedData,
  getSavedData
  
} from "../controllers/contentController.js";

const contentRouter = express.Router();

contentRouter.post("/allVideos", getAllVideos);
contentRouter.post("/allShorts", getAllShorts);
contentRouter.post("/allPlaylist", getAllPlaylist);
contentRouter.post("/allPost", getAllPost);
contentRouter.get("/likeData", isAuth , getLikedData);
contentRouter.get("/savedData", isAuth , getSavedData);

export default contentRouter;
