"use strict";
// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const newGameBtn = document.getElementById("new-game-btn");

// Get the button that closes the modal
const startGameBtn = document.getElementById("start-game-btn");

// When the user clicks the button, open the modal
newGameBtn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on start game button, close the modal
startGameBtn.onclick = function () {
  modal.style.display = "none";
};

/*event handler for clicking the start game button in the modal */
startGameBtn.addEventListener("click", function (e) {
  //initialize the target value from the user input
  targetScore = document.getElementById("targetscore").valueAsNumber;
  // players objects initialized
  let player1 = {
    totalScore: 0,
    currentScore: 0,
    isPlayingNow: true,
    isWinner: false,
  };
  let player2 = {
    totalScore: 0,
    currentScore: 0,
    isPlayingNow: false,
    isWinner: false,
  };

  //dice saved as an array
  let dice = [0, 0];

  //activate the game buttons
  document.getElementById("roll-dice-btn").disabled = false;
  document.getElementById("hold-btn").disabled = false;
});
