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
  user(id: String!): User!
  posts: [Post!]!
  post(id: Int!): Post!
}

type Mutation {
  createPost(createPostInput: CreatePostInput!): Post!
  updatePost(updatePostInput: UpdatePostInput!): Post!
  removePost(id: Int!): Post!
}

input CreatePostInput {
  """Example field (placeholder)"""
  exampleField: Int!
}

input UpdatePostInput {
  """Example field (placeholder)"""
  exampleField: Int
  id: Int!
}