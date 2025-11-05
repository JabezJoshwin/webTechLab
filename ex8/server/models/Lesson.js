import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: String,
  content: String,
});

export default mongoose.model("Lesson", lessonSchema);
