firstName = prompt("Enter first Name");
lastName = prompt("Enter last Name");

//Q2. An arrow function takes two arguments firstName and lastName and returns a 2 letter string that represents the first letter of both the arguments
function arrow(firstName, lastName) {
  return("Printing First char of First name and last name: " + firstName[0]+lastName[0]);
}
function printLastChar(firstName,lastName) {
  return("Printing Last char of First name and last name: " + firstName[firstName.length-1]+lastName[lastName.length-1]);

}
//Q1. Write a program to demonstrate how a function can be passed as a parameter to another function.
function secondFunction(func,firstName,lastName) {

  console.log(func(firstName,lastName));
}

console.log(arrow(firstName,lastName));
secondFunction(arrow,firstName,lastName);
secondFunction(printLastChar,firstName,lastName);
