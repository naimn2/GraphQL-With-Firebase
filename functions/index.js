const functions = require("firebase-functions");

const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

/**
 * Contoh data
 */

const authors = [
    { id: 1, name: "Naim", address: "A4" },
    { id: 2, name: "Asad", address: "D3" },
    { id: 3, name: "Dafa", address: "F2" },
]

const books = [
    { id: 1, name: "Valorant Tips", authorId: 2 },
    { id: 2, name: "My Game", authorId: 2 },
    { id: 3, name: "Tutorial GraphQL", authorId: 1 },
    { id: 4, name: "Build Web with Firebase", authorId: 1 },
    { id: 5, name: "Tips Jadi Youtuber", authorId: 1 },
    { id: 6, name: "Kisah Nabi", authorId: 3 },
]

/**
 * Build GraphQL Schema
 */

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const rootValue = { hello: () => 'Hello world!' };

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.use('/', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
}));

exports.graphql = functions.https.onRequest(app);
