
class Foo2 {
    private myItem: number;
    constructor(a: number, b: number) {
        this.myItem = a * b;
    }

    get myNumber() {
        return this.myItem;
    }
}

type Props = {
    prop1: boolean,
    prop2: string,
    prop3: number,
    prop420: number,
    prop1337: Foo2
};

const props: Props = {
    prop1: true,
    prop2: "its a string",
    prop3: 0xBabeCafe,
    prop420: 69,
    prop1337: new Foo2(6, 9),
};

function spread(prop: Props): Props {
    return {...prop};
}

const temporaryMemory: Props[] = [];

setInterval(() => {
    temporaryMemory.length = 0;
}, 2500);

const count = +process.argv[2] || 1000;
const rate = +process.argv[3] || 100;

function run() {
    for (let i = 0; i < count; ++i) {
        temporaryMemory.push(spread(props));
    }
    setTimeout(run, rate);
}

setTimeout(run, rate);








