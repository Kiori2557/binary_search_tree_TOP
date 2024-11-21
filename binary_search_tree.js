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
    let nodeObj = { parent: null, pointerNode: null, depth: 0 };
    let pointer = this.root;
    while (pointer && value !== pointer.data) {
      nodeObj.parent = pointer;
      nodeObj.depth++;
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

  insert(value, pointer = this.root) {
    this.rebalance();

    if (pointer === null) {
      pointer = new Node(value);
    }

    if (value < pointer.data) {
      pointer.left = this.insert(value, pointer.left);
    } else if (value > pointer.data) {
      pointer.right = this.insert(value, pointer.right);
    }

    return pointer;
  }

  find(value) {
    let nodeObj = this.#traverseTree(value);
    return nodeObj.pointerNode;
  }

  deleteItem(value) {
    this.rebalance();
    let { parent, pointerNode } = this.#traverseTree(value);
    let tmpNode = null;
    if (pointerNode) {
      //in case the node have no child
      if (this.#isLeafNode(pointerNode)) {
        //delete the node by setting it to null
        tmpNode = null;
      } else {
        //in case the node have 2 child
        if (pointerNode.left && pointerNode.right) {
          tmpNode = pointerNode.right;
          while (tmpNode.left !== null) tmpNode = tmpNode.left;
          this.deleteItem(tmpNode.data);
          tmpNode.left = pointerNode.left;
        } //in case the node only 1 child
        else if (pointerNode.left) {
          tmpNode = pointerNode.left;
        } else if (pointerNode.right) {
          tmpNode = pointerNode.right;
        }
      }
    }
    this.#assignNode(parent, pointerNode, tmpNode);
  }

  levelOrder(callback, pointerNode = this.root) {
    if (!callback)
      throw new Error("call back function is required as parameter");
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

  preOrder(callback, pointerNode = this.root) {
    if (pointerNode === null) return;
    if (!callback)
      throw new Error("call back function is required as parameter");
    callback(pointerNode);
    this.preOrder(callback, pointerNode.left);
    this.preOrder(callback, pointerNode.right);
  }

  inOrder(callback, pointerNode = this.root) {
    if (pointerNode === null) return;
    if (!callback)
      throw new Error("call back function is required as parameter");
    this.inOrder(callback, pointerNode.left);
    callback(pointerNode);
    this.inOrder(callback, pointerNode.right);
  }

  postOrder(callback, pointerNode = this.root) {
    if (pointerNode === null) return;
    if (!callback)
      throw new Error("call back function is required as parameter");
    this.postOrder(callback, pointerNode.left);
    this.postOrder(callback, pointerNode.right);
    callback(pointerNode);
  }

  getDepth(node) {
    return this.#traverseTree(node).depth;
  }

  height(node, root = this.root) {
    let nodeDepth = this.getDepth(node);
    let treeDepth = 0;
    this.levelOrder((node) => {
      if (this.#isLeafNode(node) && this.getDepth(node.data) > treeDepth) {
        treeDepth = this.getDepth(node.data);
      }
      return treeDepth;
    }, root);
    return treeDepth - nodeDepth;
  }

  isBalanced() {
    let leftSubTreeHeight = this.height(this.root.left.data, this.root.left);
    let rightSubTreeHeight = this.height(this.root.right.data, this.root.right);
    let dif = Math.abs(leftSubTreeHeight - rightSubTreeHeight);
    return dif < 2 ? true : false;
  }

  rebalance() {
    if (!this.isBalanced()) {
      let array = [];
      this.inOrder((node) => {
        array.push(node.data);
      });
      this.root = this.#buildTree(array, 0, array.length - 1);
    }
  }
}
