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
  email: String!
  isActivated: Boolean!
  activationLink: String
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
  comments: [CommentResponse!]!
  createdAt: DateTime!
  updatedAt: DateTime!
  totalLikes: Int!
  totalComments: Int!
}

type CommentResponse {
  id: String!
  user: User!
  parentId: String
  post: Post!
  content: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type UserResponse {
  id: String!
  username: String!
  email: String!
  isActivated: Boolean!
  avatar: String
  bio: String
  musicGenres: String
  socialMedia: String
  education: String
}

type LoginResponse {
  accessToken: String!
  refreshToken: String!
  user: UserResponse!
}

type SignUpResponse {
  accessToken: String!
  refreshToken: String!
  user: UserResponse!
}

type LogoutResponse {
  token: String!
}

type Query {
  users: [User!]!
  user(username: String!): User!
  posts(page: Int! = 1): [Post!]!
  post(id: String!): Post!
  likes: [Like!]!
}

type Mutation {
  createComment(createCommentInput: CreateCommentInput!): Comment!
  createLike(postId: String!): Like!
  removeLike(postId: String!): Like!
  login(loginUserInput: LoginUserInput!): LoginResponse!
  logout: LogoutResponse!
  signup(signupUserInput: SignUserInput!): SignUpResponse!
  refresh: LoginResponse!
}

input CreateCommentInput {
  postId: String!
  content: String!
  parentId: String
}

input LoginUserInput {
  email: String!
  password: String!
}

input SignUserInput {
  username: String!
  email: String!
  password: String!
}