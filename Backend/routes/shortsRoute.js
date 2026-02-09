import express from "express";
import isAuth from "../middleware/isAuth.js";
import {
  handletoggleLikes,
  handletoggleDisLikes,
  handleSaveBy,
  handleAddComment,
  handleAddReply,
  handleAddViews,
} from "../controllers/shortsController.js";

const shortsRouter = express.Router();

shortsRouter.put("/short/:shortId/likeToggle", isAuth, handletoggleLikes);
shortsRouter.put("/short/:shortId/DislikeToggle", isAuth, handletoggleDisLikes);
shortsRouter.put("/short/:shortId/saveShort", isAuth, handleSaveBy);
shortsRouter.post("/short/:shortId/AddComment", isAuth, handleAddComment);
shortsRouter.post("/short/:shortId/AddReply", isAuth, handleAddReply);
shortsRouter.put("/short/:shortId/AddViews", isAuth, handleAddViews);

export default shortsRouter;
