const express = require("express");
const Book = require("../models/bookModel");

const bookRouter = express.Router();

bookRouter.get("/", async (req, res, next) => {
	try {
		const allBooks = await Book.find({});

		if (allBooks) {
			res.status(200).send(allBooks);
		} else {
			const error = new Error();
			error.httpStatusCode = 404;
			next(error);
		}
	} catch (error) {
		console.log(error);
		next(error);
	}
});

module.exports = bookRouter;
