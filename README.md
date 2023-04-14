# List of notes and code based on what I learned from udemy "Understanding Typescript - 2022 Edition"

## Why Typescript

### Reason 1

JavaScript only gives errors during runtime when the code executes in a browser which if we use TypeScript it will give us error checking on the compilation time before we run the code in the browser. When compiled TypeScript will generate a JavaScript file. example:

```typescript
function add(num1, num2) {
  return num1 + num2;
}
console.log(add(5, 2.8)); // result 7.8
```

there is no issue with the above example, but what if there is a certain case we accidentally assign wrong value type. example:

```typescript
function add(num1, num2) {
  return num1 + num2;
}
console.log(add('5', 2.8)); // result 52.8
```

this happens because we assign a string value to the function and since in the `add` function, we do `num1 + num2` JavaScript treated it as concatenation.

### Reason 2

TypeScript give us features that are not available in vanilla JavaScript.

## Basic Types

To define a variable in Typescript we can use `let`, `var` or `const` same like in Javascript.

- `number`: there is no differences for between int and float

```typescript
// considered OK if we just want to declare variable only then assign value later
let num: number;
num = 5;

// not necessary need to declare the type `: number`
let num: number = 5;

// best
let num = 5;
```

- `string`: all text is valid, we can use `'(single quote)`, `"(double quote)` or ``(backtick / template literal)`

```typescript
// string using single quote
let name: 'Hery';

// string using double quote
let name: 'Hery';

// string using template literal
let name = 'Hery';
let hello = `hi ${name}!`;
console.log(hello); //output: "hi Hery!"

// can declare and assign value later
let name: string;
name = 'Hery';

// considered OK but is not necessary
let name: string = 'Hery';
```

- `boolean`: like in JavaScript, accept value `true` or `false`

```typescript
// considered OK if we just want to declare variable only then assign value later
let isValid: boolean;
isValid = true;

// not necessary need to declare the type `: boolean`
let isValid: boolean = true;

// best
let isValid = true;
```

- `object` : basically all object in JavaScript is also a valid object for typescript but in typescript there is "object types" that we need to specific define the object property type so type script can inferred automatically.

```typescript
/* below is just a normal javascript object.
 * it still ok but typescript cannot inferred the object automatially
 * because we don't define the object properties types
 */
const person = {
  name: 'Hery',
  age: 30
};

/* this is valid for typescipt but with this approach
 * the typescript cannot giving the object properties autocompletion
 */
const person: object = {
  name: 'Hery',
  age: 30
};

