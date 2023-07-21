# ------------------------------------------------------
# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
# ------------------------------------------------------

type Like {
  id: ID!
  userId: String!
  postId: String!
  user: User!
}

type User {
  id: ID!
  username: String!
  avatar: String
  bio: String
  musicGenres: String
  socialMedia: String
  education: String
  posts: [Post!]!
  likes: [Like]!
  comments: [Comment]!
  password: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""
A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.
"""
scalar DateTime

type Comment {
  id: ID!
  userId: String!
  user: User!
  postId: String!
  post: Post!
  content: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Post {
  id: ID!
  mediaUrl: String!
  userId: String!
  user: User!
  likes: [Like!]!
  comments(page: Int! = 1): [Comment!]!
  createdAt: DateTime!
  updatedAt: DateTime!
  totalLikes: Int!
  totalComments: Int!
}

type LoginResponse {
  access_token: String!
  user: User!
}

type Query {
  users: [User!]!
  user(username: String!): User!
  posts(page: Int! = 1): [Post!]!
  post(id: String!): Post!
  likes: [Like!]!
}

type Mutation {
  login(loginUserInput: LoginUserInput!): LoginResponse!
  signup(loginUserInput: LoginUserInput!): User!
}

input LoginUserInput {
  username: String!
  password: String!
}