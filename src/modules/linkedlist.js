import { Node } from "./node.js";

export class LinkedList {
  constructor() {
    this.head = null;
  }

  prepend(value) {
    this.head = new Node(value, this.head);
  }

  append(value) {
    //Handles empty list
    if (!this.head) {
      this.head = new Node(value);
      return;
    }

    let temp = this.head;
    //Traverses list
    while (temp.nextNode) {
      temp = temp.nextNode;
    }

    temp.nextNode = new Node(value);
  }

  size() {
    if (!this.head) {
      return 0;
    }

    let temp = this.head;
    let counter = 0;

    //Counts every node in the list
    while (temp) {
      counter++;
      temp = temp.nextNode;
    }

    return counter;
  }

  head() {
    if (!this.head) {
      return;
    }

    return this.head.value;
  }

  tail() {
    if (!this.head) {
      return;
    }

    let temp = this.head;
    //Traverses list
    while (temp.nextNode) {
      temp = temp.nextNode;
    }

    return temp.value;
  }

  at(index) {
    if (index < 0) {
      return;
    }

    let temp = this.head;
    //Traverses list until it reaches index
    for (let i = 0; i < index && temp; i++) {
      temp = temp.nextNode;
    }

    return temp ? temp.value : undefined;
  }

  pop() {
    if (!this.head) {
      return;
    }

    const removed = this.head.value;
    this.head = this.head.nextNode;

    return removed;
  }

  contains(value) {
    let temp = this.head;
    //Traverses list
    while (temp && temp.value !== value) {
      temp = temp.nextNode;
    }

    if (temp) {
      return true;
    }
    return false;
  }

  findIndex(value) {
    let temp = this.head;
    let index = 0;
    //Traverses list
    while (temp && temp.value !== value) {
      index++;
      temp = temp.nextNode;
    }

    if (temp) {
      return index;
    }
    return -1;
  }

  removeAt(index) {
    if (index < 0) {
      throw new RangeError("Enter a number greater than 0.");
    }
    if (!this.head) {
      throw new RangeError("Index is out of range.");
    }
    //Handle removing head node
    if (index === 0) {
      this.head = this.head.nextNode;
      return;
    }

    let current = this.head;
    let previous = null;
    //Traverses list until it reaches index
    for (let i = 0; i < index; i++) {
      previous = current;
      current = current.nextNode;
    }

    if (!current) {
      throw new RangeError("Index is out of range");
    }

    previous.newNode = current.newNode;
  }

  insertAt(index, ...values) {
    //Calculate current list size
    let size = 0;
    let temp = this.head;
    while (temp) {
      size++;
      temp = temp.nextNode;
    }

    if (index < 0 || index > size) {
      throw new RangeError("Index out of bounds.");
    }

    if (values.length === 0) {
      return;
    }

    //Chain values together into sub-list
    let newHead = new Node(values[0]);
    let newTail = newHead;
    for (let i = 1; i < values.length; i++) {
      newTail.nextNode = new Node(values[i]);
      newTail = newTail.nextNode;
    }

    //Insert sub-list into main list
    if (index === 0) {
      //Insert from begining of the list
      newTail.nextNode = this.head;
      this.head = newHead;
    } else {
      //Traverse list to the node before insertion index
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        current = current.nextNode;
      }

      //Link main and sub-list together
      newTail.nextNode = current.nextNode;
      current.nextNode = newHead;
    }
  }

  toString() {
    if (!this.head) {
      return "";
    }

    let result = "";
    let temp = this.head;
    //Traverse list
    while (temp) {
      result += `( ${temp.value} ) -> `;
      temp = temp.nextNode;
    }

    result += "null";
    return result;
  }
}
