export interface DataNode<T> {
    data: T;
    previous: DataNode<T> | null;
    next: DataNode<T> | null;
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

    enqueue(data: T): void {
        const node: DataNode<T> = {
            data,
            previous: null,
            next: null,
        }
        if (this._size === 0) {
            this.head = this.tail = node;
            return;
        } else {
            this.tail.next = node;
            node.previous = this.tail;
            this.tail = this.tail.next;
        }
        ++this._size;
    }

    dequeue(): T | null {
        if (this._size === 0) {
            return null;
        }
        // if (this._size === 1) {
        //     const item = this.head.data;
        //     this.head = this.tail = null;
        //     this._size = 0;
        //     return item;
        // }
        const item = this.head.data;
        this.head = this.head.next;
        this.head.previous = null;
        --this._size;

        if (this._size === 0) {
            this.tail = null;
        }

        return item;
    }

    push(data: T): void {
        const node: DataNode<T> = {
            data,
            previous: null,
            next: null
        };
        if (this._size === 0) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;
            node.previous = this.tail;
            this.tail = this.tail.next;
        }
        ++this._size;
    }

    pop(): T | null {
        if (this._size === 0) {
            return null;
        }
        // if (this._size === 1) {
        //     const item = this.head.data;
        //     this.head = this.tail = null;
        //     this._size = 0;
        //     return item;
        // }
        const item = this.tail.data;
        this.tail = this.tail.previous;
        this.tail.next = null;
        --this._size;

        if (this._size === 0) {
            this.head = this.tail = null;
        }
        return item;
    }

    getAt(index: number): T | null {
        // We start index at 0
        if (index - 1 > this._size) {
            return null;
        }

        let node;
        if (index - 1 < this._size - index - 1) {
            node = this.head;
            let i = 0;
            while (i < index) {
                node = node.next;
                i++;
            }
        } else {
            node = this.tail;
            let i = this._size;
            while (i + 1 > index) {
                node = node.previous;
                i--;
            }
        }
        return node.data;
    }

    insertAt(index: number, data: T): void {
        if (index - 1 > this._size) {
            return null;
        }

        const newNode: DataNode<T> = {
            data,
            previous: null,
            next: null
        }
        let node;
        if (index - 1 < this._size - index - 1) {
            node = this.head;
            let i = 0;
            while (i < index) {
                node = node.next;
                i++;
            }
        } else {
            node = this.tail;
            let i = this._size;
            while (i + 1 > index) {
                node = node.previous;
                i--;
            }
        }
        newNode.previous = node.previous;
        node.previous.next = newNode;
        newNode.next = node;
        ++this._size;
    }

    removeAt(index: number): T {
        if (index - 1 > this._size) {
            return null;
        }

        let node;
        if (index - 1 < this._size - index - 1) {
            node = this.head;
            let i = 0;
            while (i < index) {
                node = node.next;
                i++;
            }
        } else {
            node = this.tail;
            let i = this._size;
            while (i + 1 > index) {
                node = node.previous;
                i--;
            }
        }
        const item = node;
        node.previous.next = item.next;
        node.next.previous = item.previous;
        --this._size;

        return item.data;
    }

    size() {
        return this._size;
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
            previous: null,
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
            previous: null,
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