// Good
const person: {
  name: string;
  age: number;
} = {
  name: 'Hery',
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

- `tuple` : type of array that have fixed length and data type base on what we defined (warning: typescript cannot catch error when using `push` )

```typescript
// here we define roles as tuple with length of 2 and only can receive
// number type for 1st element and string type for 2nd element
let roles: [number, string];
roles = [2, 'author'];

// WARNING
// as we defined above the "roles" can only receive 2 element of data
// but need to aware that if we use array "push" typescript cannot catch
// this error
let roles: [number, string];
roles = [2, 'author'];
roles.push('admin'); // this consider as valid due to typescript limitation
```

- `enum` : when we need human readable label we can use this type, usually we will declare `const` to hold the number / string that we used as label but we can eliminate it using enum

```typescript
// here we define Role as type enum
// below enum means ADMIN receive number 0, AUTHOR receive number 1
enum Role {
  ADMIN,
  AUTHOR
}

console.log(Role.ADMIN); // result: 0
console.log(Role.AUTHOR); // result: 1

// we also can define specific number to the enum element
enum Status {
  DELETED = -1,
  ACTIVE = 1,
  DRAFT = 2
}

console.log(Status.DELETED); // result: -1

// this also valid enum
enum Action {
  POST = 1,
  GET = 'get',
  PUT = 2
}
```

- `any` : basically will except any type, better avoid this type because this againts the purpose of us using the typescript

```typescript
let a: any;
a = 'here'; // valid
a = 1; // also valid

let b: any[];
b = 1; // invalid because we only receive array of any
b = [1, 'lorem']; // valid
```

- Union Type: when we need a function, const or variable to except multiple type we can use union type using `|` (pipe) for declare the variable can except 2 or more types

```typescript
function combine(input1: number | string, input2: number | string) {
  let result;
  if (typeof input1 === 'number' && typeof input2 === 'number') {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  return result;
}

let combineAges = combine(10, 20);
console.log(combineAges); //output: 30

let combineName = combine('Hery', 'Sehastian');
console.log(combineName); //output: Hery Sehastian
```

- Literal type is a type that we not just define the variable type but specifically define the expected value

```typescript
function combine(
  input1: number | string,
  input2: number | string,
  resultConversion: 'as-number' | 'as-text'
) {
  let result;
  if (
    (typeof input1 === 'number' && typeof input2 === 'number') ||
    resultConversion === 'as-number'
  ) {
    // + sign in the front of input1 and input2 force conversion, its equal to parseFloat(input1) + parseFloat(input2)
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  return result;
}

let combineAges = combine(10, 20, 'as-number');
console.log(combineAges); //output: 30

let combineName = combine('Hery', 'Sehastian', 'as-text');
console.log(combineName); //output: Hery Sehastian

let combineStringNumber = combine('10', '20', 'as-string');
console.log(combineStringNumber); // the IDE will complain that "as-string" is not the valid value for 3rd param, this because we use Literal type in the 3rd param
```

- Type Alias / Custom Type: for the sake of DRY we can define a type alias for types that we repeatly used. We can define using keyword `type`. Type alias can be used with any Typescript types

```typescript
// here we define our type alias for Union Type
type Combinable = number | string;

// here we define our type alias for Literal Type
type ConversionDescriptor = 'as-number' | 'as-text';

// then we can use the alias in the function
function combine(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescriptor
) {
  let result;
  if (
    (typeof input1 === 'number' && typeof input2 === 'number') ||
    resultConversion === 'as-number'
  ) {
    // + sign in the front of input1 and input2 force conversion, its equal to parseFloat(input1) + parseFloat(input2)
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  return result;
}

let combineAges = combine(10, 20, 'as-number');
console.log(combineAges); //output: 30

let combineName = combine('Hery', 'Sehastian', 'as-text');
console.log(combineName); //output: Hery Sehastian
```

Another use case example for Type Alias

```typescript
// this is how we usually define object type, it considered OK but it's hard to read
const person: {
  name: string;
  age: number;
} = {
  name: 'Hery',
  age: 30
};
console.log(person.name);

// using type alias, we can make it more readable
type Person = {
  name: string;
  age: number;
};

const person: Person = {
  name: 'Hery',
  age: 30
};
```

- Return Type & void: define a functon with the expected return type

```typescript
// this is OK
function add(num1: number, num2: number) {
  return num1 + num2;
}

// but if we want to specifically define the return type, typescript also support it
function add(num1: number, num2: number): number {
  return num1 + num2;
}

// typescript also support return type "void"
function printResult(result): void {
  console.log(`Result: ${result}`);
}

printResult(add(10, 30));
```

- Function Type: we can assign a function as a value for variable, but this can get ugly if we don't specifically set which function and what is the expected parameter for the function. Error will happen on the runtime because by default Typescript cannot differentiate during complilation

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2;
}

// let say we want to assign "add" function to variable
let combineFunction;
combineFunction = add; // this is OK, IDE will not complaint

console.log(combineFunction(10, 30)); // when executed it will not throw any error
```

Using same example if we assign `combineFunction` with `number`

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2;
}

let combineFunction;
combineFunction = add; // assign function
combineFunction = 5; // then assign number,  this is OK, IDE will not complaint

// when compiled we will not see any error but executed by console.log it will throw Error
// this happen because we try to execute "combineFunction" as a function but it assigned as number
console.log(combineFunction(10, 30));
```

To avoid above issue we can set type `Function` to `combineFunction`

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2;
}

// set type Function
let combineFunction: Function;
combineFunction = add;
combineFunction = 5; // IDE will complaint this line, because number is not the expected type

console.log(combineFunction(10, 30));
```

Using type `Function` will solve our problem to prevent `combineFunction` to be assigned with non `Function` type value, but what if we assign `combineFunction` with another function

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2;
}

function printResult(result): void {
  console.log(`Result: ${result}`);
}

let combineFunction: Function;
combineFunction = add;
combineFunction = printResult; // this is OK, IDE will not complaint

// when compiled we will not see any error
// but when executed it will return "undefined" result because "printResult" return type is void
console.log(combineFunction(10, 30));
```

