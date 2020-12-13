const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const Schema = mongoose.Schema;

const AuthorsSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

const AuthorsModel = mongoose.model("authors", AuthorsSchema);

module.exports = AuthorsModel;
