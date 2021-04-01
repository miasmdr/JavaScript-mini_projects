'use strict';

//Selecting elements:
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1'); //another way to get the elem with a specific ID: only works for id
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const scores = [0, 0];
let gameState = true;
let currentScore = 0;
let currentPlayer = 0;

// Starting Point
dice.classList.add('hidden');
score0.textContent = 0;
score1.textContent = 0;

function switchPlayer() {
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer ? 0 : 1;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

// Rolling the dice
btnRoll.addEventListener('click', function () {
  if (gameState) {
    // 1. Generate random dice roll:
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    dice.classList.remove('hidden');
    dice.src = `dice-${diceNumber}.png`;
    console.log(diceNumber);

    // 3. Check against one
    if (diceNumber !== 1) {
      // add the dice to the current score
      currentScore += diceNumber;
      document.getElementById(
        `current--${currentPlayer}`
      ).textContent = currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

// Holding the score
btnHold.addEventListener('click', function () {
  if (gameState) {
    // 1. Add current score
    scores[currentPlayer] += currentScore;
    document.querySelector(`#score--${currentPlayer}`).textContent =
      scores[currentPlayer];

    // 2. Check if player's score is >= 100
    //Finish the game
    if (scores[currentPlayer] >= 100) {
      gameState = false;

      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.toggle('player--active');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.toggle('player--winner');
      dice.classList.add('hidden');
    } else {
      // 3. Switch PLayer
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  if (scores[0] >= 100 || scores[1] >= 100) {
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.remove('player--winner');
    player0.classList.add('player--active');
  } else if (player1.classList.contains('player--active')) {
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
  }

  scores[0] = scores[1] = 0;
  score0.textContent = 0;
  score1.textContent = 0;

  document.getElementById(`current--${currentPlayer}`).textContent = 0;

  currentPlayer = 0;
  currentScore = 0;
  gameState = true;
});
