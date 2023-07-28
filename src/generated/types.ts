// import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  post: Post;
  postId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserResponse;
  userId: Scalars['String']['output'];
};

export type CommentResponse = {
  __typename?: 'CommentResponse';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  parentId?: Maybe<Scalars['String']['output']>;
  post: Post;
  updatedAt: Scalars['DateTime']['output'];
  user: UserResponse;
};

export type CreateCommentInput = {
  content: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
  postId: Scalars['String']['input'];
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['ID']['output'];
  postId: Scalars['String']['output'];
  user: UserResponse;
  userId: Scalars['String']['output'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: UserResponse;
};

export type LoginUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  token: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createLike: Like;
  login: LoginResponse;
  logout: LogoutResponse;
  refresh: LoginResponse;
  removeLike: Like;
  signup: SignUpResponse;
};

export type MutationCreateCommentArgs = {
  createCommentInput: CreateCommentInput;
};

export type MutationCreateLikeArgs = {
  postId: Scalars['String']['input'];
};

export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};

export type MutationRemoveLikeArgs = {
  postId: Scalars['String']['input'];
};

export type MutationSignupArgs = {
  signupUserInput: SignUserInput;
};

export type Post = {
  __typename?: 'Post';
  comments: Array<CommentResponse>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  likes: Array<Like>;
  mediaUrl: Scalars['String']['output'];
  totalComments: Scalars['Int']['output'];
  totalLikes: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  likes: Array<Like>;
  post: Post;
  posts: Array<Post>;
  user: User;
  users: Array<User>;
};

export type QueryPostArgs = {
  id: Scalars['String']['input'];
};

export type QueryPostsArgs = {
  page?: Scalars['Int']['input'];
};

export type QueryUserArgs = {
  username: Scalars['String']['input'];
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: UserResponse;
};

export type SignUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  activationLink?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  comments: Array<Maybe<Comment>>;
  createdAt: Scalars['DateTime']['output'];
  education?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActivated: Scalars['Boolean']['output'];
  likes: Array<Maybe<Like>>;
  musicGenres?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  posts: Array<Post>;
  socialMedia?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  education?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActivated: Scalars['Boolean']['output'];
  musicGenres?: Maybe<Scalars['String']['output']>;
  socialMedia?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};
