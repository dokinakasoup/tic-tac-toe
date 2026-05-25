import { useState, useEffect } from 'react';
import './App.css';

function Square({ value, onSquareClick, isWinningSquare }) {
  const colorClass = value === 'X' ? 'x-style' : value === 'O' ? 'o-style' : '';
  
  const winningClass = isWinningSquare ? 'winning-square' : '';

  return (
    <button className={`square ${colorClass} ${winningClass}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [machine, setMachineMode] = useState(true);

  const winInfo = calculateWinner(board); 
  const winner = winInfo ? winInfo.player : null;
  const winningLine = winInfo ? winInfo.line : null;

  useEffect(() => {
    if (machine && !xIsNext && !winner && board.some(s => s === null)) {
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
  }, [xIsNext, machine, board, winner]);

  function handleClick(index) {
    if (board[index] || winner || (machine && !xIsNext)) return;

    const nextBoard = board.slice();
    nextBoard[index] = xIsNext ? 'X' : 'O';

    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  }

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


  function getLineClass() {
    if (!winningLine) return '';
    const str = winningLine.join('');
    if (str === '012') return 'line-row-0';
    if (str === '345') return 'line-row-1';
    if (str === '678') return 'line-row-2';
    if (str === '036') return 'line-col-0';
    if (str === '147') return 'line-col-1';
    if (str === '258') return 'line-col-2';
    if (str === '048') return 'line-diag-main';
    if (str === '246') return 'line-diag-anti';
    return '';
  }

  return (
    <div className="game-container">
      <h1 className="title">Tic-Tac-Toe</h1>

      <div className="status">{status}</div>
      <div className="mode">{mode}</div>

      {}
      <div className="board-wrapper">
        <div className="board">
          <div className="board-row">
            <Square value={board[0]} onSquareClick={() => handleClick(0)} isWinningSquare={winningLine?.includes(0)} />
            <Square value={board[1]} onSquareClick={() => handleClick(1)} isWinningSquare={winningLine?.includes(1)} />
            <Square value={board[2]} onSquareClick={() => handleClick(2)} isWinningSquare={winningLine?.includes(2)} />
          </div>
          <div className="board-row">
            <Square value={board[3]} onSquareClick={() => handleClick(3)} isWinningSquare={winningLine?.includes(3)} />
            <Square value={board[4]} onSquareClick={() => handleClick(4)} isWinningSquare={winningLine?.includes(4)} />
            <Square value={board[5]} onSquareClick={() => handleClick(5)} isWinningSquare={winningLine?.includes(5)} />
          </div>
          <div className="board-row">
            <Square value={board[6]} onSquareClick={() => handleClick(6)} isWinningSquare={winningLine?.includes(6)} />
            <Square value={board[7]} onSquareClick={() => handleClick(7)} isWinningSquare={winningLine?.includes(7)} />
            <Square value={board[8]} onSquareClick={() => handleClick(8)} isWinningSquare={winningLine?.includes(8)} />
          </div>
        </div>
        
        {}
        {winner && <div className={`strike-line ${getLineClass()}`} />}
      </div>

      <button className="reset-btn" onClick={handleReset}>Restart Game</button>

      <div className="mode-setter">
        <button className="human" onClick={() => setMachineMode(false)}> MULTI PLAYER </button>
        <button className="machine" onClick={() => setMachineMode(true)}> SINGLE PLAYER </button>
      </div>
    </div>
  );
}

// Updated to return an object tracking the path line
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: lines[i] };
    }
  }
  return null;
}

function minimax(squares, depth, isMaximizing, alpha, beta) {
  const winInfo = calculateWinner(squares);
  const winner = winInfo ? winInfo.player : null;
  
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