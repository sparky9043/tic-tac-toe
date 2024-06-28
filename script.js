const GameConsole = () => {
  const rows = 3;
  const columns = 3;
  const emptyMarker = null;

  const players = [
    {
      name: 'playerOne',
      marker: 'x',
    },
    {
      name: 'playerTwo',
      marker: 'o',
    },
  ];

  let currentPlayer = players[0];
  const updateCurrentPlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  }

  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(emptyMarker);
    }
  }

  const getBoard = () => board;

  const startMatch = (row, column) => {
    if (row < 0 || row > 2 || column < 0 || column > 2) return;
    else if (board[row][column] !== null) return;
    board[row][column] = currentPlayer.marker;
    checkWinner(board);
    updateCurrentPlayer();
  }

  const checkWinner = (boardArray) => {
    const flatBoard = boardArray.flat();
    console.log(board);
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (flatBoard[a] && flatBoard[a] === flatBoard[b] && flatBoard[b] === flatBoard[c]) {
        console.log('winner');
      }
    }
  }

  return {
    getBoard,
    startMatch,
  }
}

const game = GameConsole();