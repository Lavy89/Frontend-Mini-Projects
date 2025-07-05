let currentPlayer = "☀️";
let arr = Array(9).fill(null);
let gameOver = false;

// Initialize the game
document.addEventListener("DOMContentLoaded", () => {
  // Add keyboard support
  document.querySelectorAll(".col").forEach((cell) => {
    cell.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        handleClick(cell);
      }
    });
  });
});

function handleClick(el) {
  if (gameOver) return;

  const id = Number(el.id);
  if (arr[id] !== null) return;

  arr[id] = currentPlayer;
  el.innerText = currentPlayer;
  el.setAttribute("aria-label", `${currentPlayer} marked this cell`);

  checkWinners();

  if (!gameOver) {
    currentPlayer = currentPlayer === "☀️" ? "🌚" : "☀️";
    updateTurnIndicator();
  }
}

function checkWinners() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (arr[a] && arr[a] === arr[b] && arr[b] === arr[c]) {
      showWinner(`${currentPlayer} won!`);
      return;
    }
  }

  if (!arr.includes(null)) {
    showWinner("It's a draw!");
  }
}

function showWinner(message) {
  gameOver = true;
  const popup = document.getElementById("winnerPopup");
  document.getElementById("winnerText").textContent = message;

  const gif = document.getElementById("winnerGif");
  gif.src = message.includes("won")
    ? "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXpseTN4a2I5OWU1YzdrejJwajV2MWFzY2toZ2JyOGQ4MnVncGsydCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/kyLYXonQYYfwYDIeZl/giphy.gif"
    : "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjlzcGJqOGI1dnNydGM4bjN5cmdjNmZ2OTEycXU3YXN6dXUzbDc1cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9fqrSLku9wBJS/giphy.gif";
  gif.style.display = "block";

  popup.showModal();
}

function updateTurnIndicator() {
  document.getElementById(
    "turnIndicator"
  ).textContent = `${currentPlayer}'s turn`;
}

function resetGame() {
  arr.fill(null);
  document.querySelectorAll(".col").forEach((box) => {
    box.innerText = "";
   
  });

  currentPlayer = "☀️";
  gameOver = false;
  updateTurnIndicator();

  const popup = document.getElementById("winnerPopup");
  popup.close();
  document.getElementById("winnerGif").style.display = "none";
}
