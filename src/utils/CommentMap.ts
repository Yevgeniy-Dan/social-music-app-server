import { cloneDeep } from 'lodash';
import { IComment } from './comment-tree';

class CommentMap extends Map<IComment, Set<IComment>> {
  hashMap: Map<IComment, Set<IComment>>;

  constructor() {
    super();
    this.hashMap = new Map();
  }

  set(key: IComment, value: Set<IComment>) {
    // const keyHash = JSON.stringify(key);

    // super.set(keyHash, value);

    super.set(key, value);
    this.hashMap.set(key, value);
    return this;
  }

  //   get(key) {
  //     const keyHash = JSON.stringify(key);
  //     return super.get(keyHash);
  //   }

  getById(id: string): Set<IComment> | null {
    for (const [key, value] of this.hashMap) {
      if (key.id === id) {
        return value;
      }
    }
    return null;
  }

  getKeyById(id: string): IComment {
    for (const [key] of this.hashMap) {
      if (key.id === id) {
        return key;
      }
    }
    return null;
  }

  //   has(key) {
  //     const keyHash = JSON.stringify(key);
  //     return super.has(keyHash);
  //   }

  hasById(id: string) {
    for (const key of this.hashMap.keys()) {
      if (key.id === id) {
        return true;
      }
    }
    return false;
  }

  deleteById(id: string): void {
    for (const key of this.hashMap.keys()) {
      if (key.id === id) {
        // const value = super.get(key)
        super.delete(key);
        this.hashMap.delete(key);
        // return value
      }
    }
  }

  forEach(callback: (value: Set<IComment>, key: IComment, map: Map<IComment, Set<IComment>>) => void, thisArgs?: any) {
    this.hashMap.forEach((key, value) => {
      callback.call(thisArgs, value, key);
    });
  }

  static deepCopy(comments: CommentMap) {
    const newMap = new CommentMap();
    for (const [key, value] of comments) {
      const newKey = cloneDeep(key);
      const newValue = new Set([...value]);
      newMap.set(newKey, newValue);
    }

    return newMap;
  }
}

export default CommentMap;
