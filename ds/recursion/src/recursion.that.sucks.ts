
function factorial(n: number): number {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

function fib(n: number): number {
    if (n <= 1) {
        return 1;
    }
    return fib(n - 1) + fib(n - 2);
}

