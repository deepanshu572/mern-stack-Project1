import express from "express";
import isAuth from "../middleware/isAuth.js";
import { handletoggleLikes, handletoggleDisLikes, handleSaveBy } from "../controllers/shortsController.js";

const shortsRouter = express.Router();

shortsRouter.put("/short/:shortId/likeToggle", isAuth, handletoggleLikes);
shortsRouter.put("/short/:shortId/DislikeToggle", isAuth, handletoggleDisLikes);
shortsRouter.put("/short/:shortId/saveShort", isAuth, handleSaveBy);

export default shortsRouter;
