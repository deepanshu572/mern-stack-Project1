import express from "express";
import isAuth from "../middleware/isAuth.js";
import { handletoggleLikes, handletoggleDisLikes, handleSaveBy, handleAddComment, handleAddReply, handleAddViews } from "../controllers/videoController.js";

const videosRouter = express.Router();

videosRouter.put("/video/:videoId/likeToggle", isAuth, handletoggleLikes);
videosRouter.put("/video/:videoId/DislikeToggle", isAuth, handletoggleDisLikes);
videosRouter.put("/video/:videoId/savevideo", isAuth, handleSaveBy);
videosRouter.post("/video/:videoId/AddComment", isAuth, handleAddComment);
videosRouter.post("/video/:videoId/AddReply", isAuth, handleAddReply);
videosRouter.put("/video/:videoId/AddViews", isAuth, handleAddViews);

export default videosRouter;
