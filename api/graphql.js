const express = require('express')
const graphqlHTTP = require('express-graphql')

// Create express instnace
const app = express()

// Require GraphQL data
const schema = require('./data/schema')
const rootValue = require('./data/rootValue')

app.use('/', graphqlHTTP({
  schema,
  rootValue,
  graphiql: (process.env.NODE_ENV === 'development')
}))

// Export the server middleware
module.exports = {
  path: '/graphql',
  handler: app
}
