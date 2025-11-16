// src/routes/GamePage.jsx
import { useEffect } from "react";
import { SudokuProvider, useSudoku } from "../sudoku/SudokuContext";
import SudokuBoard from "../sudoku/SudokuBoard";
import Timer from "../sudoku/Timer";


function GameInner() {
  const { state, dispatch, mode } = useSudoku();


  useEffect(() => {
    const id = setInterval(() => dispatch({ type: "TICK" }), 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  if (!state) return null;

  return (
    <section className="card">
      <div className="row">
        <h2>{mode === "easy" ? "Easy 6×6 Sudoku" : "Normal 9×9 Sudoku"}</h2>
        <div className="spacer" />
        {}
        <Timer />
      </div>

      {}
      <SudokuBoard />

      <div className="row buttons-row">
        <button
          className="btn secondary"
          onClick={() => dispatch({ type: "RESET" })}
        >
          Reset
        </button>
        <button
            className="btn secondary"
            onClick={() => dispatch({ type: "HINT" })}
        >
          Hint
        </button>
        <button
          className="btn"
          onClick={() => dispatch({ type: "NEW_GAME" })}
        >
          New Game
        </button>
      </div>

      {state.completed && (
        <p className="note success">
          🎉 Congratulations! You solved the puzzle.
        </p>
      )}
    </section>
  );
}


export default function GamePage({ mode }) {
  return (
    <SudokuProvider mode={mode}>
      <GameInner />
    </SudokuProvider>
  );
}
