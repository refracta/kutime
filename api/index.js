const express = require('express')

// Create express instnace
const app = express()

// Require API routes
const users = require('./routes/users')
const version0 = require('./routes/v0')

// Import API Routes
app.use(users)
app.use(version0)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
