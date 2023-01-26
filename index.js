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

// current scores elements
const currentScorePlayer1 = document.getElementById("current-score-player1");
const currentScorePlayer2 = document.getElementById("current-score-player2");

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

/**
 * updates current score of each player according to the dice result at each dice roll
 *@param {Array} lastDiceResults
 */
function updateCurrentScore(lastDiceResults) {
  if (player1.isPlayingNow) {
    player1.currentScore += dice[0] + dice[1];
  } else if (player2.isPlayingNow) {
    player2.currentScore += dice[0] + dice[1];
  }
}

// if the player rolls a double six all his round’s score
// gets lost.After that, it's the next player’s turn.

/*event listeners*/

//all events of roll dice button
rollDiceBtn.addEventListener("click", function (e) {
  rollDice();
  firstDiceImg.setAttribute("src", `./assets/dice-${dice[0]}.png`);
  secondDiceImg.setAttribute("src", `./assets/dice-${dice[1]}.png`);
  updateCurrentScore(dice);
  currentScorePlayer1.innerText = player1.currentScore;
  currentScorePlayer2.innerText = player2.currentScore;
});
