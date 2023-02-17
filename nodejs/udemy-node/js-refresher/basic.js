// var , let , const
var user = "Aayush";
const age = 25;
let message = "Hello World";

// Traditional Function
function summarizeUser(name, age, message) {
  return message + " , my name is : " + name + " . I'm " + age + " years old.";
}

// Arrow Function
const summarizeUSER = (user, age, message) =>
  message + " , my name is : " + user + " . I'm : " + age + " , years old.";

console.log(summarizeUSER(user, age, message));

// Object
const obj = {
  name: "Aayush",
  age: 22,
  greet() {
    console.log(
      "This my name is :",
      this.name + ". I am",
      this.age,
      "years old"
    );
  },
};

obj.greet();

// Array
const hobbies = ["Sports", "Art"];
console.log(hobbies.map((hobby) => "Hobby : " + hobby));

// Spread Operator
let copiedPerson = { ...obj };
let copiedArray = [...hobbies];

// Rest Operator
const toArray = (...args) => args;

console.log(toArray(1, 2, 3, 4, 5, 6, 7, 8, 9, 0));
console.log(copiedPerson, copiedArray);
