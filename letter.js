//Declare required npm packages
const chalk = require('chalk');

//Constructor to display placeholder or letter chraracter
var LettersToDisplay = function (word, correctGuesses) {
    //Assign variables to the passed-in arguments
    this.gameWord = word;
    this.correctLetters = correctGuesses;
    this.displayText = '_';

    //Initiating variable winner as false
    this.winner = false;

    //Function to display word to user
    this.parseDisplay = function () {
        //Variable to hold display game word characters to user
        var display = '';
        //Start game with underscores for each letter of the gameWord
        //Create the initial display for the user at game start
        if (this.correctLetters == undefined) {
            for (var i = 0; i < this.gameWord.length; i++) {
                //for each index in gameWord length, append underscore & spaces to display variable
                display += ' _ ';
            }
        }
        //If there have been some correct guesses
        else {
            //Nested loop statements to compare gameWord and correctLetters arrays
            for (var i = 0; i < this.gameWord.length; i++) {
                //Variable to hold boolean flag for _ or letter value
                var letterMatch = false;
                for (var j = 0; j < this.correctLetters.length; j++) {
                    //If statement to check value of gameWord and correctLetters arrays
                    if (this.gameWord[i] == this.correctLetters[j]) {
                        display += this.correctLetters[j];
                        letterMatch = true;
                    }
                }
                //If letterMatch is false, display underscore
                if (!letterMatch) {
                    display += ' _ ';
                }
            }
        }

        //Declare variable to hold displayed letters with removed spaces
        this.displayText = display.trim();
        //!!!REMOVE AFTER DEBUGGING
        console.log(chalk.bold.red(this.displayText));

        //If statement comparing the displayText to gameWord to determine if user has won
        if (this.displayText == this.gameWord) {
            this.winner = true;
        }
    }
};

//Export constructor function
module.exports = lettersToDisplay;
