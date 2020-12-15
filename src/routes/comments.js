const express = require("express");

const Joi = require("joi");
const commentRouter = express.Router();
const Comment = require("../models/commentModel");

/**
 *  POST /books/id/comments => adds a comment for book {id}
    GET /books/id/comments => gets all the comments for book {id}
    DELETE /books/comments/id => delete comment {id}
 */

const validateComment = (dataToValidate) => {
	const schema = Joi.object().keys({
		username: Joi.string().min(3).max(30).required(),
		text: Joi.string().min(3).max(300).required(),
	});

	console.log(schema.validate(dataToValidate));
	return schema.validate(dataToValidate);
};

commentRouter.post("/:asin/comments", async (req, res, next) => {
	try {
		const { error } = validateComment(req.body);
		if (error) {
			// İf there is an error joi returns an error object which is not empty, otherwise it will be empty
			const err = new Error();
			err.message = error.details[0].message; //it returns the error message from Joi validation
			err.httpStatusCode = 400;
			next(err);

			//TODO add else if valitadion for id checking
		} else {
			const comment = new Comment({
				...req.body,
				asin: req.params.asin,
				createdAt: new Date(),
			});

			try {
				const result = await comment.save();
				res.status(201).send(comment);
				console.log(result);
			} catch (error) {
				console.log(error);
				next(error);
			}
		}
	} catch (error) {
		console.log(error);
		next(error);
	}
});

commentRouter.get("/:asin/comments", async (req, res, next) => {
	try {
		const bookComments = await Comment.find({ asin: req.params.asin });

		if (bookComments) {
			res.status(200).send(bookComments);
		} else {
			const err = new Error();
			err.httpStatusCode = 404;
			next(err);
		}
	} catch (error) {
		console.log(error);
		next(error);
	}
});

commentRouter.delete("/comments/:commentId", async (req, res, next) => {
	try {
		const comment = await Comment.find({ _id: req.params.commentId });

		if (!comment) {
			const err = new Error();
			err.httpStatusCode = 404;
			next(err);
		} else {
			try {
				const result = await Comment.findByIdAndRemove(
					req.params.commentId
				);
				res.send(200).send(
					`successfuly deleted... id:${req.params.commentId}`
				);
			} catch (error) {
				console.log(error);
				next(error);
			}
		}
	} catch (error) {
		console.log(error);
		next(error);
	}
});
module.exports = commentRouter;
