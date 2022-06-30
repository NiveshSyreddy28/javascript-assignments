const printName = (name) => { return “Hi ” + name};

console.log(printName("Nivesh"));

const printBill = (name, bill) => {
    return `Hi ${name}, please pay: ${bill}`;
}

console.log(printBill("Nivesh",200));

const person = {
    name: 'Noam Chomsky',
    age: 92
};
const{name,age} = person;
console.log(name,age);
