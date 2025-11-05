import express from "express";
import Lesson from "../models/Lesson.js";
const router = express.Router();

// GET all lessons
router.get("/", async (req, res) => {
  const lessons = await Lesson.find();
  res.json(lessons);
});

// POST new lesson
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  const lesson = new Lesson({ title, content });
  await lesson.save();
  res.json(lesson);
});

export default router;
