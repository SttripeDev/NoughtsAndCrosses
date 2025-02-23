document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.querySelector(".game--status");
    const restartButton = document.querySelector(".game--restart");

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = true;

    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.getAttribute("data-cell-index");

        if (board[index] !== "" || !gameActive) {
            return; // Ignore clicks on filled cells or if the game is over
        }

        board[index] = currentPlayer;
        cell.innerHTML = `<img src="Images/${currentPlayer}.png" alt="Images/${currentPlayer}" width="80" height="80">`; // Set image

        checkWinner();

        if (gameActive) {
            togglePlayer();
        }
    }

    function togglePlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }

    function checkWinner() {
        for (let condition of winConditions) {
            let [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                statusText.textContent = `🎉 Player ${currentPlayer} wins! 🎉`;
                return;
            }
        }

        if (!board.includes("")) {
            gameActive = false;
            statusText.textContent = "😲 It's a draw!";
        }
    }

    function restartGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;

        cells.forEach(cell => {
            cell.innerHTML = ""; // Clear images
        });
    }

    // Attach event listeners
    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartButton.addEventListener("click", restartGame);

    // Initial game message
    statusText.textContent = `Player ${currentPlayer}'s turn`;
});
