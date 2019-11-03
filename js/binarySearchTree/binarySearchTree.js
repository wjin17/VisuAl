function Node(data) {
  this.data = data;
  this.left = null;
  this.right = null;
}

function BinarySearchTree() {
  let root = null;

  function publicAdd(val) {
    let node = new Node(val),
      currentNode = root;

    while (currentNode) {
      console.log(currentNode);
      if (currentNode.data > val) {
        if (currentNode.left) {
          currentNode = currentNode.left;
        }
      } else {
        if (currentNode.right) {
          currentNode = currentNode.right;
        }
      }
    }

    console.log("adding node", currentNode, node);

    currentNode = node;
    return node;
  }

  return {
    root: () => root,
    add: publicAdd
  };
}
