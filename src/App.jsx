import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { saveGameToStorage, resetGameStorage } from './logic/storage'


function App() {

  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem('board');
    return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem('turn');
    return JSON.parse(turnFromLocalStorage) ?? TURNS.X;
  });
  const [winner, setWinner] = useState(null); // null: no hay ganador, false: empate y true: hay ganador

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
  }

  const updateBoard = (index) => {

    // no actualizamos si ya tiene valor o hay un ganador
    if (board[index] || winner) return;

    // actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // Guardar partida
    saveGameToStorage({board: newBoard, turn: newTurn})

    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      // Igual que setWinner(newWinner)⬇️
      // setWinner((prevWinner) => {
      //   console.log(`El ganador es ${newWinner} y el anterior es ${prevWinner}`);
      //   return newWinner
      // });
      setWinner(newWinner);
    }

    // hubo empate
    else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>TRES EN RAYA</h1>

      <button onClick={resetGame}>Reiniciar</button>

      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}>
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
