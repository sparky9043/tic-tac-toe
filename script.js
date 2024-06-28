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
    updateCurrentPlayer();
    console.log(currentPlayer, board);
  }

  return {
    getBoard,
    startMatch,
  }
}

const game = GameConsole();