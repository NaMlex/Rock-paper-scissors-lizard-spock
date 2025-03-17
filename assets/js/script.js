const restartGameButton = document.querySelector(".restart");
const rules = document.getElementById("rules");
const modal = document.getElementById("modal");
const span = document.getElementsByClassName("close")[0];
const playAgainButton = document.querySelector(".play-again");
let playerChoice;
let computerChoice;
let yourScore = 0;
let computerScore = 0;
let roundScore = 0;

// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.querySelectorAll(".player-choice");

    for(let button of buttons) {
        button.addEventListener("click", function() {
            playerChoice = this.getAttribute("data-choice");
            displayResult();
        });
    }
});

// Hide the "Play Again" button initially
playAgainButton.style.display = 'none';

// Restarts the game
restartGameButton.addEventListener('click', function() {
    restartGame();
});

// Choices array 
const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

/** 
 * function that generates the computer answer 
 * @returns {object} 
 */
function getComputerChoice() {
    const pick = choices[Math.floor(Math.random() * choices.length)];
    return pick;
}

/** 
 * function gets the result and display it
 */
function displayResult() {

    computerChoice = getComputerChoice();

    let message = '';
    let roundWinner = '';

    if(playerChoice === computerChoice) {
        message = `It's a tie! You both picked ${computerChoice}.`;
        roundWinner = 'tie';
    } else if((playerChoice === 'rock' && (computerChoice === 'scissors' || computerChoice === 'lizard')) ||
        (playerChoice === 'paper' && (computerChoice === 'rock' || computerChoice === 'spock')) ||
        (playerChoice === 'scissors' && (computerChoice === 'paper' || computerChoice === 'lizard')) ||
        (playerChoice === 'lizard' && (computerChoice === 'paper' || computerChoice === 'spock')) ||
        (playerChoice === 'spock' && (computerChoice === 'rock' || computerChoice === 'scissors'))) {
        message = `You win! The computer picked ${computerChoice}.`;
        yourScores();
        roundWinner = 'player';
    } else {
        message = `You lose! The computer picked ${computerChoice}.`;
        computerScores();
        roundWinner = 'computer';
    }

    // Show message and round results
    document.querySelector(".choice-message").innerText = message;
    document.querySelector(".result-message").classList.add('show');

    roundGame(roundWinner);
}

/** 
 * function updates your score 
 * @param{number} increment +1
 */
function yourScores() {
    yourScore++;
    document.querySelector(".your-score").innerText = yourScore;
}

/** 
 * function updates computer's score
 * @param{number} increment +1
 */
function computerScores() {
    computerScore++;
    document.querySelector(".computer-score").innerText = computerScore;
}

/** 
 * function calculates the round score and updates it
 * if it's the first round, initialize round score
 * checks if the round score has reached 5
 */
function roundGame() {

    if(roundScore === 0) {
        roundScore = 1;
    } else {
        roundScore++;
    }
    document.querySelector(".round-score").innerText = roundScore;


    if(roundScore === 5) {
        if(yourScore > computerScore) {
            gameOver('Player', 'Computer');
        } else if(yourScore < computerScore) {
            gameOver('Computer', 'Player');
        } else {
            gameOver('No one', 'No one');
        }
    }
}

/** 
 * game Over Function (Show Play Again button)
 * display game over message
 * hide the player choice buttons and show the "Play Again" button
 * show the Play Again button
 * play Again Function
 */
function gameOver(winner) {

    document.querySelector(".final-result").innerText = `${winner} wins the game!`;
    document.querySelector(".result-message").classList.add('show');

    document.querySelectorAll(".player-choice").forEach(button => {
        button.disabled = true;
    });

    document.querySelector(".play-again").style.display = "inline-block";
}

document.querySelector(".play-again").addEventListener('click', function() {
    restartGame();
});

/** 
 * restart the game
 * hide the Play Again button
 * enable player choices again
 * clear any previous result message
 */
function restartGame() {
    yourScore = 0;
    computerScore = 0;
    roundScore = 0;
    document.querySelector(".your-score").innerText = yourScore;
    document.querySelector(".computer-score").innerText = computerScore;
    document.querySelector(".round-score").innerText = roundScore;
    document.querySelector(".play-again").style.display = "none";


    document.querySelectorAll(".player-choice").forEach(button => {
        button.disabled = false;
    });

    document.querySelector(".choice-message").innerText = "";
    document.querySelector(".final-result").innerText = "";
    document.querySelector(".result-message").classList.remove('show');
}

/** 
 * rules of the Game
 */
rules.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}