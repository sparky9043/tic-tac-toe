const generateUI = (function() {
  const gameMenu = document.querySelector('.game-menu');
  const rows = 3;
  const columns = 3;
  const panel = document.querySelector('.panel');
  const startBtn = document.querySelector('#start-button');
  const restartBtn = document.querySelector('.restart-button');

  const showGameMenu = (modal) => {
    modal.showModal();

    startBtn.addEventListener('click', (event) => {
      event.preventDefault();

      const inputs = document.querySelectorAll('.game-menu input');
      
      const players = game.getAllPlayers();

      const updatePlayerNames = (playersArray) => {
        for (let i = 0; i < playersArray.length; i++) {
          if (!inputs[i].value) playersArray[i].name = playersArray[i].name;
          else playersArray[i].name = inputs[i].value;
        }        
      }

      updatePlayerNames(players);

  
      gameMenu.close();
    });
  }

  showGameMenu(gameMenu);

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

  const attachEventListener = (boxesArray, restart) => {
    boxesArray.forEach(box => box.addEventListener('click', handleClick));
    restart.addEventListener('click', restartMatch);
  }

  attachEventListener(boxes, restartBtn);

  function handleClick(event) {
    const rowNumber = event.target.dataset.row;
    const columnNumber = event.target.dataset.column;
    event.target.removeEventListener('click', handleClick);

    game.startMatch(rowNumber, columnNumber, event.target);

    const winner = game.getWinner();

    if (winner) {
      removeUIFunctions(boxes);
    }
  }

  function restartMatch() {
    const board = game.getBoard();
    const winnerDisplay = document.querySelector('.winner-display');
    const playerTurn = document.querySelector('.player-turn');

    game.resetMatch(board);
    game.resetCurrentPlayer();
    for (const box of boxes) {
      box.textContent = '';
    }

    removeUIFunctions(boxes);
    attachEventListener(boxes, restartBtn);
    winnerDisplay.textContent = '';
    playerTurn.textContent = 'Press on a box to begin';
  }

  const removeUIFunctions = (boxesArray) => {
    boxesArray.forEach(box => box.removeEventListener('click', handleClick));
  }

})();

const GameConsole = () => {
  const rows = 3;
  const columns = 3;
  const emptyMarker = null;

  const players = [
    {
      name: 'Player One',
      marker: 'x',
    },
    {
      name: 'Player Two',
      marker: 'o',
    },  
  ];

  let winner;
  let currentPlayer = players[0];

  const getAllPlayers = () => players;

  const getCurrentPlayer = () => currentPlayer;

  const updateCurrentPlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  }

  const resetCurrentPlayer = () => {
    currentPlayer = players[0];
  }

  const displayCurrentPlayer = (currentPlayer) => {
    const playerTurn = document.querySelector('.player-turn');
    playerTurn.textContent = `${currentPlayer.name}'s Turn`;
  }

  const board = [];
  const filteredBoard = [];

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
  const getFilteredBoard = () => filteredBoard;

  const startMatch = (row, column, target) => {
    if (row < 0 || row > 2 || column < 0 || column > 2) return;
    else if (board[row][column] !== null) return;
    board[row][column] = currentPlayer.marker;
    filteredBoard.push(currentPlayer.marker);

    console.log(filteredBoard);
    winner = checkWinner(board);
    updateUI(target);
    if (winner) {
      showWinner(winner);
      while (filteredBoard.length > 0) {
        filteredBoard.pop();
        console.log(filteredBoard);
      }
    }
    updateCurrentPlayer();
    displayCurrentPlayer(getCurrentPlayer());
    
    if (filteredBoard.length === 9) {
      const winnerDisplay = document.querySelector('.winner-display');
      winnerDisplay.textContent = "It's a draw!";
      while (filteredBoard.length > 0) {
        filteredBoard.pop();
        console.log(filteredBoard);
      }
    }
  }

  const updateUI = (target) => {
    target.textContent = getCurrentPlayer().marker;
  }

  const showWinner = (winnerName = "It's a tie!") => {
    const winnerDisplay = document.querySelector('.winner-display');
    winnerDisplay.textContent = `${winnerName.name} wins!`;
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

  const getWinner = () => winner;

  const resetMatch = (boardArray) => {
    generateBoard(boardArray);
    console.log(boardArray);
  }

  return {
    getBoard,
    startMatch,
    resetMatch,
    resetCurrentPlayer,
    getAllPlayers,
    getCurrentPlayer,
    getFilteredBoard,
    getWinner,
  }
}

const game = GameConsole();
