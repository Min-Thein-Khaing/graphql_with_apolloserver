import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const books = [
  { id: 1, title: "Book 1", author: "Author 1", price: 23 },
  { id: 2, title: "Book 2", author: "Author 2", price: 24 },
  { id: 3, title: "Book 3", author: "Author 3", price: 25 },
];

const typeDefs = `#graphql
    type Book {
        id: ID 
        title: String!
        author: String!
        price: Int
    }

    type Query {
        books: [Book]
        book(id: ID!): Book
    }
`;

const resolvers = {
  Query: {
    books: () => books,

    book: (_parent: any, args: { id: string }) =>
      books.find((book) => book.id === Number(args.id)),
  },
};

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at ${url}`);
}

startApolloServer();