To solve above issue we need to specifically tell typescript that `combineFunction` should accept type function with 2 parameters that return `number` value

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2;
}

function printResult(result): void {
  console.log(`Result: ${result}`);
}

// we don't need to use num1 and num2 as parameter, it can be any variable name as long as the expected type is same
let combineFunction: (num1: number, num2: number) => number;
combineFunction = add; // this is OK, IDE will not complaint
combineFunction = printResult; // IDE will complaint because the function not satisfy the type that we define

console.log(combineFunction(10, 30));
```

- Function Type & Callbacks

```typescript
function addAndHandle(
  num1: number,
  num2: number,
  cb: (result: number) => void
) {
  const result = num1 + num2;
  cb(result);
}

// Notes: if we trying to passing more then 1 parameter to function IDE will giving us an error
// it because we clearly define that the callback only require 1 parameter,
// but if we try to giving return value to the callback like `return result;`
// the IDE will not giving any error message this because the return value will be ignored by typescript
// this happen because we already define the callback return `void`
addAndHandle(10, 20, (result) => {
  console.log(result);
});
```

- `unknown`: It's almost same like type `any` but it require type checking before we can assign it to variable. If possible we need to avoid using `uknown` type. Most of the time we many be just need to use Union Type, but for rare case when we really cannot predict the value we can use `unknown` type
  Using type `any`

```typescript
let userInput: any;
let userName: string;

userInput = 5;
userInput = 'Hery';
userName = userInput; // here we will not get any error because IDE will ignore type checking for `any` type
```

Using type `unknown`

```typescript
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Hery';
userName = userInput; // here we will get error
```

To prevent error when assigning `unknown` type value to variable, we need to do manual type checking using `typeof`

```typescript
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Hery';

if (typeof userInput === 'string') {
  userName = userInput; // here dont get error anymore
}
```

- `never`: Is a type that usually used as function return type, it's almost same like `void` but without return `undefined` value and it cancel the script execution
  using `void`

```typescript
function generateError(message: string, code: number): void {
  throw { message: message, errorCode: code };
}

const result = generateError('An error occurred!', 500);
console.log(result); // the console log still executed and will return "undefined" value
```

using `never`

```typescript
function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

const result = generateError('An error occurred!', 500);
console.log(result); // the console.log is never been executed
```

Here useful link from official typescript website: <https://www.typescriptlang.org/docs/handbook/2/everyday-types.html>

## Config

1. To avoid keep execute `tsc app.ts` to compile the typescript whenever there is new changes, we use "watch mode" by adding `--watch` or `-w` at the end of command e.g. `tsc app.ts -w`
2. To compile more than 1 files, we need to tell typescript that this folder is typescript project so we should run `tsc --init` (only once), then execute `tsc -w`
   Links :
   <https://www.typescriptlang.org/docs/handbook/tsconfig-json.html>
   <https://www.typescriptlang.org/docs/handbook/compiler-options.html>
   <https://code.visualstudio.com/docs/typescript/typescript-debugging>

## Modern Javascript

- Arrow function

```typescript
const add = function (a: number, b: number) {
  return a + b;
};

// is equal to
const add = (a: number, b: number) => {
  return a + b;
};

// shorter syntax
const add = (a: number, b: number) => a + b;
```

- Spread Operator: to use this operator it start with `...` before the object
  use case for Array

```typescript
const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];

// if we want to push `hobbies` to `activeHobbies` usually we will use push each element of `hobbies` one by one
activeHobbies.push(hobbies[0], hobbies[1]);

// with spread operator we can simplfied like below
activeHobbies.push(...hobbies);

// or can also like this
const favoriteHobbies = ['Hiking', ...hobbies];
```

use case for Object

```typescript
const person = {
  name: 'Hery',
  age: 30
};

// we can use spread operator if we want to copy person object
const copiedPerson = { ...person };
```

- Rest Parameters: almost same like spread operator but this used in function

```typescript
const add = (...numbers: number[]) => {
  return numbers.reduce((a, b) => {
    return a + b;
  }, 0);
};

