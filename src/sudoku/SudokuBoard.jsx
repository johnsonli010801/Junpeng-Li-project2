// src/sudoku/SudokuBoard.jsx
import { useState } from "react";
import { isValidPlacement } from "./sudokuReducer";
import { useSudoku } from "./SudokuContext";

export default function SudokuBoard() {
  const { state, dispatch } = useSudoku();
  const {
    board,
    initial,
    size,
    boxHeight,
    boxWidth,
    completed,
    hintCell,         
  } = state;

  const [selected, setSelected] = useState({ row: null, col: null });

  const cellSize = size === 6 ? 60 : 44; 

  const handleChange = (row, col, e) => {
    let v = e.target.value;

    if (v === "") {
      dispatch({ type: "SET_CELL", row, col, value: 0 });
      return;
    }

    if (!/^[1-9]$/.test(v)) return;

    const num = parseInt(v, 10);
    dispatch({ type: "SET_CELL", row, col, value: num });
  };

  return (
    <div
      className="sudoku-grid"
      style={{
        gridTemplateColumns: `repeat(${size}, ${cellSize}px)`,
        "--cell-size": `${cellSize}px`,
      }}
    >
      {board.map((row, r) =>
        row.map((value, c) => {
          const given = initial[r][c] !== 0;
          const isSelected = selected.row === r && selected.col === c;

          let invalid = false;
          if (value !== 0) {
            invalid = !isValidPlacement(
              board,
              r,
              c,
              value,
              size,
              boxHeight,
              boxWidth
            );
          }


          const isHint =
            hintCell && hintCell.row === r && hintCell.col === c;

          const classes = [
            "cell",
            given ? "given" : "editable",
            isSelected ? "selected" : "",
            invalid ? "invalid" : "",
            completed ? "locked" : "",
            isHint ? "hint" : "",   
          ]
            .join(" ")
            .trim();

          const style = {};
          if (r % boxHeight === 0) style.borderTopWidth = "3px";
          if (c % boxWidth === 0) style.borderLeftWidth = "3px";
          if (r === size - 1) style.borderBottomWidth = "3px";
          if (c === size - 1) style.borderRightWidth = "3px";

          return (
            <input
              key={`${r}-${c}`}
              className={classes}
              style={style}
              value={value === 0 ? "" : value}
              readOnly={given || completed}
              onChange={(e) => handleChange(r, c, e)}
              onFocus={() => setSelected({ row: r, col: c })}
            />
          );
        })
      )}
    </div>
  );
}
