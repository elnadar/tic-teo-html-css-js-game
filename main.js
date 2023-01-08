var currentLitter = true;
var objArr = document.querySelectorAll(".obj");
var moveCount = 0; // Add a move count variable

function playersModal() {
  // Get modal element
  const modal = document.getElementById("playersModal");

  // Check if player names are in local storage
  if (!localStorage.getItem("player1") || !localStorage.getItem("player2")) {
    // Show modal
    modal.style.display = "block";
  }

  // Get submit button element
  const submitBtn = document.getElementById("submitBtn");

  // Add click event listener to submit button
  submitBtn.addEventListener("click", function () {
    // Get player 1 and player 2 name inputs
    const player1 = document.getElementById("player1").value;
    const player2 = document.getElementById("player2").value;

    // Store player names in local storage
    localStorage.setItem("player1", player1);
    localStorage.setItem("player2", player2);

    // Close modal
    modal.style.display = "none";
  });
}

window.onload = function () {
  playersModal();
};

objArr.forEach((element) => {
  element.onclick = function () {
    if (this.innerHTML == "") {
      this.innerHTML = currentLitter ? "X" : "O";
      currentLitter = !currentLitter;
      moveCount++; // Increment the move count
      updateTurn();

      // Check if someone has won the game
      if (checkForWin()) {
        // Get player names from local storage
        const player1 = localStorage.getItem("player1");
        const player2 = localStorage.getItem("player2");

        // Determine which player won
        const winner = currentLitter ? player2 : player1;

        // Add the game result to the game history
        addGameResult({ player: winner, result: "win" });

        showModal(`${winner} has won the game!`);
        resetGame();
      }
      // Check if the game is a tie
      else if (moveCount == 9) {
        showModal("The game is a tie!");
        resetGame();
      }
    }
  };
});

function checkForWin() {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      objArr[i * 3].innerHTML == objArr[i * 3 + 1].innerHTML &&
      objArr[i * 3 + 1].innerHTML == objArr[i * 3 + 2].innerHTML &&
      objArr[i * 3].innerHTML != ""
    ) {
      return true;
    }
  }
  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      objArr[i].innerHTML == objArr[i + 3].innerHTML &&
      objArr[i + 3].innerHTML == objArr[i + 6].innerHTML &&
      objArr[i].innerHTML != ""
    ) {
      return true;
    }
  }
  // Check diagonals
  if (
    objArr[0].innerHTML == objArr[4].innerHTML &&
    objArr[4].innerHTML == objArr[8].innerHTML &&
    objArr[0].innerHTML != ""
  ) {
    return true;
  }
  if (
    objArr[2].innerHTML == objArr[4].innerHTML &&
    objArr[4].innerHTML == objArr[6].innerHTML &&
    objArr[2].innerHTML != ""
  ) {
    return true;
  }
  return false;
}
// Get the refresh button
var refreshBtn = document.getElementById("refreshBtn");

// Add an event listener to the refresh button
refreshBtn.addEventListener("click", function () {
  // Call the refresh function
  resetGame();
});

// Add a resetGame function
function resetGame() {
  // Get the refresh button
  var refreshBtn = document.getElementById("refreshBtn");

  // Disable the refresh button and add the loading class
  refreshBtn.disabled = true;
  refreshBtn.classList.add("loading");

  // Reset all the values in the obj elements to an empty string
  objArr.forEach((element) => {
    element.innerHTML = "";
  });

  // Reset the current litter and move count
  currentLitter = true;
  moveCount = 0;

  // Update the turn display
  updateTurn();

  // Re-enable the refresh button and remove the loading class
  refreshBtn.disabled = false;
  refreshBtn.classList.remove("loading");
}

// Get turn element
const turn = document.getElementById("turn");

// Get player names from local storage
const player1 = localStorage.getItem("player1");
const player2 = localStorage.getItem("player2");

// Set initial turn message
turn.innerHTML = `It is ${player1}'s turn (X)`;

// Update turn message when it changes
function updateTurn() {
  if (!currentLitter) {
    turn.innerHTML = `It is ${player2}'s turn (O)`;
  } else {
    turn.innerHTML = `It is ${player1}'s turn (X)`;
  }
}

// Get the modal element
var modal = document.getElementById("myModal");

// Get the message element
var message = document.getElementById("message");
// Get all close elements
const closeElements = document.getElementsByClassName("close");

// Add click event listeners to all close elements
for (const closeElement of closeElements) {
  closeElement.addEventListener("click", function () {
    // Close modal
    modal.style.display = "none";
  });
}

// When the user clicks anywhere outside of the modal
function showModal(text) {
  modal.style.display = "block";
  message.innerHTML = text;
}

// Check if game history exists in local storage
if (!localStorage.getItem("gameHistory")) {
  // If not, create empty game history array
  localStorage.setItem("gameHistory", JSON.stringify([]));
}

// Function to add game result to game history
function addGameResult(result) {
  // Get game history from local storage
  let gameHistory = JSON.parse(localStorage.getItem("gameHistory"));

  // Add new game result to game history
  gameHistory.push(result);

  // Update game history in local storage
  localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
}