// now the `add` function can accept many number parameter
const addNumbers = add(5, 10, 2, 3.5);
console.log(addNumbers);
```

- Array & Object Destructuring
  use case for Array

```typescript
const hobbies = ['Sports', 'Cooking'];

// normaly we will do this
const hooby1 = hobbies[0];
const hobby2 = hobbies[1];

// using Array Destructuring
const [hobby1, hobby2] = hobbies;
console.log(hobby1); // output: "Sports"
console.log(hobby2); // output: "Cooking"

// we also can use spread operator incase `hobbies` contain more than 2 element
// the rest of `hobbies` element will be stored in `remainingHobbies` as Array
const [hobby1, hobby2, ...remainingHobbies] = hobbies;
console.log(hobby1); // output: "Sports"
console.log(hobby2); // output: "Cooking"
console.log(remainingHobbies); // output: ["etc", "etc", "etc"] (if hobbies contain more element)
```

use case for Object

```typescript
const person = {
  firstName: 'Hery',
  age: 30
};

// normally we will do this
const firstName = person.firstName;
const age = person.age;

// using Object Destructuring, please note that the variable name must be same with the object property name
// for this case variable firstName must be same with property firstName in person object
const { firstName, age } = person;
console.log(firstName); // output: "Hery"
console.log(age); // output: 30
```

Links:
<https://github.com/lukehoban/es6features>

## Classes & Interfaces

### Class

#### Basic

```typescript
class Department {
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  describe() {
    console.log('Department:  ' + this.name);
  }
}

// how to use class
const finance = new Department('Finance');
finance.describe();
```

- problem: sometimes `this` can be a bit tricky in javascript

```typescript
class Department {
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  describe() {
    console.log('Department:  ' + this.name);
  }
}

const finance = new Department('Finance');
finance.describe();

const copyFinance = { describe: finance.describe }; // `finance.describe` (without the parentheses) means that we pass object function to property `describe`
copyFinance.describe(); // when executed it will show "Department: undefined", this because the `this` is not refering to the `finance` object but it refering to `copyFinance` object
```

- solution

```typescript
class Department {
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  // we adding `this` as parameter, but we can still execute function `describe()` without any parameter, because `this` as parameter is special
  // by adding `this: Department` we tell typescript that `this` should be refering to Department
  describe(this: Department) {
    console.log('Department:  ' + this.name);
  }
}

const finance = new Department('Finance');
finance.describe();

const copyFinance = { name: 'Dummy', describe: finance.describe }; // typescript will force us to add `name` property
copyFinance.describe(); // when executed it will show "Department: Dummy"
```

#### Access Modifiers

```typescript
class Department {
  // by default this property is `public`, we can also write it like `public name: string;`
  name: string;
  // property can only be access by it own class
  private employee: string[] = [];

  constructor(n: string) {
    this.name = n;
  }

  describe() {
    console.log('Department:  ' + this.name);
  }

  addEmployee(employee: string) {
    this.employee.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employee.length);
    console.log(this.employee);
  }
}

const finance = new Department('Finance');
finance.addEmployee('Hery');
finance.addEmployee('Maria');
finance.printEmployeeInformation();
```

#### Shorthand Initialization

```typescript
class Department {
  // property can only be access by it own class
  private employee: string[] = [];

  // shorthand initialization
  constructor(private id: string, public name: string) {
    // no need to do `this.id = id; this.name = name;` since we use shorthand initialization
  }

  describe() {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employee.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employee.length);
    console.log(this.employee);
  }
}

const finance = new Department('d1', 'Finance');
finance.describe(); // when executed it will show "Department (d1): Finance"
finance.addEmployee('Hery');
finance.addEmployee('Maria');
finance.printEmployeeInformation();
```

#### readonly Properties

`readonly` property mean that this certain property can be only be initialized once.

```typescript
class Department {
  private readonly id: string;
  private name: string;
  private employee: string[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  describe() {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    this.id = 'd2'; // typescript will throw error on this line because `id` have readonly property
    this.employee.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employee.length);
    console.log(this.employee);
  }
}

const finance = new Department('d1', 'Finance');
finance.describe();
```

we also can use `readonly` property in shorthand initialization

```typescript
class Department {
  private employee: string[] = [];

  constructor(private readonly id: string, private name: string) {}

