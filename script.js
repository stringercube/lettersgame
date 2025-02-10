// script.js
const gridContainer = document.getElementById('grid');
const targetLetterInput = document.getElementById('target-letter');
const countButton = document.getElementById('count-button');
const resultDisplay = document.getElementById('result');
const newGameButton = document.getElementById('new-game-button');
const keypad = document.getElementById('keypad');
const keypadInput = document.getElementById('keypad-input');
const keypadKeys = document.querySelectorAll('.keypad-keys button');
const clearKey = document.getElementById('clear-key');
const submitKey = document.getElementById('submit-key');

let gridLetters = [];
let targetLetter = '';
let startTime;
let score = 0;

// Generate a random lowercase letter
function getRandomLetter() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

// Generate the grid with a guaranteed target letter
function generateGrid() {
  gridLetters = [];
  gridContainer.innerHTML = '';
  targetLetter = getRandomLetter(); // Randomly select a target letter

  // Ensure the target letter appears at least once
  const targetPosition = Math.floor(Math.random() * 72); // 6x12 = 72 cells
  for (let i = 0; i < 72; i++) {
    if (i === targetPosition) {
      gridLetters.push(targetLetter); // Place the target letter
    } else {
      gridLetters.push(getRandomLetter()); // Fill other cells with random letters
    }
    const cell = document.createElement('div');
    cell.textContent = gridLetters[i];
    gridContainer.appendChild(cell);
  }

  startTime = new Date(); // Start the timer
  targetLetterInput.value = targetLetter; // Display the target letter
}

// Count occurrences of the target letter
function countOccurrences() {
  return gridLetters.filter(letter => letter === targetLetter).length;
}

// Show the keypad
function showKeypad() {
  keypad.style.display = 'flex';
  keypadInput.value = '';
}

// Hide the keypad
function hideKeypad() {
  keypad.style.display = 'none';
}

// Handle keypad input
keypadKeys.forEach(button => {
  button.addEventListener('click', () => {
    if (button.id === 'clear-key') {
      keypadInput.value = '';
    } else if (button.id === 'submit-key') {
      const userCount = keypadInput.value;
      const endTime = new Date();
      const timeElapsed = ((endTime - startTime) / 1000).toFixed(2); // Time in seconds

      const correctCount = countOccurrences();
      if (parseInt(userCount) === correctCount) {
        resultDisplay.textContent = `¡Correcto! Tiempo: ${timeElapsed} segundos.`;
        score++;
      } else {
        resultDisplay.textContent = `Incorrecto. La cuenta correcta es ${correctCount}.`;
      }
      hideKeypad();
    } else {
      keypadInput.value += button.textContent;
    }
  });
});

// Handle the count button click
countButton.addEventListener('click', showKeypad);

// Handle the new game button click
newGameButton.addEventListener('click', () => {
  generateGrid();
  resultDisplay.textContent = '';
});

// Initialize the grid when the page loads
generateGrid();