import express from "express";
import Quiz from "../models/Quiz.js";
const router = express.Router();

// GET quizzes for a lesson
router.get("/:lessonId", async (req, res) => {
  try {
    const quizzes = await Quiz.find({ lessonId: req.params.lessonId });
    res.json(quizzes);
  } catch (err) {
    console.error("Error fetching quizzes:", err);
    res.status(500).json({ message: "Failed to fetch quizzes", error: err.message });
  }
});

// POST new quiz
router.post("/", async (req, res) => {
  try {
    const { lessonId, question, options, answer } = req.body;
    const quiz = new Quiz({ lessonId, question, options, answer });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    console.error("Error saving quiz:", err);
    res.status(500).json({ message: "Failed to save quiz", error: err.message });
  }
});

export default router;
