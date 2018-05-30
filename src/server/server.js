// Chargement de la définition des types
const fs = require('fs');
const path = require('path');
const schemaFile = path.join(__dirname, 'schema.graphql');
const typeDefs = fs.readFileSync(schemaFile, 'utf8');

// Chargement des resolvers
const resolvers = require('./resolvers');

// Construction du schema GraphQL avec la definition de types et des resolvers
const { makeExecutableSchema } = require('graphql-tools');
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

// Démarrage du serveur GraphQL
const express = require('express');
const graphqlHTTP = require('express-graphql');
let app = express();
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));
app.listen(4000);

console.log('GraphQL server is runing!');
