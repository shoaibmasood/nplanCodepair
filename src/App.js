/**
 * Below you have the barebones of a tic-tac-toe game in React
 * We'd like you to go through the following tasks:
 * 1. Implement the stubbed-out functions in order to make the game functional
 * 2. Make the game state persistent between refreshes
 * 3. Implement a persistent game history, that allows the user to step back and forth
 *    through each state of the game
 */
import * as React from "react";

const Board = ({ squares, onSquareClick }) => {
  const renderSquare = (i) => {
    return (
      <button className="square" onClick={() => onSquareClick(i)}>
        {squares[i]}
      </button>
    );
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game = () => {
  const [squares, setCopySq] = React.useState(Array(9).fill(null));

  console.log("abc", localStorage.getItem("player1"));

  React.useEffect(() => {
    if (localStorage.getItem("player1") == null) return;
    let prevValue = localStorage.getItem("player1");
    setCopySq(JSON.parse(prevValue));
  }, []);

  console.log(squares);

  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  const selectSquare = (i) => {
    // implement what happens when a square is clicked
    console.log(i);
    // [null, null, null]
    // i = 0
    // ['X', null, null]

    const squCopy = [...squares];
    if (squCopy[i] !== null) return;
    squCopy[i] = nextValue;
    setCopySq(squCopy);
    localStorage.setItem("player1", JSON.stringify(squCopy));

    console.log(squCopy);

    return;
  };

  const restart = () => {
    // implement game restart
    setCopySq(Array(9).fill(null));
    localStorage.removeItem("player1");
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board onSquareClick={selectSquare} squares={squares} />
        <button className="restart" onClick={restart}>
          Restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
      </div>
    </div>
  );
};

// HELPERS

const calculateStatus = (winner, squares, nextValue) => {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
};

const calculateNextValue = (squares) => {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

// App

const App = () => {
  return <Game />;
};

export default App;
