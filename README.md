List of notes and code base on what I learned from udemy "Understanding Typescript - 2022 Edition".

## Why Typescript

### Reason 1

JavaScript only gives errors during runtime when the code executes in a browser which if we use TypeScript it will give us error checking on the compilation time before we run the code in the browser. When compiled TypeScript will generate a JavaScript file. example:

```typescript
function add(num1, num2) {
    return num1 + num2;
}
console.log( add(5, 2.8) ); // result 7.8
```

there is no issue with the above example, but what if there is a certain case we accidentally assign wrong value type. example:

```typescript
function add(num1, num2) {
    return num1 + num2;
}
console.log( add('5', 2.8) ); // result 52.8
```

this happens because we assign a string value to the function and since in the `add` function, we do `num1 + num2` JavaScript treated it as concatenation.

### Reason 2

TypeScript give us features that are not available in vanilla JavaScript.

## Core Types

there is only 3 types in TS:

- `number`: there is no differences for between int and float
- `string`: all text is valid, we can use `'(single quote)`, `"(double quote)` or ``(backtick / template literal)`
- `boolean` to declare value in TypeScript we can use `let`, `var` and `const` same like in JavaScript e.g.

```typescript
// considered OK if we just want to declare variable only then assign value later
let num: number;
num = 5;

// not necessary need to declare the type `: number`
let num: number = 5;

// best
let num = 5;
```

- `object` : basically all object in JavaScript is also a valid object for typescript but in typescript there is "object types" that we need to specific define the object property type so type script can inferred automatically.

```typescript
/* below is just a normal javascript object.
 * it still ok but typescript cannot inferred the object automatially
 * because we don't define the object properties types 
 */
const person = {
    name: "Hery",
    age: 30  
};

/* this is valid for typescipt but with this approach 
 * the typescript cannot giving the object properties autocompletion
 */
const person: object = {
    name: "Hery",
    age: 30  
}

// Good
const person {
    name: string;
    age: number;
} = {
    name: "Hery",
    age: 30
};
console.log(person.name); 
// on IDE when we type person.(dot) the IDE will giving property suggestion
```

- Nested Objects & Types: same like javascript, in typescript it also support for nested object

```typescript
// Javascript object
const product = {
    id: "abc1",
    price: 12.99,
    tags: ['greate-offer', 'hot-and-new'],
    details: {
        title: "Red Carpet",
        description: "A greate carpet - almost brand new!"
    }
}


// in Typescript we can define the type for object above like below
{
    id: string;
    price: number;
    tags: string[];
    details: {
        title: string;
        description: string;
    }
}
```

- `array`: type can be flexible or strict regarding the element types

```typescript
/* declare variable, this mean the array of string.
 * so only string value that can be assign to this array
 */
let hobbies: string[];

// declare and assign value
let hobbies = ['sport', 'gaming']; // will detected as array of string

// example for print
for (const hobby of hobbies) {
    console.log(hobby);
}
```

- `tuples` : type of array that have fixed length and data type base on what we defined (warning: typescript cannot catch error when using `push` )

```typescript
// here we define roles as tuples with length of 2 and only can receive
// number type for 1st element and string type for 2nd element
let roles: [number, string];
roles = [2, 'author']


// WARNING
// as we defined above the "roles" can only receive 2 element of data
// but need to aware that if we use array "push" typescript cannot catch
// this error
let roles: [number, string];
roles = [2, "author"];
roles.push("admin"); // this consider as valid due to typescript limitation
```

- `enum` : when we need human readable label we can use this type, usually we will declare `const` to hold the number / string that we used as label but we can eliminate it using enum

```typescript
// here we define Role as type enum
// below enum means ADMIN receive number 0, AUTHOR receive number 1
enum Role {ADMIN, AUTHOR};

console.log(Role.ADMIN); // result: 0
console.log(Role.AUTHOR); // result: 1

// we also can define specific number to the enum element
enum Status {DELETED = -1, ACTIVE = 1, DRAFT = 2}

console.log(Status.DELETED); // result: -1

// this also valid enum
enum Action {POST = 1, GET = 'get', PUT = 2}
```

- `any` : basically will except any type, better avoid this type because this againts the purpose of us using the typescript

```typescript
let a: any;
a = "here"; // valid
a = 1; // also valid

let b: any[];
b = 1; // invalid because we only receive array of any
b = [1, "lorem"]; // valid
```

- Union Type : when we need a function, const or variable to except multiple type we can use union type using `|` (pipe) for declare the variable can except 2 or more types
```typescript
function combine(input1: number | string, input2: number | string) {
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        result = input1 + input2;
    }else {
        result = input1.toString() + input2.toString();
    }

    return result;
}

let combineAges = combine(10,20);
console.log(combineAges); //output: 30

let combineName = combine('Hery', 'Sehastian');
console.log(combineName); //output: Hery Sehastian
```

