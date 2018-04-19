// index.js will contain the logic of your app. Running it in Terminal/Bash will start the game.
// The app should end when a player guesses the correct word or runs out of guesses.

const chalk = require('chalk');

// Link in the Inquirer Package
var inquirer = require('inquirer');

// Link the list of random words
var guessWordList = require('./Words-dont-peek.js');

// Link in the word tester
var checkForLetter = require('./word.js');

// Link in the letters to display
var lettersToDisplay = require('./letter.js');

// ----------------------------- Global Variables -----------------------------
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var lettersAlreadyGuessed = [];
var lettersCorrectlyGuessed = [];
var displayHangman;

// ----------------------------- Game Object -----------------------------

var game = {

    wordBank: guessWordList, // import a list of words
    guessesRemaining: 10, // per word
    currentWrd: null, // the word object

    startGame: function () {
        // make sure the user has 10 guesses
        this.guessesRemaining = 10;
        // get a random word from the array
        var j = Math.floor(Math.random() * this.wordBank.length);
        this.currentWrd = this.wordBank[j];
        // Inform User game has begun
        console.log(chalk.bold.red("===============================WORD GUESS GAME================================"));
        console.log(chalk.bold.cyan('                 Try to guess the word below!  Category: '));
        // Show the empty letters ( _ _ _ _ ) and guesses, etc.
        displayHangman = new lettersToDisplay(this.currentWrd);
        displayHangman.parseDisplay();
        console.log(chalk.bold.green('\nGuesses Left: ' + game.guessesRemaining));
        console.log(chalk.bold.red("==============================================================================="));
        // prompt for a letter
        keepPromptingUser();
    }
};

// ----------------------------- User Prompt Function (stand alone b/c of scoping issues inside the game object) -----------------------------

function keepPromptingUser() {
    // Always make a gap between inputs
    console.log('');
    // If enough guesses left, then prompt for new letter
    if (game.guessesRemaining > 0) {
        inquirer.prompt([
            {
                type: "value",
                name: "letter",
                message: "Guess a Letter: "
            }
        ]).then(function (userInput) {
            // Collect Letter Input
            var inputLetter = userInput.letter.toLowerCase();
            // Valid input
            if (alphabet.indexOf(inputLetter) == -1) {
                // Tell user they did not guess a letter
                console.log(chalk.bgRed.bold('Sorry, "' + inputLetter + '" is not an acceptable guess. Try again!  Only use letters a-z.'));
                console.log(chalk.blue('Guesses Left: ' + game.guessesRemaining));
                console.log(chalk.magenta('Letters already guessed: ' + lettersAlreadyGuessed));
                keepPromptingUser();
            }
            else if (alphabet.indexOf(inputLetter) != -1 && lettersAlreadyGuessed.indexOf(inputLetter) != -1) {

                // Tell user they already guessed that letter
                console.log(chalk.bgRed.bold("You've already guessed " + inputLetter + '. Try again!'));
                console.log(chalk.blue('Guesses Left: ' + game.guessesRemaining));
                console.log(chalk.magenta('Letters already guessed: ' + lettersAlreadyGuessed));
                keepPromptingUser();
            }
            else {
                // Remove the entry from the list of possible inputs
                lettersAlreadyGuessed.push(inputLetter);

                // Check for the letter in the word
                var letterInWord = checkForLetter(inputLetter, game.currentWrd);

                // If the letter is in the word, update the letter object
                if (letterInWord) {

                    // Add to correct letters list
                    lettersCorrectlyGuessed.push(inputLetter);

                    // Show the empty letters ( _ _ _ _ ) and guesses, etc.
                    displayHangman = new lettersToDisplay(game.currentWrd, lettersCorrectlyGuessed);
                    displayHangman.parseDisplay();

                    //if statement to check if user has won
                    if (displayHangman.winner) {
                        console.log(chalk.bold.cyan('/////////////////////////////////////////////////'));
                        console.log(chalk.bold.bgCyan('-------------------  YOU WIN!  ------------------'));
                        console.log(chalk.bold.cyan('/////////////////////////////////////////////////'));
                        return;
                    }
                    // Not a win yet, so ask for another input and decrement guesses
                    else {
                        console.log('Guesses Left: ' + game.guessesRemaining);
                        console.log(chalk.bold.yellow('Letters already guessed: ' + lettersAlreadyGuessed));
                        keepPromptingUser();
                    }
                }
                // Otherwise, decrement guesses and re-prompt the old hangman object
                else {
                    game.guessesRemaining--;
                    displayHangman.parseDisplay();
                    console.log('Guesses Left: ' + game.guessesRemaining);
                    console.log('Letters already guessed: ' + lettersAlreadyGuessed);
                    keepPromptingUser();
                }
            }
        });
    }
    // If not enough guesses left, then user losses
    else {
        console.log(chalk.bold.red('/////////////////////////////////////////////////'));
        console.log(chalk.bgRed("You're not a winner this time..."));
        console.log(chalk.bgRed("The word was '" + game.currentWrd + "'."));
        console.log(chalk.bgRed("To play again, type: 'node index.js'"));
        console.log(chalk.bold.red('/////////////////////////////////////////////////'));
    }

}

// Create a new game object using the constructor and begin playing
game.startGame();