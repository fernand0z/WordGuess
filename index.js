//Run this file using node in your CLI program
//Press CTRL + C to exit the game at any time

//NPM packages to use 
const chalk = require('chalk');
const inquirer = require('inquirer');
//Required modules from other files
const wordList = require('./Words-dont-peek.js');
const checkForLetter = require('./word.js');
const lettersToDisplay = require('./letter.js');

//Declare variables
var alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var lettersGuessed = [];
var correctLetters = [];
var displayGameWord;

//Game object to perform game operations
var game = {

    wordBank: wordList, //Word array
    guessesRemaining: 10, //Variable to hold 10 guesses value
    currentWord: null, // the word object

    startGame: function () {
        //Reset guess value to 10
        this.guessesRemaining = 10;
        //Random number generator to pull from word bank array
        var x = Math.floor(Math.random() * this.wordBank.length);
        this.currentWrd = this.wordBank[x];
        //Display instructions to user
        console.log(chalk.bold.red("===============================WORD GUESS GAME================================"));
        console.log(chalk.bold.cyan('            Try to guess the word below!  Category: US State Capitals         '));
        //Display the word's letter underscores
        displayGameWord = new lettersToDisplay(this.currentWrd);
        displayGameWord.parseDisplay();
        console.log(chalk.bold.green('\nGuesses Left: ' + game.guessesRemaining));
        console.log(chalk.bold.red("==============================================================================="));
        //Loop guess prompt
        promptLoop();
    }
};

// ----------------------------- User Prompt Function (stand alone b/c of scoping issues inside the game object) -----------------------------

function promptLoop() {
    console.log(''); //A space between each of the guessed letters.  Just for appearance.
    //Check that there are guesses remaining
    if (game.guessesRemaining > 0) {
        inquirer.prompt([
            {
                type: "value",
                name: "letter",
                message: "Enter the letter you want to guess:  "
            }
        ]).then(function (userInput) {
            //Convert the input to lowercase
            var inputLetter = userInput.letter.toLowerCase();
            //Input validation, user input must exist in the alpha array of alphabetic characters
            if (alpha.indexOf(inputLetter) == -1) {
                //Alert user of invalid input
                console.log(chalk.bgRed.bold('Sorry, "' + inputLetter + '" is not a valid guess option. Try again using only letters a-z.'));
                console.log(chalk.blue('Guesses Left: ' + game.guessesRemaining));
                console.log(chalk.magenta('Letters already guessed: ' + lettersGuessed));
                promptLoop();
            }
            //If statement to check if input exists in the alpha array AND checking if input exists in array of lettersGuessed
            else if (alpha.indexOf(inputLetter) != -1 && lettersGuessed.indexOf(inputLetter) != -1) {

                //Alert user that they've entered a previously submitted letter
                console.log(chalk.bgRed.bold("You have gussed '" + inputLetter + "'already. Try again using a new letter."));
                console.log(chalk.blue('Guesses Left: ' + game.guessesRemaining));
                console.log(chalk.magenta('Your previous guesses: ' + lettersGuessed));
                promptLoop();
            }
            else {
                //Add guessed letter to the lettersGuessed array
                lettersGuessed.push(inputLetter);

                //Check for the letter in the word
                var letterInWord = checkForLetter(inputLetter, game.currentWrd);

                //If the letter is in the word, update the letter object
                if (letterInWord) {

                    //Add to correct letters array
                    correctLetters.push(inputLetter);

                    //Update the dsiaply to the user
                    displayGameWord = new lettersToDisplay(game.currentWrd, correctLetters);
                    displayGameWord.parseDisplay();

                    //If statement to check if user has won
                    if (displayGameWord.winner) {
                        console.log(chalk.bold.cyan('/////////////////////////////////////////////////'));
                        console.log(chalk.bold.bgCyan('-------------------  YOU WIN!  ------------------'));
                        console.log(chalk.bold.cyan('/////////////////////////////////////////////////'));
                        return;
                    }
                    //If not a winner, display guesses remaining and guessed letters
                    else {
                        console.log(chalk.bold.blue('Guesses Left: ' + game.guessesRemaining));
                        console.log(chalk.bold.yellow('Your previous guesses: ' + lettersGuessed));
                        promptLoop();
                    }
                }
                //Decrement guesses and call the promptLoop function
                else {
                    game.guessesRemaining--;
                    displayGameWord.parseDisplay();
                    console.log(chalk.bold.blue('Guesses Left: ' + game.guessesRemaining));
                    console.log(chalk.bold.yellow('Your previous guesses: ' + lettersGuessed));
                    promptLoop();
                }
            }
        });
    }
    //If guessesRemaining == 0
    else {
        console.log(chalk.bold.red('/////////////////////////////////////////////////'));
        console.log(chalk.bgRed("You are out of guesses.  Game over."));
        console.log(chalk.bgRed("The word was '" + game.currentWrd + "'."));
        console.log(chalk.bgRed("To play again, type: 'node index.js'"));
        console.log(chalk.bold.red('/////////////////////////////////////////////////'));
    }
}

//Create a new game object using the constructor and begin the game
game.startGame();