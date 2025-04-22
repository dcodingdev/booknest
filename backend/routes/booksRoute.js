
import express from "express";
import mongoose from "mongoose";
import Book from "../models/bookModel.js"; // ✅ Import Book model
import { verifyToken } from "../middleware/authMiddleware.js"; // ✅ Protect routes

const router = express.Router();

/** 
 * @route   GET /books
 * @desc    Get all books (only if authenticated)
 * @access  Private
 */
// router.use(verifyToken); // ✅ Protect all routes
router.get("/", verifyToken, async (req, res) => {
    try {
        console.log("Decoded User in Request:", req.user); // ✅ Log req.user

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "❌ Unauthorized: Invalid token or user not found" });
        }

        const books = await Book.find({ user_id: req.user.id }); // ✅ Fetch books from DB
        res.json(books);
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "❌ Server error: " + error.message });
    }
});

/** 
 * @route   GET /books/:id
 * @desc    Get a single book by ID
 * @access  Private
 */
router.get("/:id", verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Fetching book with ID: ${id}`); // Log book ID for debugging

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid book ID format" });
        }

        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json(book);
    } catch (error) {
        res.status(500).json({ message: "Server error: " + error.message });
    }
});
/** 
 * @route   POST /books
 * @desc    Create a new book
 * @access  Private
 */
router.post("/", verifyToken, async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;

        if (!title || !author || !publishYear) {
            return res.status(400).json({ message: "Please provide all book details" });
        }

        const newBook = new Book({
            title,
            author,
            publishYear,
            user_id: req.user.id,
        });

        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: "Server error: " + error.message });
    }
});

/** 
 * @route   PUT /books/:id
 * @desc    Update a book by ID
 * @access  Private
 */
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, publishYear } = req.body;

        console.log(`Updating book with ID: ${id}`); // Log book ID for debugging

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid book ID format" });
        }

        let book = await Book.findById(id);

        if (!book) {
            console.log(`Book with ID: ${id} not found`); // Log if book not found
            return res.status(404).json({ message: "Book not found" });
        }

        if (book.user_id.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to update this book" });
        }

        const updatedBook = await Book.findByIdAndUpdate(id, {
            title,
            author,
            publishYear,
        }, { new: true });

        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: "Server error: " + error.message });
    }
});

/** 
 * @route   DELETE /books/:id
 * @desc    Delete a book by ID
 * @access  Private
 */
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid book ID format" });
        }

        const book = await Book.findById(id);
        if (!book) {
            console.log(`Book with ID: ${id} not found`); // Log if book not found
            return res.status(404).json({ message: "Book not found" });
        }

        if (book.user_id.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to delete this book" });
        }

        await book.deleteOne();
        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error: " + error.message });
    }
});

export default router;
