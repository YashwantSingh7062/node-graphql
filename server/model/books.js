const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const Schema = mongoose.Schema;

const BooksSchema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  author: { type: ObjectId, required: true, ref: "authors" },
});

const BooksModel = mongoose.model("books", BooksSchema);

module.exports = BooksModel;
