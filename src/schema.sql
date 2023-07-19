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
  likes: [Like]!
  password: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""
A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.
"""
scalar DateTime

type Like {
  id: ID!
  userId: String!
  postId: String!
  user: User!
}

type Post {
  id: ID!
  mediaUrl: String!
  userId: String!
  user: User!
  likes: [Like!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type LoginResponse {
  access_token: String!
  user: User!
}

type Comment {
  """Example field (placeholder)"""
  exampleField: Int!
}

type Query {
  users: [User!]!
  user(username: String!): User!
  posts: [Post!]!
  post(id: String!): Post!
  likes: [Like!]!
  comments: [Comment!]!
  comment(id: Int!): Comment!
}

type Mutation {
  login(loginUserInput: LoginUserInput!): LoginResponse!
  signup(loginUserInput: LoginUserInput!): User!
  createComment(createCommentInput: CreateCommentInput!): Comment!
  updateComment(updateCommentInput: UpdateCommentInput!): Comment!
  removeComment(id: Int!): Comment!
}

input LoginUserInput {
  username: String!
  password: String!
}

input CreateCommentInput {
  """Example field (placeholder)"""
  exampleField: Int!
}

input UpdateCommentInput {
  """Example field (placeholder)"""
  exampleField: Int
  id: Int!
}