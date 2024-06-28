const GameConsole = () => {
  const rows = 3;
  const columns = 3;

  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
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