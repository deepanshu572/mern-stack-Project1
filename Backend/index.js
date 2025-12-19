import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute.js";
import cors from 'cors'
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin : "http://localhost:5173",
  credentials : true
}))
app.use('/api/auth', authRouter);

app.get("/", (req, res) => {
  res.send("done");
  console.log(authRouter)

});

app.listen(port, async () => {
  console.log("server started");
  await connectDb();
});
