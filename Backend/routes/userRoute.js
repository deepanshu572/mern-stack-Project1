import express from "express";
import isAuth from "../middleware/isAuth.js";
import { CreateChannel, getCurrentUser, updateChannel } from "../controllers/userController.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.get("/user", isAuth, getCurrentUser);
userRouter.post(
  "/createChannel",
  isAuth, 
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  CreateChannel
);
userRouter.post(
  "/updateChannel",
  isAuth, 
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  updateChannel
);

export default userRouter;
