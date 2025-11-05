import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import lessonRoutes from "./routes/lessonRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://mjabez_db_user:jabez123@cluster0.kccxrpr.mongodb.net/microlearn?retryWrites=true&w=majority")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


app.use("/api/lessons", lessonRoutes);
app.use("/api/quizzes", quizRoutes);

app.listen(5001, () => console.log("Server running on port 5001"));
