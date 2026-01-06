import express from "express";
import isAuth from "../middleware/isAuth.js";
import { handletoggleLikes, handletoggleDisLikes, handleSaveBy } from "../controllers/toggleController.js";

const toggleRouter = express.Router();

toggleRouter.put("/short/:shortId/likeToggle", isAuth, handletoggleLikes);
toggleRouter.put("/short/:shortId/DislikeToggle", isAuth, handletoggleDisLikes);
toggleRouter.put("/short/:shortId/saveShort", isAuth, handleSaveBy);

export default toggleRouter;
