import { Link } from "react-router-dom";

const games = [
  { id: "easy",   title: "Morning Warmup 6×6", author: "FJ" },
  { id: "normal", title: "Night Owl 9×9",      author: "FJ" },
];

export default function GamesPage() {
  return (
    <section className="card">
      <h2>Choose a Sudoku</h2>
      <p className="note">
        This page is mocked with hard-coded game metadata, as required.
      </p>

      <ul className="game-list">
        {games.map((g) => (
          <li
            key={g.id}
            className="row"
            style={{ justifyContent: "space-between", marginTop: "8px" }}
          >
            <div>
              <strong>{g.title}</strong>
              <span className="note"> &nbsp;by {g.author}</span>
            </div>
            <Link className="btn" to={`/games/${g.id}`}>
              Play
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
