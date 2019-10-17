function Node(data) {
  this.data = data;
  this.next = null;
}

function SLinkedList() {
  let length = 0;
  let head = null;

  function publicAdd(value) {
    var node = new Node(value),
      currentNode = head;

    if (!currentNode) {
      head = node;
      length++;
      return node;
    }

    while (currentNode.next) {
      currentNode = currentNode.next;
    }

    currentNode.next = node;
    length++;
    return node;
  }

  function publicSearch(position) {
    var currentNode = head,
      length = length,
      count = 0,
      message = { failure: "Node does not exist" };

    if (length === 0 || position > length - 1) {
      throw new Error(message.failure);
    }

    while (count < position) {
      currentNode = currentNode.next;
      count++;
    }

    return currentNode;
  }

  function publicRemoveNode(position) {
    var currentNode = head,
      count = 0,
      message = { failure: "Node does not exist" },
      beforeNodeToDelete = null,
      nodeToDelete = null,
      deletedNode = null;

    if (position < 0 || position >= length) {
      throw new Error(message.failure);
    }

    if (position == 0) {
      head = currentNode.next;
      deletedNode = currentNode;
      currentNode = null;
      length--;
      return deletedNode;
    }

    while (count < position) {
      beforeNodeToDelete = currentNode;
      nodeToDelete = currentNode.next;
      currentNode = currentNode.next;
      count++;
    }
    deletedNode = nodeToDelete;
    beforeNodeToDelete.next = deletedNode.next;
    length--;

    return deletedNode;
  }

  function publicRemoveValue(value) {
    var currentNode = head,
      message = { failure: "Node does not exist" },
      beforeNodeToDelete = null,
      nodeToDelete = null;

    if (length == 0) throw new Error(message.failure);

    if (currentNode.data == value) {
      nodeToDelete = currentNode;
      head = nodeToDelete.next;
      length--;
      return nodeToDelete;
    }

    while (currentNode) {
      beforeNodeToDelete = currentNode;
      nodeToDelete = currentNode.next;
      if (!nodeToDelete) throw new Error(message.failure);
      if (nodeToDelete.data == value) {
        beforeNodeToDelete.next = nodeToDelete.next;
        length--;

        return nodeToDelete;
      }
      currentNode = currentNode.next;
    }

    throw new Error(message.failure);
  }

  return {
    getLength: () => length,
    getHead: () => head,
    add: publicAdd,
    searchNodeAt: publicSearch,
    removeNode: publicRemoveNode,
    removeValue: publicRemoveValue
  };
}
