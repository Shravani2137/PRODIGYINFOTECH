const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const statusMessage = document.getElementById("statusMessage");
const restartBtn = document.getElementById("restartBtn");
const themeToggle = document.getElementById("themeToggle");
let isXTurn = true;
const WINNING_COMBINATIONS = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];
function startGame() {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
    cell.addEventListener("click", handleClick, { once: true });
  });
  isXTurn = true;
  statusMessage.textContent = "X's Turn";
}
function handleClick(e) {
  const cell = e.target;
  const current = isXTurn ? "X" : "O";
  cell.textContent = current;
  cell.classList.add(current.toLowerCase());

  if (checkWin(current)) {
    statusMessage.textContent = `${current} Wins!`;
    endGame();
  } else if (isDraw()) {
    statusMessage.textContent = `It's a Draw!`;
    endGame();
  } else {
    isXTurn = !isXTurn;
    statusMessage.textContent = `${isXTurn ? "X" : "O"}'s Turn`;
  }
}
function checkWin(current) {
  return WINNING_COMBINATIONS.some(combination =>
    combination.every(index =>
      cells[index].textContent === current
    )
  );
}
function isDraw() {
  return [...cells].every(cell =>
    cell.textContent === "X" || cell.textContent === "O"
  );
}
function endGame() {
  cells.forEach(cell => cell.removeEventListener("click", handleClick));
}
restartBtn.addEventListener("click", startGame);

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  themeToggle.textContent = document.body.classList.contains("dark-theme")
   ? "Dark Theme"
  : "Light Theme";
});

startGame();
