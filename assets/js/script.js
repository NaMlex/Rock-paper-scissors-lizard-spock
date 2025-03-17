const restartGameButton = document.querySelector(".restart");
const rules = document.getElementById("rules");
const modal = document.getElementById("modal");
const span = document.getElementsByClassName("close")[0];
const playAgainButton = document.querySelector(".play-again");
let playerChoice;
let computerChoice;
let your_Score = 0; 
let computer_Score = 0;
let round_Score = 0;

// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.querySelectorAll(".player-choice");

    for (let button of buttons) {
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

// Computer generates answer 
function getComputerChoice() {
    const pick = choices[Math.floor(Math.random() * choices.length)];
    return pick;
}

// Determine the result and display it
function displayResult() {
    // Get computer's choice
    computerChoice = getComputerChoice();

    let message = '';
    let roundWinner = '';

    if (playerChoice === computerChoice) {
        message = `It's a tie! You both picked ${computerChoice}.`;
        roundWinner = 'tie';
    } else if ((playerChoice === 'rock' && (computerChoice === 'scissors' || computerChoice === 'lizard')) ||
               (playerChoice === 'paper' && (computerChoice === 'rock' || computerChoice === 'spock')) ||
               (playerChoice === 'scissors' && (computerChoice === 'paper' || computerChoice === 'lizard')) ||
               (playerChoice === 'lizard' && (computerChoice === 'paper' || computerChoice === 'spock')) ||
               (playerChoice === 'spock' && (computerChoice === 'rock' || computerChoice === 'scissors'))) {
        message = `You win! The computer picked ${computerChoice}.`;
        yourScore();
        roundWinner = 'player';
    } else {
        message = `You lose! The computer picked ${computerChoice}.`;
        computerScore();
        roundWinner = 'computer';
    }

    // Show message and round results
    document.querySelector(".choice-message").innerText = message;
    document.querySelector(".result-message").classList.add('show');
    
    roundGame(roundWinner);
}

// Update your score 
function yourScore() {
    your_Score++;
    document.querySelector(".your-score").innerText = your_Score;
}

// Update computer's score 
function computerScore() {
    computer_Score++;
    document.querySelector(".computer-score").innerText = computer_Score;
}

// Round score calculation and update
function roundGame() {
    // If it's the first round, initialize round score
    if (round_Score === 0) {
        round_Score = 1;
    } else {
        round_Score++;
    }
    document.querySelector(".round-score").innerText = round_Score;

    // Check if round score has reached 5
    if (round_Score === 5) {
        if (your_Score > computer_Score) {
            gameOver('Player', 'Computer');
        } else if (your_Score < computer_Score) {
            gameOver('Computer', 'Player');
        } else {
            gameOver('No one', 'No one');
        }
    }
}

// Game Over Function (Show Play Again button)
function gameOver(winner) {
    // Display game over message
    document.querySelector(".final-result").innerText = `${winner} wins the game!`;
    document.querySelector(".result-message").classList.add('show');
    
    // Hide the player choice buttons and show the "Play Again" button
    document.querySelectorAll(".player-choice").forEach(button => {
        button.disabled = true;
    });

    // Show the Play Again button
    document.querySelector(".play-again").style.display = "inline-block";
}

// Play Again Function
document.querySelector(".play-again").addEventListener('click', function() {
    restartGame();
});

// Restart the game
function restartGame() {
    your_Score = 0;
    computer_Score = 0;
    round_Score = 0;
    document.querySelector(".your-score").innerText = your_Score;
    document.querySelector(".computer-score").innerText = computer_Score;
    document.querySelector(".round-score").innerText = round_Score;

    // Hide the Play Again button
    document.querySelector(".play-again").style.display = "none";

    // Enable player choices again
    document.querySelectorAll(".player-choice").forEach(button => {
        button.disabled = false;
    });

    // Clear any previous result message
    document.querySelector(".choice-message").innerText = "";
    document.querySelector(".final-result").innerText = "";
    document.querySelector(".result-message").classList.remove('show');
}

// Rules of the Game
rules.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

