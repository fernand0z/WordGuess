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
        console.log(chalk.bold.red("============================================================================================================================================================================="));

        console.log(chalk.bold.red("oooooo   oooooo     oooo                          .o8       .oooooo.                                                 .oooooo.                                         "));
        console.log(chalk.bold.red(" `888.    `888.     .8'                           888      d8P``  `Y8b                                               d8P'  `Y8b                                        "));
        console.log(chalk.bold.red("  `888.   .8888.   .8'    .ooooo.  oooo d8b  .oooo888     888           oooo  oooo   .ooooo.   .oooo.o  .oooo.o    888            .oooo.   ooo. .oo.  .oo.    .ooooo. "));
        console.log(chalk.bold.red("   `888  .8'`888. .8'    d88' `88b `888**8P d88' `888     888           `888  `888  d88' `88b d88(  `8 d88(  `8    888           `P  )88b  `888P`Y88bP`Y88b  d88' `88b"));
        console.log(chalk.bold.red("    `888.8'  `888.8'     888   888  888     888   888     888     ooooo  888   888  888ooo888 ``Y88b.  ``Y88b.     888     ooooo  .oP`888   888   888   888  888ooo888"));
        console.log(chalk.bold.red("     `888'    `888'      888   888  888     888   888     `88.    .88'   888   888  888    .o o.  )88b o.  )88b    `88.    .88'  d8(  888   888   888   888  888    .o"));
        console.log(chalk.bold.red("      `8'      `8'       `Y8bod8P' d888b    `Y8bod88P`     `Y8bood8P'    `V88V`V8P' `Y8bod8P' 8``888P' 8``888P'     `Y8bood8P'   `Y888``8o o888o o888o o888o `Y8bod8P'"));
        console.log(chalk.bold.red("============================================================================================================================================================================="));
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
                        console.log(chalk.bold.cyan('///////////////////////////////////////////////////////////////////////////////////////////////'));
                        console.log(chalk.bold.cyan(' ÛÛÛÛÛ ÛÛÛÛÛ    ÛÛÛÛÛÛÛ    ÛÛÛÛÛ  ÛÛÛÛÛ    ÛÛÛÛÛ   ÛÛÛ   ÛÛÛÛÛ ÛÛÛÛÛ ÛÛÛÛÛÛ   ÛÛÛÛÛ ÛÛÛ'));
                        console.log(chalk.bold.cyan(' °°ÛÛÛ °°ÛÛÛ   ÛÛÛ°°°°°ÛÛÛ °°ÛÛÛ  °°ÛÛÛ    °°ÛÛÛ   °ÛÛÛ  °°ÛÛÛ °°ÛÛÛ °°ÛÛÛÛÛÛ °°ÛÛÛ °ÛÛÛ'));
                        console.log(chalk.bold.cyan('  °°ÛÛÛ ÛÛÛ   ÛÛÛ     °°ÛÛÛ °ÛÛÛ   °ÛÛÛ     °ÛÛÛ   °ÛÛÛ   °ÛÛÛ  °ÛÛÛ  °ÛÛÛ°ÛÛÛ °ÛÛÛ °ÛÛÛ'));
                        console.log(chalk.bold.cyan('   °°ÛÛÛÛÛ   °ÛÛÛ      °ÛÛÛ °ÛÛÛ   °ÛÛÛ     °ÛÛÛ   °ÛÛÛ   °ÛÛÛ  °ÛÛÛ  °ÛÛÛ°°ÛÛÛ°ÛÛÛ °ÛÛÛ'));
                        console.log(chalk.bold.cyan('    °°ÛÛÛ    °ÛÛÛ      °ÛÛÛ °ÛÛÛ   °ÛÛÛ     °°ÛÛÛ  ÛÛÛÛÛ  ÛÛÛ   °ÛÛÛ  °ÛÛÛ °°ÛÛÛÛÛÛ °ÛÛÛ'));
                        console.log(chalk.bold.cyan('     °ÛÛÛ    °°ÛÛÛ     ÛÛÛ  °ÛÛÛ   °ÛÛÛ      °°°ÛÛÛÛÛ°ÛÛÛÛÛ°    °ÛÛÛ  °ÛÛÛ  °°ÛÛÛÛÛ °°° '));
                        console.log(chalk.bold.cyan('     ÛÛÛÛÛ    °°°ÛÛÛÛÛÛÛ°   °°ÛÛÛÛÛÛÛÛ         °°ÛÛÛ °°ÛÛÛ      ÛÛÛÛÛ ÛÛÛÛÛ  °°ÛÛÛÛÛ ÛÛÛ'));
                        console.log(chalk.bold.cyan('    °°°°°       °°°°°°°      °°°°°°°°           °°°   °°°      °°°°° °°°°°    °°°°° °°° '));
                        console.log(chalk.bold.cyan('///////////////////////////////////////////////////////////////////////////////////////////////'));
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
        console.log(chalk.bold.red('///////////////////////////////////////////////////////////////////'));
        console.log(chalk.red("        __   __            _                     "));
        console.log(chalk.red("        \\ \\ / /__  _   _  | |    ___  ___  ___   "));
        console.log(chalk.red("         \\ V / _ \\| | | | | |   / _ \\/ __|/ _ \\  "));
        console.log(chalk.red("          | | (_) | |_| | | |__| (_) \\__ \\  __/_ "));
        console.log(chalk.red("          |_|\\___/ \\__,_| |_____\\___/|___/\\___(_)"));
        console.log(chalk.red("                                                 "));
        console.log(chalk.red("          ____                         ___                 "));
        console.log(chalk.red("         / ___| __ _ _ __ ___   ___   / _ \\__   _____ _ __ "));
        console.log(chalk.red("        | |  _ / _` | '_ ` _ \\ / _ \\ | | | \\ \\ / / _ \\ '__|"));
        console.log(chalk.red("        | |_| | (_| | | | | | |  __/ | |_| |\\ V /  __/ | _ "));
        console.log(chalk.red("         \\____|\\__,_|_| |_| |_|\\___|  \\___/  \\_/ \\___|_|(_)"));    
        console.log("");
        console.log(chalk.bgRed("You are out of guesses."));
        console.log(chalk.bgRed("The word was '" + game.currentWrd + "'."));
        console.log(chalk.bgRed("To play again, type: 'node index.js'"));
        console.log(chalk.bold.red('///////////////////////////////////////////////////////////////////'));
    }
}

//Create a new game object using the constructor and begin the game
game.startGame();