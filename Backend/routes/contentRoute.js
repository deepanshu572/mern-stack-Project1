import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getAllVideos } from "../controllers/contentController.js";

const contentRouter = express.Router();

contentRouter.post("/allVideos", getAllVideos);

export default contentRouter;
