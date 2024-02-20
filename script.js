let attemptsLeft = 5;
let guessedNumbers = [];
const randomNumber = Math.floor(Math.random() * 100) + 1;

function checkGuess() {
    const guessInput = document.getElementById('guessInput');
    const message = document.getElementById('message');
    const guess = parseInt(guessInput.value);
    
    // Check if the guess is a valid number between 1 and 100
    if (guess >= 1 && guess <= 100) {
        // Check if the guess has already been made
        if (!guessedNumbers.includes(guess)) {
            // Add the guess to the guessed numbers array
            guessedNumbers.push(guess);
            
            // Highlight the selected number in the table
            document.getElementById(`cell${guess}`).classList.add('selected');
            
            // Check if the player has attempts left
            if (attemptsLeft > 0) {
                // Check if the guess is correct
                if (guess === randomNumber) {
                    message.innerHTML = `Congratulations! You guessed the number ${randomNumber} correctly!`;
                    openModal('Victory', 'green', '😃');
                } else if (guess < randomNumber) {
                    message.innerHTML = 'Too low! Try again.';
                    attemptsLeft--;
                } else {
                    message.innerHTML = 'Too high! Try again.';
                    attemptsLeft--;
                }

                // Check if the player has used all attempts
                if (attemptsLeft === 0) {
                    message.innerHTML = `Sorry, you've run out of attempts. The correct number was ${randomNumber}.`;
                    openModal('Loss', 'red', '😞');
                } else {
                    message.innerHTML += `<br>You've guessed: ${guessedNumbers.join(', ')}`;
                }
            }
        } else {
            message.innerHTML = `You've already guessed the number ${guess}. Please choose a different number.`;
        }
    } else {
        message.innerHTML = 'Please enter a number between 1 and 100.';
    }
}

function openModal(result, color, emoji) {
    const modal = document.getElementById('resultModal');
    const modalMessage = document.getElementById('modalMessage');
    
    modalMessage.innerHTML = `${result}! ${emoji}`;
    modalMessage.style.color = color;
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('resultModal');
    modal.style.display = 'none';
}

function restartGame() {
    window.location.reload();
}

// Generate the number table
const numberTable = document.getElementById('numberTable');
let counter = 1;
for (let i = 0; i < 10; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 10; j++) {
        const cell = document.createElement('td');
        cell.id = `cell${counter}`; // Set the cell id
        cell.textContent = counter;
        row.appendChild(cell);
        counter++;
    }
    numberTable.appendChild(row);
}
