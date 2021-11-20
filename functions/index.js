const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLObjectType,
    GraphQLString, GraphQLList, GraphQLNonNull, 
    GraphQLInt } = require("graphql");
const Resolver = require("./resolver");

/**
 * Build GraphQL Schema
 */

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLString) },
        author: {
            type: AuthorType,
            resolve: Resolver.bookTypeAuthor,
        },
        year: { type: GraphQLNonNull(GraphQLInt) },
    }),
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            resolve: Resolver.authorTypeBooks,
        }
    }),
});

const RootQueryType = new GraphQLObjectType({
    name: "MyQuery",
    fields: () => ({
        books: {
            type: new GraphQLList(BookType),
            description: "List of all books",
            args: {
                year: { type: GraphQLInt },
            },
            resolve: Resolver.listBooks,
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: "List of all authors",
            resolve: Resolver.listAuthors,
        },
        book: {
            type: BookType,
            description: "Get A Book",
            args: {
                id: { type: GraphQLString }
            },
            resolve: Resolver.getBook,
        },
        author: {
            type: AuthorType,
            description: "Get A Author",
            args: {
                id: { type: GraphQLString }
            },
            resolve: Resolver.getAuthor,
        }
    }),
});

const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({
        addBook: {
            type: BookType,
            description: "Insert new book",
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                authorId: { type: GraphQLNonNull(GraphQLString) },
                year: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: Resolver.addBook,
        },
        addAuthor: {
            type: AuthorType,
            description: "Insert new author",
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                address: { type: GraphQLString },
                email: { type: GraphQLString },
            },
            resolve: Resolver.addAuthor,
        },
    }),
});

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
});

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.use('/', graphqlHTTP({
    schema,
    graphiql: true,
}));

exports.graphql = functions.https.onRequest(app);
