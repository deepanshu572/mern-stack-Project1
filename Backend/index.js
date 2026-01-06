import express from "express";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute.js";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import uploadRouter from "./routes/uploadRoute.js";
import contentRouter from "./routes/contentRoute.js";
import channelRouter from "./routes/channelRoute.js";
import toggleRouter from "./routes/toggleRoute.js";

const app = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/content", contentRouter);
app.use("/api/channel", channelRouter);
app.use("/api/toggles", toggleRouter);

app.get("/", (req, res) => {
  res.send("done");
});

app.listen(port, async () => {
  console.log("server started");
  await connectDb();
});
