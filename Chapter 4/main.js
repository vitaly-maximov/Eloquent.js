'use strict'

/*
The sum of a range

The introduction of this book alluded to the following as a nice way to compute the sum of a range of numbers:

console.log(sum(range(1, 10)));
Write a range function that takes two arguments, start and end, 
and returns an array containing all the numbers from start up to (and including) end.

Next, write a sum function that takes an array of numbers and returns the sum of these numbers. 
Run the previous program and see whether it does indeed return 55.

As a bonus assignment, modify your range function to take an optional third argument 
that indicates the “step” value used to build up the array. 
If no step is given, the array elements go up by increments of one, corresponding to the old behavior. 
The function call range(1, 10, 2) should return [1, 3, 5, 7, 9]. 
Make sure it also works with negative step values so that range(5, 2, -1) produces [5, 4, 3, 2].

// Your code here.

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55
*/
function range(start, end, step)
{
    if (step === 0)
    {
        throw "step cannot be 0";
    }

    if (step === undefined)
    {
        step = 1;
    }

    let array = [];
    let condition = (step > 0) 
        ? n => (n <= end) 
        : n => (n >= end);

    for (let i = start; condition(i); i += step)
    {
        array.push(i);
    }

    return array;
}

console.log("1, 10\t", range(1, 10));
console.log("0, 0\t", range(0, 0));
console.log("5, 1\t", range(5, 1));
console.log("-1, 1\t", range(-1, 1));

function sum(array)
{
    let acc = 0;
    for (let item of array)
    {
        acc += item;
    }
    return acc;
}

console.log("sum(range(1, 10))\t", sum(range(1, 10)));
console.log("sum([])\t", sum([]));
console.log("sum([1])\t", sum([1]));

console.log("1, 10, 2\t", range(1, 10, 2));
console.log("5, 2, -1\t", range(5, 2, -1));

/*
Reversing an array

Arrays have a method reverse, which changes the array by inverting the order in which its elements appear. 
For this exercise, write two functions, reverseArray and reverseArrayInPlace. 
The first, reverseArray, takes an array as argument and produces a new array that has the same elements in the inverse order. 
The second, reverseArrayInPlace, does what the reverse method does: 
it modifies the array given as argument in order to reverse its elements. Neither may use the standard reverse method.

Thinking back to the notes about side effects and pure functions in the previous chapter, 
which variant do you expect to be useful in more situations? Which one is more efficient?

// Your code here.

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
var arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
*/
function reverseArray(array)
{
    let reversedArray = [];
    for (let item of array)
    {
        reversedArray.unshift(item);
    }
    return reversedArray;
}

console.log("reverseArray([\"A\", \"B\", \"C\"])\t", reverseArray(["A", "B", "C"]));
console.log("reverseArray([])\t", reverseArray([]));
console.log("reverseArray([1])\t", reverseArray([1]));

function reverseArrayInPlace(array)
{
    for (let i = 0; i < Math.floor(array.length / 2); ++i)
    {
        let temp = array[i];
        array[i] = array[array.length - 1 - i];
        array[array.length - 1 - i] = temp;
    }
}

var arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log("reverseArrayInPlace([1, 2, 3, 4, 5])\t", arrayValue);

arrayValue = [];
reverseArrayInPlace(arrayValue);
console.log("reverseArrayInPlace([])\t", arrayValue);

arrayValue = [5];
reverseArrayInPlace(arrayValue);
console.log("reverseArrayInPlace([5])\t", arrayValue);

