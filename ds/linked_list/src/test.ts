import { DoublyLinked } from "./linked";

const doubly = new DoublyLinked();

// Enqueue - Dequeue
console.log("===== Enqueue - Dequeue ======")
console.log("==============================")
console.log(doubly.size(), "size should be 0")
doubly.enqueue(1)
console.log(doubly.size(), "size should be 1")
const item = doubly.dequeue()
console.log(item, "item1 should be 1")
console.log(doubly.size(), "size should be 0")

for (let i = 0; i < 10; i++) {
  doubly.enqueue(i)
}
console.log(doubly.size(), "size should be 10")

for (let i = 0; i < 10; i++) {
  doubly.dequeue()
}
console.log(doubly.size(), "size should be 0")


// Push - Pop
console.log("===== Push - Pop ======")
console.log("=======================")
doubly.push(1)
console.log(doubly.size(), "size should be 1")
const item2 = doubly.pop();
console.log(item2, "item2 should be 1")
console.log(doubly.size(), "size should be 0")

for (let i = 0; i < 10; i++) {
  doubly.push(i)
}
console.log(doubly.size(), "size should be 10")

for (let i = 0; i < 10; i++) {
  doubly.pop()
}
console.log(doubly.size(), "size should be 0")

// GetAt - InsertAt - RemoveAt
console.log("===== GetAt - InsertAt - RemoveAt ======")
console.log("========================================")
console.log("===== GetAt ======")
console.log("==================")
for (let i = 0; i < 100; i++) {
  doubly.push(i)
}
console.log(doubly.getAt(150), "should be null")
console.log(doubly.size(), "size should be 100")
console.log(doubly.getAt(1), "should be 0")
console.log(doubly.getAt(5), "should be 5")
console.log(doubly.getAt(15), "should be 15")
console.log(doubly.getAt(50), "should be 50")
console.log(doubly.getAt(100), "should be 99")

console.log("===== InserAt ======")
console.log("====================")
console.log(doubly.insertAt(150, "inserting"), "should be null")
doubly.insertAt(5, "inserting")
console.log(doubly.getAt(5), "should be inserting")
console.log(doubly.getAt(4), "should be 4")
console.log(doubly.getAt(6), "should be 5")

console.log("===== RemoveAt ======")
console.log("=====================")
console.log(doubly.removeAt(150), "should be null")
const item3 = doubly.removeAt(5);
console.log(item3, "item3 should be inserting")
console.log(doubly.getAt(5), "should be 5")
console.log(doubly.getAt(4), "should be 4")
console.log(doubly.getAt(6), "should be 6")