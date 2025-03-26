class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  recursiveInsert(newNode, root) {
    if (newNode.val < root.val) {
      if (!root.left) root.left = newNode;
      else this.recursiveInsert(newNode, root.left);
    } else {
      if (!root.right) root.right = newNode;
      else this.recursiveInsert(newNode, root.right);
    }
  }

  insert(val) {
    const newNode = new Node(val);
    if (!this.root) this.root = newNode;
    else this.recursiveInsert(newNode, this.root);
  }

  print() {
    console.log(this.root);
  }
}

const tree = new Tree();

tree.insert(10);
tree.insert(5);
tree.insert(13);
tree.insert(11);
tree.insert(2);
tree.insert(16);
tree.print();
