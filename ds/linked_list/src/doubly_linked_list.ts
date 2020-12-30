export interface IDoublyLinked<T> {
  enqueue(data: T): void; // O(1)
  dequeue(): T | null; // O(1)
  push(data: T): void; // O(1)
  pop(): T | null; // O(1)
  getAt(index: number): T | null; // O(n)
  insertAt(index: number, data: T): void; // O(n)
  removeAt(index: number): T | null; // O(n)
  size(): number;
}

export interface DataNodeDoublyLinked<T> {
  data: T;
  next: DataNodeDoublyLinked<T> | null;
  prev: DataNodeDoublyLinked<T> | null;
}

export class DoublyLinked<T> implements IDoublyLinked<T> {
  private _size: number;
  private head: DataNodeDoublyLinked<T> | null;
  private tail: DataNodeDoublyLinked<T> | null;

  constructor() {
    this._size = 0;
    this.head = this.tail = null;
  }

  private insertDataAtTheEnd(data: T): void {
    const node: DataNodeDoublyLinked<T> = {
      data,
      next: null,
      prev: this.tail,
    };

    if (this.tail === null) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = this.tail.next;
    }

    ++this._size;
  }
  private checkIndexForCorrectness(index: number): boolean {
    return !(
      index >= this._size ||
      index < 0 ||
      index === undefined ||
      index === null ||
      isNaN(Number(index))
    );
  }

  size(): number {
    return this._size;
  }

  enqueue(data: T): void {
    this.insertDataAtTheEnd(data);
  }

  dequeue(): T | null {
    if (this._size === 0) return null;

    const value = this.head.data;
    this.head = this.head.next;
    --this._size;

    if (this.head) {
      this.head.prev = null;
    }

    if (this._size === 0) {
      this.tail = null;
    }

    return value;
  }

  push(data: T): void {
    this.insertDataAtTheEnd(data);
  }

  pop(): T | null {
    if (this._size === 0) return null;

    const value = this.tail.data;
    this.tail = this.tail.prev;
    --this._size;

    if (this.tail) {
      this.tail.next = null;
    }

    if (this._size === 0) {
      this.head = null;
    }

    return value;
  }

  private getNodeByIndex(index: number): DataNodeDoublyLinked<T> {
    let node: DataNodeDoublyLinked<T>;
    if (index < this._size / 2) {
      node = this.head;
      for (let i = 0; i < index; i++) {
        node = node.next;
      }
    } else {
      node = this.tail;
      for (let i = this._size - 1; i > index; i--) {
        node = node.prev;
      }
    }
    return node;
  }

  getAt(index: number): T | null {
    if (!this.checkIndexForCorrectness(index)) return null;
    return this.getNodeByIndex(index).data;
  }

  removeAt(index: number): T | null {
    if (!this.checkIndexForCorrectness(index)) return null;
    const node = this.getNodeByIndex(index);

    if (node.next && node.prev) {
      node.next.prev = node.prev;
      node.prev.next = node.next;
    } else if (node.prev === null) {
      node.next.prev = node.prev;
      this.head = node.next;
    } else {
      node.prev.next = node.next;
      this.tail = node.prev;
    }

    --this._size;
    return node.data;
  }

  insertAt(index: number, data: T): void {
    if (!this.checkIndexForCorrectness(index)) return null;
    const node: DataNodeDoublyLinked<T> = {
      data,
      next: null,
      prev: null,
    };
    const nodeAtIndex = this.getNodeByIndex(index);
    node.prev = nodeAtIndex.prev;
    node.next = nodeAtIndex;
    if (nodeAtIndex.prev) {
      nodeAtIndex.prev.next = node;
    } else {
      this.head = node;
    }
    nodeAtIndex.prev = node;

    ++this._size;
  }
}
