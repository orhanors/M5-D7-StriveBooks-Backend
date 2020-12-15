const mongoose = require("mongoose");

/**
 *  - CommentID //Server Generated
    - UserName
    - Text
    - Date //Server Generated
 */

const commentSchema = new mongoose.Schema({
	asin: { type: String, required: true },
	username: { type: String, required: true, minlength: 3, maxlength: 45 },
	text: { type: String, required: true, minlength: 1, maxlength: 400 },
	createdAt: { type: Date },
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
