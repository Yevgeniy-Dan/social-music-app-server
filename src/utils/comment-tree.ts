// --------------- DAG - Directed Acyclic Graph------------------
//
//         rootComment                      rootComment
//         /       \                      /             \
//     child1      child2            child3          child4
//        |          |               /     \             |
//  grandchild1      |      grandchild4   grandchild5  grandchild6
//                  / \
//        grandchild2  grandchild3

import CommentMap from './CommentMap';

export interface IComment {
  id: string;
  userId: string;
  postId: string;
  content: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

type ReplySet = {
  parentId: string;
  replyId: string;
};

type Order = 'asc' | 'desc';

export class CommentTree {
  comments: CommentMap;
  replyIds: Set<ReplySet>;

  constructor() {
    this.comments = new CommentMap();
    this.replyIds = new Set<ReplySet>();
  }

  addComment = (comment: IComment) => {
    const item = getObjectWithIdInReplySet(this.replyIds, comment.id);
    comment = { ...comment, parentId: item?.parentId };
    this.comments.set(comment, new Set<IComment>());
  };

  removeComment = (commentId: string) => {
    const childComments = this.comments.getById(commentId);

    if (childComments && childComments.size > 0) {
      throw new Error('Cannot delete a comment that has child comments.');
    }

    this.comments.deleteById(commentId);

    const { parentId } = getObjectWithIdInReplySet(this.replyIds, commentId);

    const childCommentsSet = this.comments.getById(parentId);

    const deleteCommentInSet = [...childCommentsSet].find((c) => c.id === commentId);

    if (deleteCommentInSet) {
      childCommentsSet.delete(deleteCommentInSet);
    }
    this.deleteReplyIdObj(commentId);
  };

  addReplyIdObj = (parentId: string, replyId: string) => {
    if (!parentId || !replyId) {
      throw new Error('Both parentId and replyId must be provided.');
    }
    this.replyIds.add({ parentId, replyId });
  };

  deleteReplyIdObj = (id: string) => {
    for (const value of this.replyIds) {
      if (value.replyId === id) {
        this.replyIds.delete(value);
        break;
      }
    }
  };

  addEdge = (parentId: string, childId: string) => {
    if (!this.comments.hasById(parentId) || !this.comments.hasById(childId)) {
      throw new Error('One of the comment does not exist anymore.');
    }

    const childObj = this.comments.getKeyById(childId);

    this.comments.getById(parentId).add(childObj);
  };

  sort = (): IComment[] => {
    const comments = CommentTree.sortComments(this.comments);

    // Create a map of each object's dependecies
    const dependencies = new Map();

    let predecessorId = comments[0]?.id;
    for (let i = 0; i < comments.length - 1; i++) {
      const isNextWithParentId = comments[i + 1].parentId;
      if (isNextWithParentId) {
        if (!dependencies.has(predecessorId)) {
          dependencies.set(predecessorId, []);
        }
        dependencies.get(predecessorId).push(comments[i + 1]);
      } else {
        predecessorId = comments[i + 1].id;
      }
    }

    let parentComments = comments.filter((c) => !c.parentId);

    parentComments = CommentTree.sortByDate(parentComments, 'asc');

    const result = [];

    for (const c of parentComments) {
      result.push(c);
      if (dependencies.has(c.id)) {
        const sortedChildren = CommentTree.sortByDate([...dependencies.get(c.id)], 'asc');
        result.push(...sortedChildren);
      }
    }

    return result;
  };

  static sortComments(comments: CommentMap): IComment[] {
    const visited = {};
    const result: IComment[] = [];

    const commentsCopy = CommentMap.deepCopy(comments);

    for (const comment of commentsCopy.keys()) {
      if (!visited[comment.id]) {
        CommentTree.dfs(comment, commentsCopy, visited, result);
      }
    }

    const orderedResult = [];
    const seen = new Set<string>();

    for (let i = result.length - 1; i >= 0; i--) {
      const comment = result[i];
      if (!seen.has(comment.id)) {
        orderedResult.push(comment);
        seen.add(comment.id);
      }
    }

    return orderedResult;
  }

  static sortByDate(comments: IComment[], order: Order) {
    //Sort build in method - Quick Sort has O(nlog(n)) Time Complexity
    comments.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());

    if (order === 'desc') {
      comments.reverse();
    }

    return comments;
  }

  static dfs(node: IComment, graph: CommentMap, visited: { [key: string]: boolean }, result: IComment[]) {
    visited[node.id] = true;
    const children = graph.getById(node.id) || [];

    if (children) {
      for (const child of children) {
        if (!visited[child.id]) {
          CommentTree.dfs(child, graph, visited, result);
        }
      }
    }

    result.push(node);
  }
}

const getObjectWithIdInReplySet = (set: Set<ReplySet>, id: string) => {
  for (const item of set) {
    if (item.replyId === id) {
      return item;
    }
  }
  return null;
};
