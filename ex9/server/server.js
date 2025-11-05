import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import lessonRoutes from "./routes/lessonRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";


const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/microlearn2";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


app.use("/api/lessons", lessonRoutes);
app.use("/api/quizzes", quizRoutes);

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => res.send("Backend Running"));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
