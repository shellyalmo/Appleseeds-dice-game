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
