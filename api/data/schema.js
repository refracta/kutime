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
    classGroup: String
    name: String
    grade: String
    credit: String
    type: String
    timePlace: String
    professor: String
    evaluation: String
    note: String
    lecPlan: String
    glecPlan: String
    timeData: String
    abeek: String
  }
`)

module.exports = schema
