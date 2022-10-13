const style = +process.argv[2] || 0;
const count = +process.argv[3] || 1000;
const propCount = +process.argv[4] || 5;

class Foo2 {
    constructor(a, b) {
        if (a instanceof Foo2) {
            this.myItem = a.myNumber * b % 42069;
        } else {
            this.myItem = a * b;
        }
    }

    get myNumber() {
        return this.myItem;
    }
}

function objProp5() {
    return {
        prop1: true,
        prop2: "its a string",
        prop3: 0xBabeCafe,
        prop420: 69,
        prop1337: new Foo2(6, 9),
    };
}

function objProp10() {
    return {
        prop1: true,
        prop2: "its a string",
        prop3: 0xBabeCafe,
        prop420: 69,
        prop1337: new Foo2(6, 9),
        prop69420: ["an", "array"],
        prop694202: [0xC0FFEE],
        prop6942024: {bad: "item here"},
        prop69420249: 8080,
        prop694202496: NaN,
    };
}

class Prop5 {
    constructor() {
        this.prop1 = true;
        this.prop2 = "its a string";
        this.prop3 = 0xBabeCafe;
        this.prop420 = 69;
        this.prop1337 = new Foo2(6, 9);
    }

    from(prop) {
        this.prop1 = prop.prop1;
        this.prop2 = prop.prop2;
        this.prop3 = prop.prop3;
        this.prop420 = prop.prop420;
        this.prop1337 = prop.prop1337;
    }
}

class Prop10 {
    constructor() {
        this.prop1 = true;
        this.prop2 = "its a string";
        this.prop3 = 0xBabeCafe;
        this.prop69 = 420;
        this.prop420 = 69;
        this.prop1337 = new Foo2(6, 9);
        this.prop69420 = ["an", "array"];
        this.prop694202 = [0xC0FFEE];
        this.prop6942024 = {bad: "item here"};
        this.prop69420249 = 8080;
        this.prop694202496 = NaN;
    }

    from(prop) {
        this.prop1 = prop.prop1;
        this.prop2 = prop.prop2;
        this.prop3 = prop.prop3;
        this.prop69 = prop.prop69;
        this.prop420 = prop.prop420;
        this.prop1337 = prop.prop1337;
        this.prop69420 = prop.prop69420;
        this.prop694202 = prop.prop694202;
        this.prop6942024 = prop.prop6942024;
        this.prop69420249 = prop.prop69420249;
        this.prop694202496 = prop.prop694202496;
    }
}


class ObjectStore {
    constructor(factory) {
        this.factory = factory;
        this.pool = new Array;
        this.len = 0;
    }

    get() {
        if (this.len > 0) {
            const out = this.pool[this.len - 1]
            this.len--;
            return out;
        }
        return this.factory();
    }

    releaseBulk(items) {
        for (let j = 0; j < items.length; ++this.len, ++j) {
            this.pool[this.len] = items[j];
        }
    }
}


function createProp5() {
    return new Prop5();
}

function createProp10() {
    return new Prop10();
}

const store = propCount === 10 ?
    new ObjectStore(style === 0 ? objProp10 : createProp10) :
    new ObjectStore(style === 0 ? objProp5 : createProp5);

function copyViaSomething(prop) {
    if (style === 0) {
        return {...prop};
    }
    const nextProp = store.get();
    nextProp.from(prop);

    return nextProp;
}

const temporaryMemory = [];

function result() {
    const now = Date.now();
    console.log("Results", now - start, totalCount, totalCount / (now - start));
    process.exit();
};

let collectCount = 0;
function collect() {
    if (style === 1) {
        store.releaseBulk(temporaryMemory);
    }
    temporaryMemory.length = 0;
    if (collectCount++ === count) {
        result();
        process.exit();
    }
}

let totalCount = 0;
let start = Date.now();
function run() {
    const howMuch = 100;
    const props = propCount === 5 ? createProp5() : createProp10();
    let collectTime = Date.now() + howMuch;

    while (true) {
        for (let i = 0; i < howMuch; ++i) {
            temporaryMemory.push(copyViaSomething(props));
        }
        totalCount += howMuch;
        if (collectTime < Date.now()) {
            collectTime += howMuch;
            collect();
        }
    }
}

run();

// sufyaan khateeb 40%
//
// If its faster than that, we ban him
// If he is right, i'll donate $100 to neovim