  describe() {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    this.id = 'd2'; // typescript will throw error on this line because `id` have readonly property
    this.employee.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employee.length);
    console.log(this.employee);
  }
}

const finance = new Department('d1', 'Finance');
finance.describe();
```

#### Inheritance

- tips: use `super()` to call the constructor of the base class

```typescript
class Department {
  constructor(private readonly id: string, private name: string) {}

  describe() {
    console.log(`Department (${this.id}): ${this.name}`);
  }
}

class FinanceDepartment extends Department {
  constructor(private id: string, headDepartment: string) {
    super('d1', 'Finance');
  }

  printHeadDepartment() {
    console.log(`Head of ${this.name} department is ${this.headDepartment}`);
  }
}

class HrDepartment extends Department {
  constructor(private id: string, employee: string[]) {
    super('d2', 'HR');
  }

  addEmployee(employee: string) {
    this.employee.push(employee);
  }

  printHrStaff() {
    console.log(this.employee);
  }
}

const finance = new FinanceDepartment('d1', 'Hery');
finance.describe(); // when executed it will show "Department (d1): Finance"
finance.printHeadDepartment(); // when executed it will show "Head of Finance department is Hery"

const hr = new HrDepartment('d2', 'Maria');
hr.describe(); // when executed it will show "Department (d2): HR"
hr.addEmployee('John');
hr.addEmployee('Anna');
hr.printHrStaff();
```

#### Overriding Properties & protected Modifier

```typescript
class Department {
  // now `employee` is protected property, means it can be modified by the child class
  constructor(
    private readonly id: string,
    private name: string,
    protected employee: string[]
  ) {}

  describe() {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employee.push(employee);
  }
}

class FinanceDepartment extends Department {
  constructor(private id: string, headDepartment: string) {
    super('d1', 'Finance');
  }

  printHeadDepartment() {
    console.log(`Head of ${this.name} department is ${this.headDepartment}`);
  }
}

class HrDepartment extends Department {
  constructor(private id: string, employee: string[]) {
    super('d2', 'HR');
  }

  // overriding the parent `addEmployee` function
  addEmployee(employee: string) {
    // skip push when `employee` value is "Hery"
    if (employee === 'Hery') {
      return;
    }
    this.employee.push(employee);
  }

  printHrStaff() {
    console.log(this.employee);
  }
}

const finance = new FinanceDepartment('d1', 'Hery');
finance.describe(); // when executed it will show "Department (d1): Finance"
finance.addEmployee('Hery');
finance.addEmployee('Maria');
finance.printEmployeeInformation(); // when executed it will show "['Hery', 'Maria']"

const hr = new HrDepartment('d2', 'Maria');
hr.describe(); // when executed it will show "Department (d2): HR"
hr.addEmployee('Hery');
hr.addEmployee('John');
hr.addEmployee('Anna');
finance.printEmployeeInformation(); // when executed it will show "['John', 'Anna']"
```

#### Getter & Setter

```typescript
class Employee {
  private id: string;

  constructor(firstName: string, lastName: string) {}

  get employeeFullName() {
    return `${this.firstname} ${this.lastName}`;
  }

  set employeeID(id: string) {
    this.id = id;
  }

  printEmployeeDetail() {
    console.log(this);
  }
}

const emp = new Employee('Hery', 'Sehastian');
console.log(emp.employeeFullName); // when call `getter` property we don't need to add parentheses
emp.printEmployeeDetail(); // will print "Employee: {id: undefined, firstName: 'Hery', lastName: 'Sehastian'}"
emp.employeeID = 'E1'; // when assign value to `setter` property we just do like assign value to normal varible
emp.printEmployeeDetail(); // will print "Employee: {id: 'E1', firstName: 'Hery', lastName: 'Sehastian'}"
```

#### Static Methods & Properties

```typescript
class HelloWorld {
  // static property
  static greeting = 'hello';

  // static method
  static sayHi(firstName: string) {
    return `${HelloWorld.greeting}, ${firstName}!`;
  }
}

let firstName = 'Hery';
console.log(HelloWorld.fullName(firstName));
```

#### Abtract Class

```typescript
abtract class Car {
    abtract brand(): void;
}

class Honda extends Car {
    constructor() {

    }

    brand() {
        console.log('The car brand is Honda');
    }
}

