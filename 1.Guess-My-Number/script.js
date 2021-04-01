'use strict';

let secretNum = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

function displayText(cls, msg) {
  document.querySelector(cls).textContent = msg;
}

// This selects the button elem and waits for it to be clicked
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // There is no input
  if (!guess) {
    displayText('.message', 'Insert valid number! 🛑 ');

    // Input to be between 1 and 20
  } else if (guess > 20 || guess < 1) {
    displayText('.message', 'Number must be between 1 and 20! 🛑 ');

    // Check so the score is bigger than 0
  } else if (score > 1) {
    // Player wins
    if (guess === secretNum) {
      //Change the background color
      document.querySelector('body').style.backgroundColor = '#60b347';

      //Change the width of the white rectangle
      document.querySelector('.number').style.width = '30rem';

      displayText('.number', secretNum);
      displayText('.message', 'Corrent number!🎉');

      if (score > highscore) {
        highscore = score;
        displayText('.highscore', score);
      }

      // Input is less than the secret number
    } else {
      score--;
      displayText('.message', guess > secretNum ? 'Too high!' : 'Too low!');
    }
  } else {
    document.querySelector('.score').textContent = 0;
    displayText('.message', `You lost! 😢 Try again! `);
  }

  displayText('.score', score);
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20; //
  secretNum = Math.trunc(Math.random() * 20) + 1; //

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  displayText('.number', '?'); //

  displayText('.message', 'Start guessing...'); //
  displayText('.score', score); //
  document.querySelector('.guess').value = ''; //
});
