'use strict'

/* 
Looping a triangle

Write a loop that makes seven calls to console.log to output the following triangle:

#
##
###
####
#####
######
#######
*/
function outputTriangle(height)
{
    for (var row = 0; row < height; ++row)
    {
        var line = "";
        for (var column = 0; column <= row; ++column)
        {
            line += "#";
        }
        console.log(line);
    }
}

/*
FizzBuzz

Write a program that uses console.log to print all the numbers from 1 to 100, with two exceptions. 
For numbers divisible by 3, print "Fizz" instead of the number, 
and for numbers divisible by 5 (and not 3), print "Buzz" instead.

When you have that working, modify your program to print "FizzBuzz", 
for numbers that are divisible by both 3 and 5 
(and still print "Fizz" or "Buzz" for numbers divisible by only one of those).
*/
function printFizzBuzzNumbers()            
{
    const transform = number => {
        const divisibleBy3 = (number % 3) === 0;
        const divisibleBy5 = (number % 5) === 0;

        if (divisibleBy3 && divisibleBy5)
        {
            return "FizzBuzz";
        }
        if (divisibleBy3)
        {
            return "Fizz";
        }
        if (divisibleBy5)
        {
            return "Buzz";
        }
        return number;
    }

    for (let number = 1; number <= 100; ++number)
    {
        console.log(transform(number));
    }
}

/*
Chess board

Write a program that creates a string that represents an 8×8 grid, 
using newline characters to separate lines. 
At each position of the grid there is either a space or a “#” character. 
The characters should form a chess board.

Passing this string to console.log should show something like this:

 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #
When you have a program that generates this pattern, 
define a variable size = 8 and change the program so that it works for any size, 
outputting a grid of the given width and height.
*/
function getChessBoard(size)
{
    let board = "";
    for (let row = 0; row < size; ++row)
    {
        for (let column = 0; column < size; ++column)
        {
            board += (((row + column) % 2) === 0)
                ? " "
                : "#";
        }
        board += "\n";
    }
    return board;
}

//outputTriangle(7);
//printFizzBuzzNumbers();
//console.log(getChessBoard(5));
//console.log(getChessBoard(8));