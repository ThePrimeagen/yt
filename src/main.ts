
function thing(cb: (arg: number) => void): ({foo, bar}: {foo: number, bar: number}, arg: number) => void {
    return ({foo, bar}: {foo: number, bar: number}, arg: number) => {};
}

function foo() {
    if (true) {
        return true
    }
    return false
}
