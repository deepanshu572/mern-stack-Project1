import express from "express";
import { getAllChannels } from "../controllers/channelController.js";

const channelRouter = express.Router();
channelRouter.post("/Allchannels", getAllChannels);

export default channelRouter;
