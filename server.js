const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

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

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const rootValue = { hello: () => 'Hello world!' };

const app = express();
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));