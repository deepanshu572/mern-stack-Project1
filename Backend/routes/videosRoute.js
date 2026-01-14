import express from "express";
import isAuth from "../middleware/isAuth.js";
import { handletoggleLikes, handletoggleDisLikes, handleSaveBy } from "../controllers/videoController.js";

const videosRouter = express.Router();

videosRouter.put("/video/:videoId/likeToggle", isAuth, handletoggleLikes);
videosRouter.put("/video/:videoId/DislikeToggle", isAuth, handletoggleDisLikes);
videosRouter.put("/video/:videoId/savevideo", isAuth, handleSaveBy);

export default videosRouter;
