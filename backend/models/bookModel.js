import mongoose from "mongoose";


//Schema
const bookSchema = mongoose.Schema(
    {
        user_id :{
            type : mongoose.Schema.Types.ObjectId,
            required: true,
            ref:'User'
        },
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        publishYear: {
            type: Number,
            required: true
        }

    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

//Model
const Book = mongoose.model("Book", bookSchema, "books_store");

export default Book;