/*
A list

Objects, as generic blobs of values, can be used to build all sorts of data structures. 
A common data structure is the list (not to be confused with the array). 
A list is a nested set of objects, with the first object holding a reference to the second, the second to the third, and so on.

var list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null
    }
  }
};

A nice thing about lists is that they can share parts of their structure. 
For example, if I create two new values {value: 0, rest: list} and {value: -1, rest: list} 
(with list referring to the variable defined earlier), they are both independent lists, 
but they share the structure that makes up their last three elements. 
In addition, the original list is also still a valid three-element list.

Write a function arrayToList that builds up a data structure like the previous one when given [1, 2, 3] as argument, 
and write a listToArray function that produces an array from a list. Also write the helper functions prepend, 
which takes an element and a list and creates a new list that adds the element to the front of the input list, 
and nth, which takes a list and a number and returns the element at the given position in the list, 
or undefined when there is no such element.

If you haven’t already, also write a recursive version of nth.

// Your code here.

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
*/
function arrayToList(array)
{
    return (array.length === 0)
        ? null
        : {
            value: array[0],
            rest: arrayToList(array.slice(1)) 
          }
}

console.log("arrayToList([10, 20])\t", JSON.stringify(arrayToList([10, 20])));
console.log("arrayToList([])\t", JSON.stringify(arrayToList([])));
console.log("arrayToList([5])\t", JSON.stringify(arrayToList([5])));

function listToArray(list)
{
    if (list === null)
    {
        return [];
    }

    let array = listToArray(list.rest);
    array.unshift(list.value);
    return array;
}

console.log("listToArray(arrayToList([10, 20, 30]))\t", listToArray(arrayToList([10, 20, 30])));
console.log("listToArray(arrayToList([]))\t", listToArray(arrayToList([])));
console.log("listToArray(arrayToList([5]))\t", listToArray(arrayToList([5])));

function prepend(item, list)
{
    return { value: item, rest: list };
}

console.log("prepend(10, prepend(20, null))\t", JSON.stringify(prepend(10, prepend(20, null))));

function nth(list, n)
{
    if (list === null)
    {
        return undefined;
    }

    return (n === 0)
        ? list.value
        : nth(list.rest, n-1);
}

console.log("nth(arrayToList([10, 20, 30]), 1)\t", nth(arrayToList([10, 20, 30]), 1));
console.log("nth(arrayToList([10, 20, 30]), 4)\t", nth(arrayToList([10, 20, 30]), 4));

/*
Deep comparison

The == operator compares objects by identity. But sometimes, 
you would prefer to compare the values of their actual properties.

Write a function, deepEqual, that takes two values and returns true only 
if they are the same value or are objects with the same properties 
whose values are also equal when compared with a recursive call to deepEqual.

To find out whether to compare two things by identity (use the === operator for that) or 
by looking at their properties, you can use the typeof operator. 
If it produces "object" for both values, you should do a deep comparison.
But you have to take one silly exception into account: by a historical accident, typeof null also produces "object".

// Your code here.

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
*/
function deepEqual(a, b)
{
    if ((a === null) && (b === null))
    {
        return true;
    }
    if ((a === null) || (b === null))
    {
        return false;
    }
    if (typeof(a) !== typeof(b))
    {
        return false;
    }
    if (typeof(a) !== "object")
    {
        return (a === b);
    }

    for (let property in a)
    {
        if (property in b === false)
        {
            return false;
        }
    }

    for (let property in b)
    {
        if (property in a === false)
        {
            return false;
        }
    }

    for (let property in a)
    {
        let ap = a[property];
        let bp = b[property];

        if (!deepEqual(ap, bp))
        {
            return false;
        }
    }

    return true;
}

console.log("null, null\t", deepEqual(null, null));
console.log("null, 5\t", deepEqual(null, 5));
console.log("5, null\t", deepEqual(5, null));
console.log("1, true\t", deepEqual(1, true));
console.log("1, 2\t", deepEqual(1, 2));
console.log("2, 2\t", deepEqual(2, 2));
console.log("{ a: 5, b: 4}, { a: 5}\t", deepEqual({ a: 5, b: 4 }, { a: 5 }));
console.log("{ a: 5}, { a: 5, b: 4}\t", deepEqual({ a: 5 }, { a: 5, b: 4 }));
console.log("{ a: 5, b: 2}, { a: 5, b: 4}\t", deepEqual({ a: 5, b: 2 }, { a: 5, b: 4 }));
console.log("{ a: 5, b: 4}, { a: 5, b: 4}\t", deepEqual({ a: 5, b: 4 }, { a: 5, b: 4 }));

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true