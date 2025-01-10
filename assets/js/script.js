//From Math Project, Code Institute and adapted for this project
// Wait for the DOM to finish loading before running the game
const restartBtn = document.querySelector(".restart");
let your_score = 0;
let computer_score = 0;


document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.querySelectorAll(".player-choice");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-choice") === computerChoice()) {
                alert('You got it');
                yourScore();
            } else {
                alert(`Try again the correct answer was` );
                computerScore();
            }
        });
    }
});

restartBtn.addEventListener('click', function(){
    restartGame();
});


//Choices array 
const choice = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

//Computer generates answer 
function computerChoice() {
    const pick = choice[Math.floor(Math.random() * choice.length)];
    return pick;
    }
   

//Your score 
function yourScore(){
    your_score = document.querySelector(".your-score").innerText;
    document.querySelector(".your-score").innerText = ++your_score;
}



//Computer Score 
function computerScore(){
    computer_score = document.querySelector(".computer-score").innerText;
    document.querySelector(".computer-score").innerText = ++computer_score;
}

//Restart
function restartGame(){
    your_score = 0;
    computer_score = 0;
    document.querySelector(".your-score").innerText = your_score;
    document.querySelector(".computer-score").innerText = computer_score;
}

