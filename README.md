# Sudoku Project (CS5610 • Project 2)

This project is a single-player Sudoku application built using **React, Vite, React Router, and the Context API**.  
It includes two Sudoku modes, dynamic board generation, validation logic, a timer, responsive design, and multiple optional bonus features.

The project expands upon Project 1 by replacing the mock game page with a fully playable Sudoku app.

---

## 🚀 Live Demo (Render / Deployment)
(Insert your Render or hosting link here)

---

## 📌 Features

### Core Sudoku Functionality
- Easy mode (6×6) and Normal mode (9×9)
- Automatically generated puzzles every time the game page loads
- Given cells are locked and cannot be changed
- Real-time validation: incorrect moves are highlighted in red
- Timer displayed at the top of the game page
- Reset button restores the original puzzle
- New Game generates a fresh random board
- Puzzle locks when completed, showing a congratulation message

---

## 📁 Pages / Routes
- `/` — Home  
- `/games` — Selection Page (mock list)  
- `/games/easy` — Easy Sudoku (random 6×6)  
- `/games/normal` — Normal Sudoku (random 9×9)  
- `/rules` — Rules + Credits  
- `/scores` — Mock high scores page  
- `/login` — Mock login  
- `/register` — Mock register  

All pages include consistent layout, theming, and a mobile-friendly navigation bar.

---

## 🧠 State Management (React Context)
The full Sudoku game state (board, timer, hints, etc.) is stored using **Context + useReducer**.  
All updates flow through reducer actions, including:

- `SET_CELL`  
- `RESET`  
- `NEW_GAME`  
- `TICK`  
- `HINT` (bonus)

SudokuContext also integrates LocalStorage to persist state between reloads.

---

## 🎨 UI / Styling
- Custom dark blue + gold highlight theme  
- Fully responsive (desktop / iPhone Pro 12)  
- Navigation bar is sticky on desktop and becomes a bottom nav on mobile  
- Cell styling supports:  
  - unselected  
  - selected  
  - given  
  - editable  
  - invalid  
  - hint  
  - locked  
- Smooth transitions and subtle animations

---

## 🌟 Bonus Features Implemented

### ✔ LocalStorage (+3 pts)
The game state is saved on every action and restored automatically.  
**Code:**  
- `src/sudoku/SudokuContext.jsx`

### ✔ Backtracking Unique-Solution Sudoku Generator (+3 pts)
A full recursive backtracking solver builds the solution grid, followed by a hole-digging algorithm that ensures uniqueness using solution counting.  
**Code:**  
- `src/sudoku/sudokuReducer.js`  
  - `solveBoard`  
  - `countSolutions`  
  - `generateFullSolution`  
  - `digHoles`

### ✔ Hint System (+5 pts)
Finds a single cell with exactly one valid candidate and highlights it visually (without solving for the user).  
**Code:**  
- reducer: `"HINT"` case  
- board highlight: `SudokuBoard.jsx`  
- CSS highlight: `.cell.hint`

---

## 📝 Writeup

### 1. Challenges
One of the biggest challenges in building this project was implementing a fully functional Sudoku generator using backtracking. Ensuring that every generated puzzle had a unique solution required additional logic such as solution counting and controlled hole-digging. I also faced difficulties organizing the state management cleanly using React Context, especially with features like LocalStorage persistence, timer updates, and hint logic. Designing the board so that invalid entries update instantly while still keeping performance smooth also required careful planning. Lastly, making the UI responsive across both desktop and mobile—including moving the navigation bar—was more challenging than expected.

### 2. Future Improvements
If I had more time, I would add more advanced Sudoku features typically found in professional puzzle apps. For example, I would implement pencil-mark notes, a number input pad for mobile users, difficulty options beyond just two sizes, and an automatic “smart highlight” system that highlights related row/column/box cells. I would also add a real persistent account system (login + stored scores), a leaderboard with actual tracking instead of mocked data, and track best completion times. From a design standpoint, I would refine animations, add sound effects, and include multiple visual themes so users could switch between styles like “light mode,” “classic newspaper,” or “neon grid.”

### 3. Assumptions
One assumption I made was that generating Sudoku boards using backtracking was acceptable as long as performance stayed reasonable for both 6×6 and 9×9 puzzles. I also assumed that a small set of existing puzzle generation rules—such as maintaining uniqueness by counting solutions—would satisfy the requirement for “proper” Sudoku behavior. For UI design, I assumed that the mobile layout did not need complex animations, only clear usability and consistent styling. Finally, I assumed that all mocked pages (rules, scores, login, register) did not require any backend or actual interactivity beyond simple form inputs.

### 4. Time Taken
This assignment took approximately **12–15 hours** in total.

### 5. Bonus Points Achieved
- ✔ **LocalStorage (+3)**  
  - Code: `src/sudoku/SudokuContext.jsx`
- ✔ **Backtracking Sudoku Generator (+3)**  
  - Code: `src/sudoku/sudokuReducer.js` (solve + digging + uniqueness checking)  
- ✔ **Hint System (+5)**  
  - Reducer: `"HINT"`  
  - Board: `SudokuBoard.jsx`  
  - CSS: `.cell.hint`

---

## 👤 Collaborator
Worked alone

## 📬 Author
Junpeng Li 
junpengli0801@gmail.com
GitHub: https://github.com/johnsonli010801?tab=repositories  

---

