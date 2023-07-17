# ------------------------------------------------------
# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
# ------------------------------------------------------

type User {
  id: ID!
  name: String!
  avatar: String!
  bio: String!
  musicGenres: String!
  socialMedia: String!
  education: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  mediaUrl: String!
  userId: String!
}

type Query {
  users: [User!]!
  user(id: String!): User!
  posts: [Post!]!
  post(id: String!): Post!
}