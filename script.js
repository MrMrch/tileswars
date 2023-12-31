document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 8;
    const maxDotsPerTile = 3;
    let board = createBoard(boardSize);
    let currentPlayer = 'player1';
    let firstMove = true;

    function switchPlayer() {
        currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
        if (firstMove) {
            firstMove = false;
        } else {
            document.querySelectorAll('.tile').forEach(tile => {
                if (!tile.classList.contains(currentPlayer)) {
                    tile.classList.add('no-click');
                } else {
                    tile.classList.remove('no-click');
                }
            });
        }
    }

    document.getElementById('gameBoard').addEventListener('click', (e) => {
        if (e.target.classList.contains('tile') && !e.target.classList.contains('no-click')) {
            let [row, col] = e.target.id.split('-').map(Number);
            addDot(board, row, col, currentPlayer);
            renderBoard(board);
            switchPlayer();
        }
    });

    renderBoard(board);
});

function createBoard(size) {
    let board = [];
    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            row.push({ dots: 0, player: null });
        }
        board.push(row);
    }
    return board;
}

function renderBoard(board) {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    board.forEach((row, i) => {
        row.forEach((cell, j) => {
            let tile = document.createElement('div');
            tile.id = `${i}-${j}`;
            tile.className = 'tile';
            if (cell.player) {
                tile.classList.add(cell.player);
            }
            if (cell.dots > 0) {
                let dot = document.createElement('span');
                dot.className = 'dot';
                dot.textContent = cell.dots;
                tile.appendChild(dot);
            }
            gameBoard.appendChild(tile);
        });
    });
}

function addDot(board, row, col, player) {
    let tile = board[row][col];
    if (tile.player === player || tile.player === null || firstMove) {
        tile.dots++;
        tile.player = player;
        if (tile.dots === 4) {
            explode(board, row, col, player);
        }
    }
}

function explode(board, row, col, player) {
    board[row][col].dots = 0; // Tile explodes and loses all dots
    [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]].forEach(([r, c]) => {
        if (r >= 0 && r < board.length && c >= 0 && c < board.length) {
            let adjTile = board[r][c];
            adjTile.player = player;
            adjTile.dots++;
            if (adjTile.dots === 4) {
                explode(board, r, c, player); // Recursively explode adjacent tiles
            }
        }
    });
}

function spreadDot(board, row, col, player) {
    if (row >= 0 && row < board.length && col >= 0 && col < board[row].length) {
        let adjacentTile = board[row][col];
        if (adjacentTile.player !== player) {
            adjacentTile.player = player;
        }
        adjacentTile.dots++;
        if (adjacentTile.dots > maxDotsPerTile) {
            explode(board, row, col, player);
        }
    }
}
