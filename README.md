# medots
List of notes and code base on what I learned from udemy "Understanding TypeScript - 2022 Edition".

## Why TypeScript
### Reason 1
Javascript only gives errors during runtime when the code executes in a browser which if we use TypeScript it will give us error checking on the compilation time before we run the code in the browser. When compiled TypeScript will generate a javascript file.
example:
```js
function add(num1, num2) {
    return num1 + num2;
}
console.log( add(5, 2.8) ); // result 7.8
```
there is no issue with the above example, but what if there is a certain case we accidentally assing wrong value type.
example:
```js
function add(num1, num2) {
    return num1 + num2;
}
console.log( add('5', 2.8) ); // result 52.8
```
this happens because we assign a string value to the function and since in the `add` function, we do `num1 + num2` javascript treated it as concatenation.
### Reason 2
TypeScript give us features that are not available in vanila Javascript.
## Core Types
there is only 3 types in TS:
- `number`: there is no differences for between int and float
- `string`: all text is valid, we can use `'(single quote)`, `"(double quote)` or ``(backtick / template literal)`
- `boolean`
to declare value in TypeScript we can use `let`, `var` and `const` e.g.
```ts
// considered OK if we just want to declare variable only then assign value later
let num: number;
num = 5;

// not necessary need to declare the type `: number`
let num: number = 5;

// best
let num = 5;
```
