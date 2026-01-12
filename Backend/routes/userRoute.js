import express from "express";
import isAuth from "../middleware/isAuth.js";
import {
  CreateChannel,
  getCurrentChannel,
  getCurrentUser,
  updateChannel,
  subscriberToggle,
} from "../controllers/userController.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.get("/user", isAuth, getCurrentUser);
userRouter.get("/channel", isAuth, getCurrentChannel);
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
userRouter.post("/subscribe", isAuth, subscriberToggle);

export default userRouter;
