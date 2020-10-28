export interface DataNode<T> {
    data: T;
    next: DataNode<T> | null;
    prev: DataNode<T> | null;
}

export interface IQueue<T> {
    enqueue(data: T): void;
    dequeue(): T | null;
    peek(): T | null;
    size(): number;
}

export interface IStack<T> {
    push(data: T): void;
    pop(): T | null;
    peek(): T | null;
    size(): number;
}

export interface IDoublyLinked<T> {
    enqueue(data: T): void; // O(1)
    dequeue(): T | null; // O(1)
    push(data: T): void; // O(1)
    pop(): T | null; // O(1)
    getAt(index: number): T; // O(n)
    insertAt(index: number, data: T): void; // O(n)
    removeAt(index: number): T; // O(n)
    size(): number;
}

export class DoublyLinked<T> implements IDoublyLinked<T> {
    private _size: number;
    private head: DataNode<T> | null;
    private tail: DataNode<T> | null;
    constructor() {
        this._size = 0;
        this.head = this.tail = null;
    }

    size(): number {
        return this._size;
    }

    enqueue(data: T): void {
        const node: DataNode<T> = {
            data,
            next: null,
            prev: null
        };

        if (this.head === null) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node.prev = this.tail.next;
        }

        ++this._size;
    }

    dequeue(): T | null {
        if (this._size == 0) {
            return null;
        }

        const item = this.head.data;
        this.head = this.head.next;

        if (this.head != null) {
            this.head.prev = null;
        }

        --this._size;

        if (!this._size) {
            this.tail = null;
        }

        return item;
    }

    push(data: T): void {
        const node: DataNode<T> = {
            data,
            next: null,
            prev: null
        };

        if (this.tail === null) {
            this.head = this.tail = node;
        } else {
            node.prev = this.tail;
            node.next = null;
            this.tail = node;
        }

        ++this._size;
    }

    pop(): T | null {
        if (this._size == 0) {
            return null;
        }

        const item = this.tail.data;
        this.tail = this.tail.next;
        this.tail.next = null;
        --this._size;

        return item;
    }

    getAt(index: number): T {
        return retrieveNode(index).data;
    }

    insertAt(index: number, data: T): void {
        const newNode: DataNode<T> = {
            data,
            next: null,
            prev: null
        };

        let node = retrieveNode(index);
        newNode.next = node.next;
        newNode.prev = node;
        node.next.prev = newNode;
        node.next = newNode;
    }

    removeAt(index: number): T {
        const node = retrieveNode(index);

        node.prev.next = node.next;
        node.next.prev = node.prev;

        return node.data;
    }

    private retrieveNode(index: number): DataNode {
        let node: DataNode;
        if (index < this.size / 2) {
            let n=0;
            node = this.head;
            while (n < index) {
                node = node.next;
                ++n;
            }
        } else {
            let n=0;
            node = this.tail;
            while (n > index) {
                node = node.prev;
                --n;
            }
        }

        return node;
    }
}

export class Queue<T> implements IQueue<T> {
    private _size: number;
    private head: DataNode<T> | null;
    private tail: DataNode<T> | null;
    constructor() {
        this._size = 0;
        this.head = this.tail = null;
    }

    size(): number {
        return this._size;
    }

    enqueue(data: T): void {
        const node: DataNode<T> = {
            data,
            next: null
        };

        if (this.head === null) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = this.tail.next;
        }

        ++this._size;
    }

    dequeue(): T | null {
        if (this._size == 0) {
            return null;
        }

        const item = this.head.data;
        this.head = this.head.next;
        --this._size;

        if (!this._size) {
            this.tail = null;
        }

        return item;
    }

    peek(): T | null {
        if (this._size == 0) {
            return null;
        }

        return this.head.data;
    }
}

export class Stack<T> implements IStack<T> {
    private _size: number;
    private tail: DataNode<T> | null;

    constructor() {
        this._size = 0;
        this.tail = null;
    }

    size(): number {
        return this._size;
    }

    push(data: T): void {
        const node: DataNode<T> = {
            data,
            next: null
        };

        if (this.tail === null) {
            this.tail = node;
        } else {
            node.next = this.tail;
            this.tail = node;
        }

        ++this._size;
    }

    pop(): T | null {
        if (this._size == 0) {
            return null;
        }

        const item = this.tail.data;
        this.tail = this.tail.next;
        --this._size;

        return item;
    }

    peek(): T | null {
        if (this._size == 0) {
            return null;
        }

        return this.tail.data;
    }
}
