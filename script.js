const GameConsole = () => {
  const rows = 3;
  const columns = 3;
  const emptyMarker = null;

  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(emptyMarker);
    }
  }

  const getBoard = () => board;

  const startMatch = () => {
    console.log('hello');
  }

  return {
    getBoard,
    startMatch,
  }
}

const game = GameConsole();