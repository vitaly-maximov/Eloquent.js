'use strict'

/*
Flattening

Use the reduce method in combination with the concat method to “flatten” an array of arrays 
into a single array that has all the elements of the input arrays.

var arrays = [[1, 2, 3], [4, 5], [6]];
// Your code here.
// → [1, 2, 3, 4, 5, 6]
*/
function flatten(arrayOfArrays)
{
    return arrayOfArrays.reduce((a, b) => a.concat(b), []);
}

console.log("[[1, 2, 3], [4, 5], [6]]\t", flatten([[1, 2, 3], [4, 5], [6]]));
console.log("[[]]\t", flatten([[]]));
console.log("[[5]]\t", flatten([[5]]));

/*
Mother-child age difference

Using the example data set from this chapter, compute the average age difference between mothers and children 
(the age of the mother when the child is born). You can use the average function defined earlier in this chapter.

Note that not all the mothers mentioned in the data are themselves present in the array. 
The byName object, which makes it easy to find a person’s object from their name, might be useful here.

// → 31.2
*/
let ancestry = JSON.parse(ANCESTRY_FILE);

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

function motherChildAgeDifference()
{
    let ages = ancestry        
        .filter(person => person.mother in byName)
        .map(person => person.born - byName[person.mother].born);

    return average(ages);
}

console.log(motherChildAgeDifference());

/*
Historical life expectancy

When we looked up all the people in our data set that lived more than 90 years, 
only the latest generation in the data came out. Let’s take a closer look at that phenomenon.

Compute and output the average age of the people in the ancestry data set per century. 
A person is assigned to a century by taking their year of death, dividing it by 100, and rounding it up, as in Math.ceil(person.died / 100).

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

// Your code here.

// → 16: 43.5
//   17: 51.2
//   18: 52.8
//   19: 54.8
//   20: 84.7
//   21: 94
For bonus points, write a function groupBy that abstracts the grouping operation. 
It should accept as arguments an array and a function that computes the group for an element in the array and 
returns an object that maps group names to arrays of group members.
*/
function groupBy(array, selector)
{
    let groups = {};
    for (let item of array)
    {
        let key = selector(item);
        if (key in groups === false)
        {
            groups[key] = [];
        }
        groups[key].push(item);
    }
    return groups;
}

function lifeExpectancy()
{
    let groups = groupBy(ancestry, person => Math.ceil(person.died / 100));
    for (let key in groups)
    {
        let age = average(groups[key].map(person => person.died - person.born));
        console.log(key, ": ", age);
    }
}

lifeExpectancy();

/*
Every and then some

Arrays also come with the standard methods every and some. 
Both take a predicate function that, when called with an array element as argument, returns true or false. 
Just like && returns a true value only when the expressions on both sides are true, 
every returns true only when the predicate returns true for all elements of the array. 
Similarly, some returns true as soon as the predicate returns true for any of the elements. 
They do not process more elements than necessary—for example, 
if some finds that the predicate holds for the first element of the array, 
it will not look at the values after that.

Write two functions, every and some, that behave like these methods, except that they take the array as their first argument rather than being a method.

// Your code here.

console.log(every([NaN, NaN, NaN], isNaN));
// → true
console.log(every([NaN, NaN, 4], isNaN));
// → false
console.log(some([NaN, 3, 4], isNaN));
// → true
console.log(some([2, 3, 4], isNaN));
// → false
*/

function every(array, predicate)
{
    for (let item of array)
    {
        if (!predicate(item))
        {
            return false;
        }
    }
    return true;
}

function some(array, predicate)
{
    for (let item of array)
    {
        if (predicate(item))
        {
            return true;
        }
    }
    return false;
}

console.log(every([NaN, NaN, NaN], isNaN));
console.log(every([NaN, NaN, 4], isNaN));
console.log(some([NaN, 3, 4], isNaN));
console.log(some([2, 3, 4], isNaN));