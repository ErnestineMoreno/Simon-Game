// console.log('Come stai, Tina?')

const effects = [
new Audio('ErnestineMoreno1zapsplat_multimedia_click_002_19368.mp3'),
new Audio('ErnestineMoreno1zapsplat_multimedia_click_002_19368.mp3'),
new Audio('ErnestineMoreno1zapsplat_multimedia_click_002_19368.mp3'),
new Audio('ErnestineMoreno1zapsplat_multimedia_click_002_19368.mp3')
];

function playSound (audio) {
effects[audio].play();
}

let gamePlay = false;
let sequence = [];
let currentSequence = 0;
let timeout;
let strictMode = false;
let gameboard = document.querySelectorAll('.gamecontainer');
let prompts = document.querySelector('#prompts');
let startButton = document.querySelector('.start');
let resetButton = document.querySelector('.reset');
let strictButton = document.querySelector('.strictMode');

for(let i=0; i<gameboard.length; i++) {
const number = i; 
gameboard[i].onclick = function() {
		if(!gamePlay) return;
		
		playSound(number);
		if(number === sequence[currentSequence]) {
			if(currentSequence+1 === sequence.length) {
					gamePlay = false;
					if(sequence.length < 20) {
						createLastSequence();
						prompts.innerHTML = "PERFECT, KEEP IT UP!"
						timeout = setTimeout(showSequence, 2000);
						currentSequence = 0;
					}
					else {
						prompts.innerHTML = "Awesome! You won!";
						timeout = setTimeout(reset, 2000);
					}	
			}
			else {
				currentSequence++;
			}
		}
		else {
			prompts.innerHTML = "NOPE, WRONG!";
			gamePlay = false;
			setTimeout(function() {
				if(strictMode) {
					reset();
				}
				else {
					currentSequence = 0;
					gamePlay = false;
					prompts.innerHTML = "TRY AGAIN!";
					timeout = setTimeout(showSequence, 2000);
				}
			}, 2000);

		}
	}
}

startButton.onclick = function () {
	this.disabled = true;
	start();
}

resetButton.onclick = reset;

function reset() {
	startButton.disabled = false;
	sequence = [];
	currentSequence = 0;
	gamePlay = false;
	clearTimeout(timeout);
	prompts.innerHTML = "Click START to play again!";
}

strictButton.onclick = function() {
	if(strictMode) {
		this.innerHTML = "STRICT MODE: OFF";
		this.className = this.className.replace(' strict', '');
	}
	else {
		this.innerHTML = "STRICT MODE: ON";
		this.className += ' strict';
	}

	strictMode = !strictMode;
}

function start() {
	createLastSequence();
	prompts.innerHTML = 'READY, SET, GO!';
	timeout = setTimeout(showSequence, 2000);
}


function createLastSequence() {
	sequence.push(rand(0, 3));
}

function showSequence() {
	if(currentSequence > sequence.length-1) {
		currentSequence = 0;
		prompts.innerHTML = sequence.length+' click sequence';
		gamePlay = true;
		return;
	}

	let id = sequence[currentSequence];

	playSound(id);
	gameboard[id].className += ' active';

	setTimeout(function() {

		gameboard[id].className = gameboard[id].className.replace(' active', '');

		currentSequence++;

		timeout = setTimeout(showSequence, 0.3*1000); 

	}, 0.6 * 1000);

	prompts.innerHTML = 'FOCUS';
}


function rand(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}