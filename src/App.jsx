import { useState, useEffect } from 'react';
import './App.css';


function Square({ value, onSquareClick }) {

  const colorClass = value === 'X' ? 'x-style' : value === 'O' ? 'o-style' : '';

  return (
    <button className={`square ${colorClass}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}


export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [machine, setMachineMode] = useState(true);

  
  useEffect(() => {
    
    if (machine && !xIsNext && !calculateWinner(board) && board.some(s => s === null)) {
      
    
      const timer = setTimeout(() => {
        const bestMove = findBestMove(board);
        if (bestMove !== -1) {
          const nextBoard = board.slice();
          nextBoard[bestMove] = 'O';
          setBoard(nextBoard);
          setXIsNext(true);
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [xIsNext, machine, board]);

  
  function handleClick(index) {
  
    if (board[index] || calculateWinner(board) || (machine && !xIsNext)) return;

    const nextBoard = board.slice();
    nextBoard[index] = xIsNext ? 'X' : 'O';

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

  const mode = machine ? "vs MACHINE" : "vs HUMAN";

  
  function handleReset() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="game-container">
      {/* <h1 c lassName="title">Tic-Tac-Toe</h1> */}

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

      {/* <h3>Who will be your opponent?</h3> */}

      <div className="mode-setter">
        <button className="human" onClick={() => setMachineMode(false)}> MULTI PLAYER </button>
        <button className="machine" onClick={() => setMachineMode(true)}> SINGLE PLAYER </button>
      </div>
    </div>
  );
}



function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


function minimax(squares, depth, isMaximizing, alpha, beta) {
  const winner = calculateWinner(squares);
  

  if (winner === 'O') return 10 - depth; 
  if (winner === 'X') return depth - 10; 
  if (squares.every(s => s !== null)) return 0;

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = 'O'; 
        let score = minimax(squares, depth + 1, false, alpha, beta);
        squares[i] = null; 
        maxEval = Math.max(maxEval, score);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break; 
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = 'X'; 
        let score = minimax(squares, depth + 1, true, alpha, beta);
        squares[i] = null; 
        minEval = Math.min(minEval, score);
        beta = Math.min(beta, score);
        if (beta <= alpha) break; 
      }
    }
    return minEval;
  }
}


function findBestMove(squares) {
  let bestVal = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      squares[i] = 'O';
      
      let moveVal = minimax(squares, 0, false, -Infinity, Infinity);
      squares[i] = null;

      if (moveVal > bestVal) {
        bestVal = moveVal;
        bestMove = i;
      }
    }
  }
  return bestMove;
}