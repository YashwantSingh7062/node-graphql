const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
} = require("graphql");

const Books = require("../model/books");
const Authors = require("../model/authors");

const { ObjectId } = require("mongoose").Types;

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        return Books.find({ authorId: ObjectId(parent._id) });
      },
    },
  }),
});

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Authors.findById(parent.authorId);
      },
    },
  }),
});

module.exports = {
  BookType,
  AuthorType,
};
