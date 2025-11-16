import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="card center">
      <h1>Welcome to FJ&apos;s Puzzle Grid</h1>
      <p className="note">
        A single-player Sudoku experience with Easy (6×6) and Normal (9×9) modes.
      </p>
      <div className="stack">
        <Link className="btn" to="/games/easy">
          Play Easy
        </Link>
        <Link className="btn secondary" to="/games/normal">
          Play Normal
        </Link>
        <Link className="btn secondary" to="/rules">
          View Rules
        </Link>
      </div>
    </section>
  );
}
