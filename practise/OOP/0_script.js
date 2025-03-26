class Node {
  // each node has ref to prev and next el and is called Node cause in some way remeber a tree with nodes
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(val) {
    const newNode = new Node(val);

    // in case or empty list just add item like in simple arr
    if (!this.length) {
      this.head = this.tail = newNode;
    } else {
      // if list is no empty last el will have a next ref casue is no more last,
      //    last el added now have the one in front of him
      // at the end tail is the el added
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.length++;
    //  this in obj scope return instance itself
    return this;
  }

  prepend(val) {
    const newNode = new Node(val);

    if (!this.length) {
      this.head = this.tail = newNode;
    } else {
      //  val will have ref to firt el that will become second
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }

    this.length++;
    return this;
  }

  shit() {
    //  or dequeue if preferred as name
    if (!this.head) return null;
    const removedHead = this.head;
    if (this.head.val === this.tail.val) {
      this.head = this.tail = null;
      return removedHead;
    }

    this.head = this.head.next;
    if (this.head) this.head.prev = null;

    this.length--;
    console.log("removed head ", removedHead);
    return removedHead;
  }

  pop() {
    // or enqueue if feel more natural
    if (!this.tail) return null;
    const removedTail = this.tail;

    if (this.tail.val === this.head.val) {
      this.head = this.tail = null;
      return removedTail;
    }

    this.tail = this.tail.prev;
    if (this.tail) this.tail.next = null;

    this.length--;
    console.log("removed tail", removedTail);
    return removedTail;
  }

  deleteOne(val) {
    if (!this.length) return null;

    let curr = this.head;

    if (val === this.head.val) {
      this.head = curr.next;
      //   if exist by any chance another el i delete prev cause head does not have prev
      if (this.head) this.head.prev = null;

      this.length--;
      console.log("removed from head ", curr);
      return curr;
    }
    if (val === this.tail.val) {
      curr = this.tail;
      this.tail = this.tail.prev;
      // as for head here is diff cause last el does not have next
      if (this.tail) this.tail.next = null;

      this.length--;
      console.log("removed from tail ", curr);
      return curr;
    }
    //  we prevent start loong loop checking before head and tail, now we have no options out of checking middle list

    //  switch next el as long as is truthy and we not find yet val
    while (curr && curr.val !== val) {
      curr = curr.next;
    }
    //  we did not fin any val
    if (!curr) return null;

    // we find it now need to switch,
    // el before use will have ref not to use but next el after us
    curr.prev.next = curr.next;
    // el after us will not have no more ref to us
    //  but to el before us
    curr.next.prev = curr.prev;

    this.length--;
    console.log("removed from middle", curr);
    return curr;
  }

  print() {
    let curr = this.head;
    const nodes = [];

    while (curr) {
      nodes.push(curr.val);
      curr = curr.next;
    }

    console.log(nodes.join(" => "));
  }

  log() {
    let curr = this.head;
    const nodes = [];

    while (curr) {
      nodes.push({
        val: curr.val,
        prev: curr.prev?.val,
        next: curr.next?.val,
      });
      curr = curr.next;
    }

    console.log(nodes);
  }

  getHead() {
    console.log("HEAD ", this.head);
    return this.head;
  }
  getTail() {
    console.log("TAIL ", this.tail);
    return this.tail;
  }
}

const linkedList = new LinkedList();

linkedList.append("GTA san andreas");
linkedList.append("GTA 4");
linkedList.append("GTA 5");
linkedList.log();
// linkedList.prepend("GTA 3");
// linkedList.prepend("GTA 2");
// linkedList.prepend("GTA");
// linkedList.getHead();
// linkedList.getTail();
// linkedList.deleteOne("GTA 4");
// linkedList.append("RED DEAD REDEMPTION");
// linkedList.prepend("Cyberphunk 2077");
// linkedList.getHead();
// linkedList.getTail();
// linkedList.deleteOne("Cyberphunk 2077");
// linkedList.deleteOne("Cyberphunk 2077");
// linkedList.deleteOne("GTA san andreas");
// linkedList.deleteOne("GTA 5");
// linkedList.deleteOne("GTA san andreas");
// linkedList.shit();
linkedList.pop();
linkedList.pop();
linkedList.log();
