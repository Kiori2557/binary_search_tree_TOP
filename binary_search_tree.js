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
  #traverseTree(value) {
    let nodeObj = { parent: null, pointerNode: null };
    let pointer = this.root;
    while (pointer && value !== pointer.data) {
      nodeObj.parent = pointer;
      pointer = value < pointer.data ? pointer.left : pointer.right;
      nodeObj.pointerNode = pointer;
    }
    return nodeObj;
  }
  #isLeafNode(node) {
    if (node.left === null && node.right === null) return true;
    else return false;
  }
  #assignNode(parentNode, pointerNode, newNode) {
    if (pointerNode.data < parentNode.data) parentNode.left = newNode;
    else parentNode.right = newNode;
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
  find(value) {
    let nodeObj = this.#traverseTree(value);
    return nodeObj.pointerNode;
  }
  deleteItem(value) {
    let { parent, pointerNode } = this.#traverseTree(value);
    if (pointerNode) {
      //in case the node have no child
      if (this.#isLeafNode(pointerNode)) {
        this.#assignNode(parent, pointerNode, null); //delete the node by setting it to null
      } else {
        //in case the node have 2 child
        if (pointerNode.left && pointerNode.right) {
          let tmpNode = pointerNode.right;
          while (tmpNode.left !== null) tmpNode = tmpNode.left;
          this.deleteItem(tmpNode.data);
          tmpNode.left = pointerNode.left;
          this.#assignNode(parent, pointerNode, tmpNode);
        } //in case the node only 1 child
        else if (pointerNode.left) {
          this.#assignNode(parent, pointerNode, pointerNode.left);
        } else if (pointerNode.right) {
          this.#assignNode(parent, pointerNode, pointerNode.right);
        }
      }
    }
  }
  levelOrder(callback) {
    if (!callback)
      throw new Error("call back function is required as parameter");
    let pointerNode = this.root;
    let queue = [];
    queue.push(pointerNode);
    while (queue.length !== 0) {
      if (pointerNode.left) queue.push(pointerNode.left);
      if (pointerNode.right) queue.push(pointerNode.right);
      queue.shift();
      callback(pointerNode);
      pointerNode = queue[0];
    }
  }
}
