import express from "express";
import Quiz from "../models/Quiz.js";
const router = express.Router();

// GET quizzes for a lesson
router.get("/:lessonId", async (req, res) => {
  const quizzes = await Quiz.find({ lessonId: req.params.lessonId });
  res.json(quizzes);
});

// POST new quiz
router.post("/", async (req, res) => {
  const { lessonId, question, options, answer } = req.body;
  const quiz = new Quiz({ lessonId, question, options, answer });
  await quiz.save();
  res.json(quiz);
});

export default router;
