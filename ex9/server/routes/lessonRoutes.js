import express from "express";
import Lesson from "../models/Lesson.js";
const router = express.Router();

// GET all lessons
router.get("/", async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (err) {
    console.error("Error fetching lessons:", err);
    res.status(500).json({ message: "Failed to fetch lessons", error: err.message });
  }
});

// POST new lesson
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const lesson = new Lesson({ title, content });
    await lesson.save();
    res.status(201).json(lesson);
  } catch (err) {
    console.error("Error saving lesson:", err);
    res.status(500).json({ message: "Failed to save lesson", error: err.message });
  }
});

export default router;
