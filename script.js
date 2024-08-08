const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.getElementById('resultMessage');
const newGameButton = document.getElementById('newGameButton');
const turnIndicator = document.getElementById('turnIndicator');
const confettiContainer = document.getElementById('confetti');
const sparksContainer = document.getElementById('sparks');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const handleCellClick = (e) => {
  const cell = e.target;
  const index = cell.getAttribute('data-index');

  if (gameState[index] !== '' || checkWin() || checkDraw()) {
    return;
  }

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    showResult(`${currentPlayer} wins!`);
  } else if (checkDraw()) {
    showResult('It\'s a draw!');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnIndicator.textContent = `Player ${currentPlayer}'s turn`;
  }
};

const checkWin = () => {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return true;
    }
  }
  return false;
};

const checkDraw = () => {
  return gameState.every(cell => cell !== '');
};

const showResult = (message) => {
  resultMessage.textContent = message;
  resultScreen.style.display = 'flex';
  startConfetti();
  startSparks();
};

const resetGame = () => {
  gameState.fill('');
  currentPlayer = 'X';
  cells.forEach(cell => cell.textContent = '');
  resultScreen.style.display = 'none';
  turnIndicator.textContent = `Player ${currentPlayer}'s turn`;
  stopConfetti();
  stopSparks();
};

const startConfetti = () => {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confettiContainer.appendChild(confetti);
  }
};

const startSparks = () => {
  for (let i = 0; i < 50; i++) {
    const spark = document.createElement('div');
    spark.style.left = `${Math.random() * 100}%`;
    spark.style.animationDuration = `${Math.random() * 2 + 1}s`;
    sparksContainer.appendChild(spark);
  }
};

const stopConfetti = () => {
  confettiContainer.innerHTML = '';
};

const stopSparks = () => {
  sparksContainer.innerHTML = '';
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', resetGame);
