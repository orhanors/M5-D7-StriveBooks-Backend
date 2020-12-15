const mongoose = require("mongoose");

const bookModel = new mongoose.Schema({
	title: { type: String },
	img: { type: String },
	price: { type: Number },
	category: { type: String },
});

const Book = mongoose.model("book", bookModel);

module.exports = Book;
