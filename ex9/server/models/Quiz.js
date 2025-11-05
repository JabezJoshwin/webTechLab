import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  lessonId: String,
  question: String,
  options: [String],
  answer: String,
});

export default mongoose.model("Quiz", quizSchema);
