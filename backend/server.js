import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./Database/database.js";
import userRoute from "./routes/user.routes.js";
connectDB();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Attendance Backend Server Running ✅");
});
app.use("/create",userRoute)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
