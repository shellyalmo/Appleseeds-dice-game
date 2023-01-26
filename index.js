/*variables, constants, globals*/

// players objects initialized
let player1 = {
  totalScore: 0,
  currentScore: 0,
  isPlayingNow: true,
};
let player2 = {
  totalScore: 0,
  currentScore: 0,
  isPlayingNow: false,
};

//dice saved as an array
let dice = [0, 0];

//dice elements
const firstDiceImg = document.getElementById("dice-1");
const secondDiceImg = document.getElementById("dice-2");

// new game button element
const rollDiceBtn = document.getElementById("roll-dice-btn");

/*functions*/

/**
 * generates random number from 1 to 6
 * @returns {Number} returns one random number
 */
function randomNumber() {
  return Math.floor(Math.random() * 6) + 1;
}

/**
 * updates both values of the dice array with the rolling dice results
 *
 */
function rollDice() {
  dice[0] = randomNumber();
  dice[1] = randomNumber();
}

// if the player rolls a double six all his round’s score
// gets lost.After that, it's the next player’s turn.

/*event listeners*/
rollDiceBtn.addEventListener("click", function (e) {
  rollDice();
  firstDiceImg.setAttribute("src", `./assets/dice-${dice[0]}.png`);
  secondDiceImg.setAttribute("src", `./assets/dice-${dice[1]}.png`);
});
