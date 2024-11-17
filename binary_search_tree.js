import { orderArray } from "./mergeSort.js";
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
export class Tree {
  constructor(array) {
    array = orderArray(array);
    this.root = this.#buildTree(array, 0, array.length - 1);
  }
  #buildTree(array, start, end) {
    if (start > end) return null;
    let mid = Math.floor((start + end) / 2);
    let tmp = new Node(array[mid]);
    tmp.left = this.#buildTree(array, start, mid - 1);
    tmp.right = this.#buildTree(array, mid + 1, end);
    return tmp;
  }
  insert(value) {
    let pointer = this.root;
    while (value < pointer.data || value > pointer.data) {
      if (value < pointer.data) {
        if (!pointer.left) {
          return (pointer.left = new Node(value));
        }
        pointer = pointer.left;
      } else if (value > pointer.data) {
        if (!pointer.right) {
          return (pointer.right = new Node(value));
        }
        pointer = pointer.right;
      }
    }
  }
}
