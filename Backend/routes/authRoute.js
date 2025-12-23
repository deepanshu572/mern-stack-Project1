import express from 'express'
import { googleAuth, login, logout, register } from '../controllers/authController.js';
import upload from '../middleware/multer.js';

const authRouter = express.Router();

authRouter.post("/register", upload.single("image"), register)
authRouter.post("/login", login)
authRouter.get("/logout", logout)
authRouter.post("/googleauth", upload.single("image") , googleAuth)

export default authRouter;