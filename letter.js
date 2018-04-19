const chalk = require('chalk');

//Constructor to display placeholder or letter chraracter
var lettersToDisplay = function (word, goodGuesses) {

    this.gameWord = word;
    this.goodLetters = goodGuesses;
    this.displayText = '_';

    //Declare variable winner as false
    this.winner = false;

    //Function to display word to user
    this.parseDisplay = function () {
        //Variable to hold display game word characters to user
        var display = '';
        // If no correct guesses have been input, display underscore for each character
        //Game initial display to user
        if (this.goodLetters == undefined) {
            for (var i = 0; i < this.gameWord.length; i++) {
                //Assign underscores to length of gameWord
                display += ' _ ';
            }
        }
        // Otherwise, check all letters in a double loop
        else {
            // Double for loop... loop through the word itself and then each possible correct letter
            for (var i = 0; i < this.gameWord.length; i++) {
                // To determine whether a _ is needed
                var letterWasFound = false;
                for (var j = 0; j < this.goodLetters.length; j++) {
                    // If yes the letter
                    if (this.gameWord[i] == this.goodLetters[j]) {
                        display += this.goodLetters[j];
                        letterWasFound = true;
                    }
                }
                // If nothing was found
                if (!letterWasFound) {
                    display += ' _ ';
                }
            }
        }

        // Remove first/last space and console log
        this.displayText = display.trim();
        console.log(chalk.bold.red(this.displayText));

        // Check to see if the game was won (user display equals the word; ie no '_' marks)
        if (this.displayText == this.gameWord) {
            this.winner = true;
        }

    }
};

// export to use in word.js
module.exports = lettersToDisplay;
