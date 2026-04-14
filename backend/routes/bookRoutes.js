import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

// ➤ ADD BOOK
router.post("/add", async (req, res) => {
  try {
    const { title, author, year } = req.body;

    const newBook = new Book({ title, author, year });
    await newBook.save();

    res.json({ message: "Book added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding book" });
  }
});

// ➤ GET ALL BOOKS
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
});

// ➤ DELETE BOOK
router.delete("/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book" });
  }
});

export default router;