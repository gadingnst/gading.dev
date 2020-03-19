const withMemoize = fn => {
    const results = {}
    return (...args) => {
        const argsKey = JSON.stringify(args)
        return !results[argsKey]
            ? results[argsKey] = fn(...args)
            : results[argsKey]
    }
}

const fibonacci = num => num <= 1
    ? 1
    : fibonacci(num - 1) + fibonacci(num - 2)

console.time('tes')
console.log(fibonacci(40))
console.timeEnd('tes')
