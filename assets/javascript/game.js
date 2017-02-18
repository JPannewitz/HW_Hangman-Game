var wordList = [
	"supergirl",
	"flash",
	"catwoman",
	"aquaman",
	"hawkgirl"
];

var chosenWord = "";
var lettersInChosenWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongGuesses = [];

var winCounter = 0;
var lossCounter = 1;
var numGuesses = 9;

function startGame() {
	numGuesses = 9;
	blanksAndSuccesses = [];
	wrongGuesses = [];

	chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
	lettersInChosenWord = chosenWord.split("");
	numBlanks = lettersInChosenWord.length;
	for (var i = 0; i < numBlanks; i++) {
		blanksAndSuccesses.push("_ ");
	}
	document.getElementById("word-blank").innerHTML = blanksAndSuccesses.join("");
	document.getElementById("guesses-left").innerHTML = numGuesses;

}

function checkLetters(letter) {
	var letterInWord = false;
	for (var i=0; i < numBlanks; i++) {
		if(chosenWord[i] === letter) {
			letterInWord = true;
		}
	}

	if(letterInWord) {
		for (var i=0; i<numBlanks; i++) {
			if(chosenWord[i] === letter) {
				blanksAndSuccesses[i] = letter;
			}
		}
	}else {
		numGuesses--;
		wrongGuesses.push(letter);
	}
}

function roundComplete() {
	document.getElementById('word-blank').innerHTML = blanksAndSuccesses.join("");
	document.getElementById('guesses-left').innerHTML = numGuesses;
	document.getElementById('wrong-guesses').innerHTML = wrongGuesses.join("");

	if(lettersInChosenWord.join("") === blanksAndSuccesses.join("")) {
		winCounter++;
		alert("Victory!");
		document.getElementById('win-counter').innerHTML = winCounter;
		startGame();
	}else if(numGuesses === 0) {
		document.getElementById('loss-counter').innerHTML = lossCounter++;
		document.getElementById('wrong-guesses').innerHTML = "";
		alert("You've been defeated");
		startGame()
	}
}

startGame();

document.onkeyup = function(event) {
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	console.log("this is the letter we typed", letterGuessed);
	checkLetters(letterGuessed);
	roundComplete();
}
