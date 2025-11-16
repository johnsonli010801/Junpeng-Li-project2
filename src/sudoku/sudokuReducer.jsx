// src/sudoku/sudokuReducer.js

function cloneBoard(b) {
  return b.map((row) => [...row]);
}

export function isValidPlacement(board, r, c, value, size, boxH, boxW) {
  if (value === 0) return true;

  for (let col = 0; col < size; col++) {
    if (col !== c && board[r][col] === value) return false;
  }

  for (let row = 0; row < size; row++) {
    if (row !== r && board[row][c] === value) return false;
  }

  const boxRowStart = Math.floor(r / boxH) * boxH;
  const boxColStart = Math.floor(c / boxW) * boxW;
  for (let row = boxRowStart; row < boxRowStart + boxH; row++) {
    for (let col = boxColStart; col < boxColStart + boxW; col++) {
      if ((row !== r || col !== c) && board[row][col] === value) return false;
    }
  }
  return true;
}

// ========== Backtracking  ==========
function findEmptyCell(board, size) {
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === 0) return [r, c];
    }
  }
  return null;
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function solveBoard(board, size, boxH, boxW) {
  const empty = findEmptyCell(board, size);
  if (!empty) return true;

  const [row, col] = empty;
  const nums = shuffle(Array.from({ length: size }, (_, i) => i + 1));

  for (const num of nums) {
    if (isValidPlacement(board, row, col, num, size, boxH, boxW)) {
      board[row][col] = num;
      if (solveBoard(board, size, boxH, boxW)) return true;
      board[row][col] = 0;
    }
  }
  return false;
}

function countSolutions(board, size, boxH, boxW, limit = 2) {
  const work = cloneBoard(board);
  let count = 0;

  function backtrack() {
    if (count >= limit) return;

    const empty = findEmptyCell(work, size);
    if (!empty) {
      count += 1;
      return;
    }

    const [row, col] = empty;
    for (let num = 1; num <= size; num++) {
      if (isValidPlacement(work, row, col, num, size, boxH, boxW)) {
        work[row][col] = num;
        backtrack();
        work[row][col] = 0;

        if (count >= limit) return;
      }
    }
  }

  backtrack();
  return count;
}

function generateFullSolution(size, boxH, boxW) {
  const board = Array.from({ length: size }, () => Array(size).fill(0));
  const ok = solveBoard(board, size, boxH, boxW);
  if (!ok) {
    throw new Error("Backtracking failed to generate solution");
  }
  return board;
}

function digHoles(solution, size, boxH, boxW, cluesTarget) {
  const puzzle = cloneBoard(solution);
  const coords = [];

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      coords.push([r, c]);
    }
  }

  const shuffled = shuffle(coords);
  let filledCells = size * size;

  for (const [r, c] of shuffled) {
    if (filledCells <= cluesTarget) break;

    const backup = puzzle[r][c];
    if (backup === 0) continue;

    puzzle[r][c] = 0;

    const solutionsCount = countSolutions(puzzle, size, boxH, boxW, 2);
    if (solutionsCount !== 1) {
      puzzle[r][c] = backup;
    } else {
      filledCells -= 1;
    }
  }

  return puzzle;
}

function generatePuzzle(size, boxH, boxW, cluesTarget) {
  const solution = generateFullSolution(size, boxH, boxW);
  const puzzle = digHoles(solution, size, boxH, boxW, cluesTarget);
  return { puzzle };
}


export function createInitialState(mode) {
  const isEasy = mode === "easy";
  const size = isEasy ? 6 : 9;
  const boxHeight = isEasy ? 2 : 3;
  const boxWidth = isEasy ? 3 : 3;
  const cluesTarget = isEasy ? 18 : 30;

  const { puzzle } = generatePuzzle(size, boxHeight, boxWidth, cluesTarget);

  return {
    mode,
    size,
    boxHeight,
    boxWidth,
    board: cloneBoard(puzzle),
    initial: cloneBoard(puzzle),
    seconds: 0,
    completed: false,
    hintCell: null, 
  };
}


function isBoardCompleteAndValid(state) {
  const { board, size, boxHeight, boxWidth } = state;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const v = board[r][c];
      if (v === 0) return false;
      if (!isValidPlacement(board, r, c, v, size, boxHeight, boxWidth)) {
        return false;
      }
    }
  }
  return true;
}

// ========== Reducer ==========
export function sudokuReducer(state, action) {
  switch (action.type) {
    case "TICK":
      if (state.completed) return state;
      return { ...state, seconds: state.seconds + 1 };

    case "SET_CELL": {
      if (state.completed) return state;
      const { row, col, value } = action;

      // givens cannot be changed
      if (state.initial[row][col] !== 0) return state;

      const size = state.size;
      if (value !== 0 && (value < 1 || value > size)) {
        // ignore out-of-range inputs
        return state;
      }

      const nextBoard = cloneBoard(state.board);
      nextBoard[row][col] = value;

      const nextState = {
        ...state,
        board: nextBoard,
        hintCell: null, 
      };

      if (isBoardCompleteAndValid(nextState)) {
        nextState.completed = true;
      }
      return nextState;
    }

    case "RESET":
      return {
        ...state,
        board: cloneBoard(state.initial),
        seconds: 0,
        completed: false,
        hintCell: null, 
      };

    case "NEW_GAME":
      return {
        ...createInitialState(state.mode),
        mode: state.mode,
      };


    case "HINT": {
      if (state.completed) return state;

      const { board, size, boxHeight, boxWidth } = state;

      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (board[r][c] !== 0) continue;

          let validCount = 0;
          for (let num = 1; num <= size; num++) {
            if (isValidPlacement(board, r, c, num, size, boxHeight, boxWidth)) {
              validCount++;
              if (validCount > 1) break;
            }
          }

          if (validCount === 1) {

            return {
              ...state,
              hintCell: { row: r, col: c },
            };
          }
        }
      }


      return state;
    }

    default:
      return state;
  }
}
