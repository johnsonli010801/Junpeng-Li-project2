// src/sudoku/Timer.jsx
import { useSudoku } from "./SudokuContext";

export default function Timer() {
  const { state } = useSudoku();
  const seconds = state.seconds ?? 0;

  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const label = `${m}:${s.toString().padStart(2, "0")}`;

  return (
    <div className="timer">
      <span role="img" aria-label="clock">
        ⏱
      </span>{" "}
      {label}
    </div>
  );
}
