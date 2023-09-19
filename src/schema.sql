# ------------------------------------------------------
# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
# ------------------------------------------------------

type Like {
  id: ID!
  userId: String!
  postId: String!
  user: UserResponse!
}

type Hashtag {
  id: ID!
  tag: String!
}

type User {
  id: ID!
  username: String!
  email: String!
  isActivated: Boolean!
  activationLink: String
  avatar: String
  bio: String
  socialMedia: String
  education: String
  posts(page: Int! = 1): [PostResponse!]!
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
  user: UserResponse!
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
  likes: [Like]!
  comments: [Comment]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type UserResponse {
  id: String!
  username: String!
  email: String!
  activationLink: String
  isActivated: Boolean!
  avatar: String
  bio: String
  socialMedia: String
  education: String
}

type CommentResponse {
  id: String!
  user: UserResponse!
  parentId: String
  post: Post!
  content: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type PostResponse {
  id: String!
  mediaUrl: String!
  userId: String!
  user: User!
  likes: [Like!]!
  totalLikes: Int!
  totalComments: Int!
  isLiked: Boolean!
  comments: [CommentResponse!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type PostDeleteResponse {
  success: Boolean!
  message: String!
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

type SearchResponse {
  user: UserResponse!
}

type Query {
  users: [User!]!
  user(username: String!): User!
  posts(page: Int! = 1): [PostResponse!]!
  post(id: String!): PostResponse!
  likes: [Like!]!
  searchByName(username: String!): [SearchResponse!]!
  searchByHashtag(hashtagName: String!): [SearchResponse!]!
}

type Mutation {
  updateUser(updateUserInput: UpdateUserInput!): User!
  createPost(createPostInput: CreatePostInput!): PostResponse!
  deletePost(postId: String!): PostDeleteResponse!
  updatePost(post: UpdatePostInput!): PostResponse!
  createComment(createCommentInput: CreateCommentInput!): Comment!
  createLike(postId: String!): Like!
  removeLike(postId: String!): Like!
  login(loginUserInput: LoginUserInput!): LoginResponse!
  sendReactivation(email: String!): String!
  logout: LogoutResponse!
  signup(signupUserInput: SignUserInput!): SignUpResponse!
  refresh: LoginResponse!
}

input UpdateUserInput {
  username: String
  email: String
  password: String
  id: String!
  avatar: String
  bio: String
  socialMedia: String
  education: String
}

input CreatePostInput {
  mediaUrl: String!
}

input UpdatePostInput {
  mediaUrl: String
  id: String!
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