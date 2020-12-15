const express = require("express");
const mongoose = require("mongoose");
const {
	notFoundError,
	forbiddenError,
	badRequestError,
	genericError,
	unauthorizedError,
} = require("./errorHandling");
const cors = require("cors");
const booksRouter = require("./routes/books");
const commentsRouter = require("./routes/comments");

const mongo_url = process.env.MONGODB_URI;
const server = express();

mongoose
	.connect(mongo_url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("connected to database..."))
	.catch((err) => console.log(err));

const port = process.env.PORT || 3001;

server.use(express.json());
server.use(cors());

server.use("/books", booksRouter);
server.use("/books", commentsRouter);
// ERROR MIDDLEWARES

server.use(badRequestError);
server.use(forbiddenError);
server.use(notFoundError);
server.use(unauthorizedError);
server.use(genericError);
server.listen(port, () => {
	if (process.env.NODE_ENV === "production") {
		console.log("Server is running on CLOUD port:", port);
	} else {
		console.log("Server is running LOCALLY port:", port);
	}
});
