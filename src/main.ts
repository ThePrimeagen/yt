
function foo(blaz: {oddly: "long" | "type", but: "hey" | "this" | "is" | number}) {
    // ...
}

function new_fn(bar: number) {
    // ...

    const data = {
        width: 100,
        height: 40,
        tags: true,
        content: "",
        style: {
            fg: #EEE
        }
    };
    const data = [];
    data[0] = "Foo";
    data[1] = "Bar";
    data[2] = "Baz";
    data[3] = "Buzz";

    const item = newItem({
        ...data
    });

    const item = newItem({
        ...data,
        height: 30,
    });

    const item = newItem({
        ...data,
        height: 30,
    });

}




























// copy line ftw
enum Serialize {
    Buffer,
    JSON,
}

class Foo {
    serialize(type: Serialize): Buffer | object {
        if (type === Serialize.Buffer) {
            return this.serializeBuffer();
        }
        return JSON.stringify(this);
    }
    private serializeBuffer(): Buffer {
}






















// 3. let
let foo = 5;
