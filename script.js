const generateUI = (function() {
  const rows = 3;
  const columns = 3;
  const panel = document.querySelector('.panel');
  
  const makeBoxes = (target) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const box = document.createElement('div');
        box.dataset.column = j;
        target.appendChild(box);        
      }
    }
  }

  makeBoxes(panel);

  const boxes = document.querySelectorAll('.panel div');

  const assignRowToBoxes = (boxesArray) => {
    const rowNumbers = [
      0, 0, 0,
      1, 1, 1,
      2, 2, 2,
    ];

    for (let i = 0; i < boxesArray.length; i++) {
      boxesArray[i].dataset.row = rowNumbers[i];
    }

  }

  assignRowToBoxes(boxes);

  const attachEventListener = (boxesArray) => {
    boxesArray.forEach(box => box.addEventListener('click', handleClick));
  }

  attachEventListener(boxes);

  function handleClick(event) {
    const rowNumber = event.target.dataset.row;
    const columnNumber = event.target.dataset.column;

    game.startMatch(rowNumber, columnNumber);
  }

})();

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

  const generateBoard = function(boardArray) {
    while (boardArray.length > 0) {
      boardArray.pop();
    }

    for (let i = 0; i < rows; i++) {
      boardArray[i] = [];
      for (let j = 0; j < columns; j++) {
        boardArray[i].push(emptyMarker);
      }
    }
  }

  generateBoard(board);


  const getBoard = () => board;

  const startMatch = (row, column) => {
    if (row < 0 || row > 2 || column < 0 || column > 2) return;
    else if (board[row][column] !== null) return;
    board[row][column] = currentPlayer.marker;
    let winner = checkWinner(board);
    console.log(board);
    if (winner) {
      resetMatch(board);
    } else {
      updateCurrentPlayer();
    }
  }

  const checkWinner = (boardArray) => {
    const flatBoard = boardArray.flat();
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
        return currentPlayer;
      }
    }

    if (!flatBoard.includes(null)) {
      resetMatch(board);
    }

    return null;
  }

  const resetMatch = (boardArray) => {
    generateBoard(boardArray);
    
  }

  return {
    getBoard,
    startMatch,
  }
}

const game = GameConsole();
