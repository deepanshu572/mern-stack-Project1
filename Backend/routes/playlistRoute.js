import express from "express";
import isAuth from "../middleware/isAuth.js";
import { handlePlaylistSave } from "../controllers/playlistController.js";

const playlistRouter = express.Router();

playlistRouter.put("/playlist/:playlistId/save", isAuth, handlePlaylistSave);

export default playlistRouter;
