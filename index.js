"use strict";
/*variables, constants, globals*/

//target score from user input
let targetScore = 100;

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

//players divs elements
const player1Div = document.getElementById("player1-div");
const player2Div = document.getElementById("player2-div");

//dice elements
const firstDiceImg = document.getElementById("dice-1");
const secondDiceImg = document.getElementById("dice-2");

// all buttons elements
const rollDiceBtn = document.getElementById("roll-dice-btn");
const holdBtn = document.getElementById("hold-btn");

// current scores elements
const currentScorePlayer1 = document.getElementById("current-score-player1");
const currentScorePlayer2 = document.getElementById("current-score-player2");

//total scores elements
const totalScorePlayer1 = document.getElementById("player1-total-score");
const totalScorePlayer2 = document.getElementById("player2-total-score");

/* sound effects */
const diceRollSound = document.querySelector("#dice-roll-sound");
const winningSound = document.querySelector("#winning-sound");
const openingSound = document.querySelector("#opening-screen-sound");
const sadSound = document.querySelector("#sad-sound");
const switchSound = document.querySelector("#switch-turn-sound");

[1, 2].forEach((player) => {
  let storage = localStorage.getItem("roll_dice");
  if (storage) {
    let scores = JSON.parse(storage);
    document.querySelector(`#player${player}WinCount`).innerText =
      scores[`player${player}WinCount`];
  }
});

/*functions*/
/**
 * autoplay opening music when page loads
 */
function autoPlayOpeningMusic() {
  openingSound.play();
}

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

/**
 * checks if current player reached the target score
 *
 */
function checkTargetScore() {
  if (player1.isPlayingNow) {
    if (player1.totalScore > targetScore) {
      player2.isWinner = true;
    } else if (player1.totalScore === targetScore) {
      player1.isWinner = true;
    }
  } else if (player2.isPlayingNow) {
    if (player2.totalScore > targetScore) {
      player1.isWinner = true;
    } else if (player2.totalScore === targetScore) {
      player2.isWinner = true;
    }
  }
}

/**
 * prints winner message
 *
 */
function printWinner() {
  const winnerH2 = document.createElement("h2");
  winnerH2.innerText = "WINNER!";
  let scores = JSON.parse(
    localStorage.getItem("roll_dice") ||
      JSON.stringify({
        player1WinCount: 0,
        player2WinCount: 0,
      })
  );
  if (player1.isWinner === true) {
    //add sound effect
    winningSound.play();
    player1Div.appendChild(winnerH2);
    scores.player1WinCount += 1;
  } else if (player2.isWinner === true) {
    //add sound effect
    winningSound.play();
    player2Div.appendChild(winnerH2);
    scores.player2WinCount += 1;
  }
  if (player1.isWinner || player2.isWinner) {
    document.getElementById("roll-dice-btn").disabled = true;
    document.getElementById("hold-btn").disabled = true;
    localStorage.setItem("roll_dice", JSON.stringify(scores));
  }
}

/*event listeners*/

//all events of roll dice button
rollDiceBtn.addEventListener("click", function (e) {
  //add roll dice animation
  firstDiceImg.classList.remove("roll-dice-animation");
  secondDiceImg.classList.remove("roll-dice-animation");
  void firstDiceImg.offsetHeight; //force page rerender
  void secondDiceImg.offsetHeight;
  firstDiceImg.classList.add("roll-dice-animation");
  secondDiceImg.classList.add("roll-dice-animation");

  //add sound effect
  diceRollSound.play();
  rollDice();
  firstDiceImg.setAttribute("src", `./assets/images/dice-${dice[0]}.png`);
  secondDiceImg.setAttribute("src", `./assets/images/dice-${dice[1]}.png`);

  //   double 6 zeros the current score
  if (dice[0] === 6 && dice[1] === 6) {
    doubleSixModal.style.display = "block";
    sadSound.play();
    setTimeout(function () {
      doubleSixModal.style.display = "none";
    }, 3000);

    player1.currentScore = 0;
    player2.currentScore = 0;
    player1.isPlayingNow = !player1.isPlayingNow;
    player2.isPlayingNow = !player2.isPlayingNow;
    if (player1.isPlayingNow) {
      player1Div.style.backgroundColor = "var(--active-player-color)";
      player2Div.style.backgroundColor = "var(--inactive-player-color)";
    } else if (player2.isPlayingNow) {
      player2Div.style.backgroundColor = "var(--active-player-color)";
      player1Div.style.backgroundColor = "var(--inactive-player-color)";
    }
  } else {
    updateCurrentScore(dice);
  }
  currentScorePlayer1.innerText = player1.currentScore;
  currentScorePlayer2.innerText = player2.currentScore;
});

// all events of hold button
holdBtn.addEventListener("click", function (e) {
  //add sound effect
  switchSound.play();
  //add current to total score in player's object
  if (player1.isPlayingNow) {
    player1.totalScore += player1.currentScore;
  } else if (player2.isPlayingNow) {
    player2.totalScore += player2.currentScore;
  }

  //update innertext of total score element by updated player's object
  totalScorePlayer1.innerText = player1.totalScore;
  totalScorePlayer2.innerText = player2.totalScore;

  //zero current score
  player1.currentScore = 0;
  player2.currentScore = 0;
  currentScorePlayer1.innerText = 0;
  currentScorePlayer2.innerText = 0;

  checkTargetScore();
  printWinner();
  //change who is the active player
  player1.isPlayingNow = !player1.isPlayingNow;
  player2.isPlayingNow = !player2.isPlayingNow;

  //swap background colors with effect
  if (player1.isPlayingNow) {
    player1Div.style.backgroundColor = "var(--active-player-color)";
    player2Div.style.backgroundColor = "var(--inactive-player-color)";
  } else if (player2.isPlayingNow) {
    player2Div.style.backgroundColor = "var(--active-player-color)";
    player1Div.style.backgroundColor = "var(--inactive-player-color)";
  }
});
