const gql = require("graphql-tag");
const { buildASTSchema } = require("graphql");

// Models
const Authors = require("../model/authors");
const Books = require("../model/books");

const schema = buildASTSchema(gql`
  type Query {
    books: [Book]
    book(id: ID!): Book
    authors: [Author]
    author(id: ID!): Author
  }

  type Mutation {
    addBook(book: BookInput): BookMutationResponse
  }

  input BookInput {
    title: String!
    genre: String!
    author: ID!
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type BookMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    book: Book
  }

  type Book {
    id: ID
    title: String
    genre: String
    author: Author
  }

  type Author {
    id: ID
    name: String
    age: Int
    books: [Book]
  }
`);

const rootValue = {
  books: () => Books.find({}).populate("author"),
  book: ({ id }) => Books.findById(id).populate("author"),
  authors: () => Authors.find({}),
  author: ({ id }) => Authors.findById(id),
  addBook: async (args) => {
    let book = new Books({
      title: args.book.title,
      genre: args.book.genre,
      author: args.book.author,
    });
    return {
      code: 200,
      message: "Book Created",
      success: true,
      book: await book.save(),
    };
  },
};

module.exports = {
  rootValue,
  schema,
};