class Toyota extends Car {
    constructor() {

    }

    brand() {
        console.log('The car brand is Toyota');
    }
}

const car1 = new Honda();
car1.brand();

const car2 = new Toyota();
car2.brand();
```

#### Singletons & Private Constructor

The singleton pattern is about ensuring that we only have exactly one intance of a certain class, this is where the private contractor is useful

```typescript
class Logger {
  private static instance: Logger;
  private text: string;

  private constructor() {}

  writeLog(severity: string, message: string) {
    this.text = +`${this.severity} - ${this.message} \n`;
  }

  printLog() {
    console.log(this.text);
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new Logger();
    return this.instance;
  }
}

const log1 = Logger.getInstance();
log1.writeLog('info', 'Hello World');
log1.printLog(); // will show "info - Hello World";
const log2 = Logger.getInstance();
log2.printLog(); // will show "info - Hello World";
// both log1 and log2 have same instance of Logger class
```

### Interface in typescript

```typescript
interface Person {
    name: string,
    age: number,
    greet(phrase: string): void;
}

// in typescript we can use interface for type checking
// we do this to make sure the object that created have the same structure like the interface
let user1: Person;

user1 = {
    name: 'Hery',
    age: 37,
    greet(phrase: string): {
        console.log(`${phrase} ${this.name}`);
    }
}

user1.greet('Hi there my name is');
```

Using interface with class

```typescript
interface Greetable {
  name: string;
  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age = 30;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  }
}

const person = new Person('Hery');
person.greet();
```

Readonly Interface Properties

```typescript
interface Greetable {
  readonly name: string;
  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age = 30;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  }
}

const person = new Person('Hery');
person.name = 'Maria'; // this will throw error due to readonly property
person.greet();
```

Extending Interface: in typescript we can extends interface with one or multiple interfaces
normally we can implement multiple interfaces in one class

```typescript
interface Named {
  readonly name: string;
}

interface Greetable {
  greet(phrase: string): void;
}

class Person implements Greetable, Named {
  // code goes here
}
```

in typescript we can extends interface

```typescript
interface Named {
  readonly name: string;
}
// by extends Named, now every class that implement Greetable should have name property
interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  // code goes here
}
```

we can extends interface with multiple interface

```typescript
interface Named {
  readonly name: string;
}

interface Greetable {
  greet(phrase: string): void;
}

interface Intro extends Greetable, Named {
  selfIntro(): void;
}

class Person implements Intro {
  // code goes here
}
```

Interface as Function Type: we can use interface as alternative to `type`
example using `type`

```typescript
type AddFn = (a: number, b: number) => number;

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};
```

example using interface

```typescript
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};
```

Optional Parameters & Properties: to make property optional (nullable) we just need put `?` after the property name e.g. `name?: string`

```typescript
interface Greetable {
  name: string;
  prettyName?: string;
  greet(phrase: string): void;
}

// we will not get error from typescript because `prettyName` is optional
class Person implements Greetable {
  name: string;
  age = 30;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  }
}

const person = new Person('Hery');
person.greet();
```

### Advanced Types

#### Intersection Types

example 1

```typescript
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// this is called intersection type
// we create new type by combining 2 existing types using & symbol
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Hery',
  privileges: ['create-post'],
  startDate: new Date()
};
```

example 2

```typescript
type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;
```

#### Type Guards

Type Guards is not typescript feature it's a javascript feature that used to check type, property and class

- checking variable type we can use `typeof`

```typescript
type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
```

- checking whether property or method in type or class we can use `in`

```typescript
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name: ' + emp.name);
  if ('privileges' in emp) {
    console.log('Privileges: ' + emp.privileges);
  }

  if ('startDate' in emp) {
    console.log('Start Date: ' + emp.startDate);
  }
}

const e1: UnknownEmployee = {
  name: 'Hery',
  privileges: ['create-post'],
  startDate: new Date()
};

