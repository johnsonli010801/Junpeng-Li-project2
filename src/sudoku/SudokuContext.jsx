// src/sudoku/SudokuContext.jsx
import { createContext, useContext, useReducer, useEffect, useMemo } from "react";
import { sudokuReducer, createInitialState } from "./sudokuReducer";

const SudokuContext = createContext(null);


function storageKey(mode) {
  return `sudoku-${mode}`;
}


function loadInitialState(mode) {
  if (typeof window === "undefined") {
    return createInitialState(mode);
  }

  try {
    const key = storageKey(mode);
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return createInitialState(mode);
    }
    const parsed = JSON.parse(raw);


    if (!parsed || !Array.isArray(parsed.board) || !parsed.size) {
      return createInitialState(mode);
    }

    return parsed;
  } catch (e) {
    console.warn("Failed to load sudoku state from localStorage:", e);
    return createInitialState(mode);
  }
}

export function SudokuProvider({ mode, children }) {
  const [state, realDispatch] = useReducer(
    sudokuReducer,
    null,
    () => loadInitialState(mode)
  );

  const key = useMemo(() => storageKey(mode), [mode]);


  const dispatch = (action) => {
    if (typeof window !== "undefined") {
      if (action.type === "RESET" || action.type === "NEW_GAME") {
        window.localStorage.removeItem(key);
      }
    }
    realDispatch(action);
  };

 
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!state) return;

    try {
      if (state.completed) {
        
        window.localStorage.removeItem(key);
      } else {
        
        window.localStorage.setItem(key, JSON.stringify(state));
      }
    } catch (e) {
      console.warn("Failed to write sudoku state to localStorage:", e);
    }
  }, [state, key]);

  const value = { state, dispatch, mode };

  return (
    <SudokuContext.Provider value={value}>
      {children}
    </SudokuContext.Provider>
  );
}

export function useSudoku() {
  const ctx = useContext(SudokuContext);
  if (!ctx) {
    throw new Error("useSudoku must be used inside <SudokuProvider />");
  }
  return ctx;
}
