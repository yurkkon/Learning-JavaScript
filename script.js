'use strict';

const scoreP1 = document.querySelector('#score--0');
const scoreP2 = document.querySelector('#score--1');
const DiceIMG = document.querySelector('.dice');
const btnRollDice = document.querySelector('.btn--roll');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const btnHoldScore = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

let scores, currentScore, activePlayer;

gameIsRestarted();
function rollDice() {
  const dice = Math.trunc(Math.random() * 6) + 1;
  DiceIMG.classList.remove('hidden');
  DiceIMG.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  } else {
    switchPlayer();
  }
}

function btnHoldAcction() {
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    activePlayer === 0 ? scores[0] : scores[1];
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;

  if (scores[activePlayer] >= 20) {
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    btnNewGame.addEventListener('click', gameIsRestarted);
    btnHoldScore.removeEventListener('click', btnHoldAcction);
    btnRollDice.removeEventListener('click', rollDice);
  } else {
    switchPlayer();
  }
}

function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 1 ? 0 : 1;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

function gameIsRestarted() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;

  scoreP1.textContent = 0;
  scoreP2.textContent = 0;
  DiceIMG.classList.add('hidden');

  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  btnNewGame.removeEventListener('click', gameIsRestarted);
  btnHoldScore.addEventListener('click', btnHoldAcction);
  btnRollDice.addEventListener('click', rollDice);
}
