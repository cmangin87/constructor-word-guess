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