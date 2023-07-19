# ------------------------------------------------------
# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
# ------------------------------------------------------

type User {
  id: ID!
  username: String!
  avatar: String
  bio: String
  musicGenres: String
  socialMedia: String
  education: String
  posts: [Post!]!
  password: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""
A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.
"""
scalar DateTime

type Post {
  id: ID!
  mediaUrl: String!
  userId: String!
  user: User!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type LoginResponse {
  access_token: String!
  user: User!
}

type Query {
  users: [User!]!
  user(username: String!): User!
  posts: [Post!]!
  post(id: String!): Post!
}

type Mutation {
  login(loginUserInput: LoginUserInput!): LoginResponse!
  signup(loginUserInput: LoginUserInput!): User!
}

input LoginUserInput {
  username: String!
  password: String!
}