printEmployeeInformation(e1);
```

- checking instance of class we can use `instanceof`

```typescript
class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving...');
  }

  loadCargo(amount: number) {
    console.log('Loading cargo...' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();

  // we can use type guard `in` for this case but there is more elegant solution
  // if ('loadCargo' in vehicle) {
  //     vehicle.loadCargo(1000);
  // }

  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);
```

#### Discriminated Unions

one of the type guard technique that use a single field which uses literal types which we can use to let TypeScript narrow down the possible current type.

```typescript
interface Bird {
  flyingSpeed: number;
}

interface Horse {
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;

  // we cannot use instanceof here because Bird is interface not class
  if (animal instanceof Bird) {
    console.log('Moving with speed: ' + animal.flyingSpeed);
  }
}
```

so the solution for above issue is we add any field to the object for this case we add field `type`

```typescript
interface Bird {
  type: 'bird'; // as literal type
  flyingSpeed: number;
}

interface Horse {
  type: 'horse'; // as literal type
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;
  }
  console.log('Moving with speed: ' + animal.speed);
}
// during typing the type you will notice that Typescript aware about the type Bird and Horse
moveAnimal({ type: 'bird', flyingSpeed: 10 });
```

#### Type Casting

Typescript support type casting there 2 ways for doing type casting in Typescript
option 1:

```typescript
const userInputElement = <HTMLInputElement>(
  document.getElementById('user-input')!
);
userInputElement.value = 'Hi There!';
```

option 2:

```typescript
const userInputElement = document.getElementById(
  'user-input'
)! as HTMLInputElement;
userInputElement.value = 'Hi There!';
```

another variation for option 2:

```typescript
const userInputElement = document.getElementById('user-input');
if (userInputElement) {
  (userInputElement as HTMLInputElement).value = 'Hi There!';
}
```

#### Index Properties

Typescript have feature that allow us to create object which are more flexible regarding the property they might hold.

```typescript
interface ErrorContainer {
  id: string; // this is still allowed because the property have same type with the index property
  // we could using name for the index property placeholder
  // example `[key: string]: string` or even `[foo: string]: string` also allowed
  // but the best practice is using `prop` or `key` as the placeholder name
  [prop: string]: string;
  //age: number; // this will prompt error because the value of the property is number
}

const errorBag: ErrorContainer = {
  email: 'Not a valid Email address!',
  username: 'Must start with a capital character!'
};

function printErrorBag(errorBag: ErrorContainer) {
  for (const prop in errorBag) {
    console.log(errorBag[prop]);
  }
}

printErrorBag(errorBag);
```

#### Function Overloads

case example

```typescript
type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add('Hery', ' Sehastian');
result.split(' '); //this will prompt error because typescript detect the type as `Combinable` which we expect the return type should be string because we want to use string `split` method
```

to solve above issue we can use type casting e.g.

```typescript
type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add('Hery', ' Sehastian') as string;
result.split(' '); //this will not prompt error anymore
```

but there is another more better solution for this case which is using one of the Typescript feature that called function overload

```typescript
type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add('Hery', ' Sehastian');
result.split(' '); //this will not prompt error anymore
```

#### Optional Chaining

Case when we need to fetch data from API or any source and we unsure whether certain property exist or not we could use optional chaining when try to access the property

```typescript
interface Job {
  title: string;
  description: string;
}

interface UserData {
  id: string;
  name: string;
  job?: Job;
}

const fetchUserData: UserData = {
  id: 'u1',
  name: 'Hery Sehastian'
  // job: { title: 'CEO', description: 'Owner of the company' }
};

console.log(fetchUserData?.job.title); // this will not prompt error if the job property is not defined
```

#### Nullish Coalescing

Typsscript 3.7 above support null coalesing.

```typescript
const data = null;
const result = data ?? 'default';
console.log(result); //output: 'default'

const data = undefined;
const result = data ?? 'default';
console.log(result); //output: 'default'

const data = '';
const result = data ?? 'default';
console.log(result); //output: ''

const data = 0;
const result = data ?? 'default';
console.log(result); //output: 0

const data = false;
const result = data ?? 'default';
console.log(result); //output: false
```

### Generics

#### Build-in Generics

```typescipt
const hobbies: Array<string> = []; // equal to string[]
```

#### Generic Function

```typescript
function merge<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: 'Hery', hobbies: ['Gaming'] }, { age: 35 });
console.log(mergedObj.age);
```

#### Working with Constraints

```typescript
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: 'Hery', hobbies: ['Gaming'] }, { age: 35 });
console.log(mergedObj.age);
```
