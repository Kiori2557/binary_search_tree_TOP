import { Tree } from "./binary_search_tree.js";

let arr = [];
generateRandomNumber(25, arr);
let mango = new Tree(arr);

function generateRandomNumber(count, arr) {
  for (let i = 0; i < count; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
}
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(mango.root);
