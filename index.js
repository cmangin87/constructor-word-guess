var Word = require("./word.js");
var inquirer = require("inquirer");

var letterArray = "abcdefghijklmnopqrstuvwxyz";

var MajorUSCities = [
  "albuquerque",
  "anaheim",
  "anchorage",
  "arlington",
  "atlanta",
  "aurora",
  "austin",
  "bakersfield",
  "baltimore",
  "boston",
  "bronx",
  "brooklyn",
  "buffalo",
  "charlotte",
  "chicago",
  "chula vista",
  "cincinnati",
  "cleveland",
  "colorado springs",
  "columbus",
  "corpus christi",
  "dallas",
  "denver",
  "detroit",
  "el paso",
  "ewa",
  "fayette",
  "fort wayne",
  "fort worth",
  "fresno",
  "greensboro",
  "henderson",
  "honolulu",
  "houston",
  "indianapolis",
  "jacksonville",
  "jersey city",
  "kansas city",
  "kendale lakes lindgren acres",
  "las vegas",
  "lexington fayette",
  "lincoln",
  "long beach",
  "los angeles",
  "louisville",
  "manhattan",
  "memphis",
  "mesa",
  "miami",
  "milwaukee",
  "minneapolis",
  "nashville",
  "new orleans",
  "new york city",
  "newark",
  "oakland",
  "oklahoma city",
  "omaha",
  "orlando",
  "philadelphia",
  "phoenix",
  "pittsburgh",
  "plano",
  "portland",
  "queens",
  "raleigh",
  "riverside",
  "sacramento",
  "san antonio",
  "san diego",
  "san francisco",
  "san gabriel valley",
  "san jose",
  "santa ana",
  "seattle",
  "st louis",
  "st paul",
  "staten island",
  "stockton",
  "tampa",
  "toledo",
  "tucson",
  "tulsa",
  "virginia beach",
  "washington dc",
  "wichita"
];

var randomIndex = Math.floor(Math.random() * MajorUSCities.length);
var randomWord = MajorUSCities[randomIndex];

computerWord = new Word(randomWord);

var requireNewWord = false;

var incorrectLetters = [];
var correctLetters = [];

var guessesLeft = 10;

function newWord() {
  if (requireNewWord) {
    var randomIndex = Math.floor(Math.random() * MajorUSCities.length);
    var randomWord = MajorUSCities[randomIndex];

    computerWord = new Word(randomWord);

    requireNewWord = false;
  }

  var wordComplete = [];
  computerWord.objectArray.forEach(completeCheck);

  if (wordComplete.includes(false)) {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Guess a letter!",
          name: "userinput"
        }
      ])
      .then(function(input) {
        if (
          !letterArray.includes(input.userinput) ||
          input.userinput.length > 1
        ) {
          console.log("\nTry again!\n");
          newWord();
        } else {
          if (
            incorrectLetters.includes(input.userinput) ||
            correctLetters.includes(input.userinput) ||
            input.userinput === ""
          ) {
            console.log("\nWhoops! You guessed that one already!\n");
            newWord();
          } else {
            var wordCheckArray = [];

            computerWord.userGuess(input.userinput);

            computerWord.objectArray.forEach(wordCheck);
            if (wordCheckArray.join("") === wordComplete.join("")) {
              console.log("\n--------------------\n");
              console.log("\nIncorrect\n");
              console.log("\n--------------------\n");

              incorrectLetters.push(input.userinput);
              guessesLeft--;
            } else {
              console.log("\n--------------------\n");
              console.log("\nCorrect!\n");
              console.log("\n--------------------\n");

              correctLetters.push(input.userinput);
            }

            computerWord.log();

            console.log("\n--------------------\n");
            console.log("Guesses Left: " + guessesLeft + "\n");
            console.log("\n--------------------\n");

            console.log("\n--------------------\n");
            console.log(
              "Letters Guessed: " + incorrectLetters.join(" ") + "\n"
            );
            console.log("\n--------------------\n");

            if (guessesLeft > 0) {
              newWord();
            } else {
              console.log("You lose!\n");

              restartGame();
            }

            function wordCheck(key) {
              wordCheckArray.push(key.guessed);
            }
          }
        }
      });
  } else {
    console.log("You win!\n");

    restartGame();
  }

  function completeCheck(key) {
    wordComplete.push(key.guessed);
  }
}

function restartGame() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to:",
        choices: ["Play Again", "Exit"],
        name: "restart"
      }
    ])
    .then(function(input) {
      if (input.restart === "Play Again") {
        requireNewWord = true;
        incorrectLetters = [];
        correctLetters = [];
        guessesLeft = 10;
        newWord();
      } else {
        return;
      }
    });
}

newWord();
