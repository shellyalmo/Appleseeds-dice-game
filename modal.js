"use strict";
// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const newGameBtn = document.getElementById("new-game-btn");

// Get the button that closes the modal
const startGameBtn = document.getElementById("start-game-btn");

// get the double 6 modal
const doubleSixModal = document.getElementById("double-six-modal");

// When the user clicks the button, open the modal
newGameBtn.onclick = function () {
  //refresh the page when starting a new game
  window.location.reload();
};

// When the user clicks on start game button, close the modal
startGameBtn.onclick = function () {
  openingSound.pause();
  modal.style.display = "none";
};

/*event handler for clicking the start game button in the modal */
startGameBtn.addEventListener("click", function (e) {
  //initialize the target value from the user input
  targetScore = document.getElementById("targetscore").valueAsNumber;
});
