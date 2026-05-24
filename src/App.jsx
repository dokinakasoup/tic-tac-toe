import { useState ,  useEffect } from 'react';
import './App.css';

// 1. This is a sub-component for a single square
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}



// 2. This is the main App component
export default function App() {
  // State: An array of 9 elements representing the grid slots, initially all null
  const [board, setBoard] = useState(Array(9).fill(null));
  // State: Boolean to track if X is the next player
  const [xIsNext, setXIsNext] = useState(true);

  const [machine, setMachineMode] = useState(true);

  // const [c]

  // Function to handle clicks on individual squares
  function handleClick(index) {
    // If the square is already filled or the game is won, do nothing
    if (board[index] || calculateWinner(board)) return;

    // Create a copy of the board array (Don't mutate state directly!)
    const nextBoard = board.slice();

    // Assign X or O based on the current turn
    if (!mode) {
      if (xIsNext) {
        nextBoard[index] = 'X';
      } else {
        nextBoard[index] = 'O';
      }
    }
    else {  


    }

    // Update state, triggering React to re-render the Virtual DOM
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (board.every(square => square !== null)) {
    status = "It's a Draw!";
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  let mode;

  if (machine) {
    mode = "vs MACHINE";
  }
  else {
    mode = "vs HUMAN";
  }

  // Reset function to clear the board
  function handleReset() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="game-container">
      <h1 className="title">Tic-Tac-Toe</h1>

      <div className="status">{status}</div>

      <div className="mode">{mode}</div>

      <div className="board">
        <div className="board-row">
          <Square value={board[0]} onSquareClick={() => handleClick(0)} />
          <Square value={board[1]} onSquareClick={() => handleClick(1)} />
          <Square value={board[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={board[3]} onSquareClick={() => handleClick(3)} />
          <Square value={board[4]} onSquareClick={() => handleClick(4)} />
          <Square value={board[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={board[6]} onSquareClick={() => handleClick(6)} />
          <Square value={board[7]} onSquareClick={() => handleClick(7)} />
          <Square value={board[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>

      <button className="reset-btn" onClick={handleReset}>Restart Game</button>

      <h3>who will be your opponent? </h3>

      <div className="mode-setter">
        <button className="human" onClick={() => setMachineMode(false)}> HUMAN </button>
        <button className="machine" onClick={() => setMachineMode(true)}> MACHINE </button>
      </div>

    </div>
  );
}

// Helper function to check lines for a winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}