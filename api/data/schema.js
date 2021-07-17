const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Query {
    categories: [Category]
    courses(categoryId: String, courseIds: [String!]): [Course]
  }
  type Category {
    id: ID!
    name: String!
    courses: [Course]!
    isCollege: Boolean!
  }
  type Course {
    id: ID!
    name: String
    professor: String
    grade: String
    credit: String
    type1: String
    type2: String
    targetDepartment: String
    target: String
    time: String
    place: String
    creditDetail: String
    limit: String
    timeData: String
  }
`)

module.exports = schema
