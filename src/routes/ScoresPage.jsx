const scores = [
  { user: "sudokuMaster99", completed: 124 },
  { user: "fj_player", completed: 42 },
  { user: "newbie", completed: 5 },
];

export default function ScoresPage() {
  return (
    <section className="card">
      <h2>High Scores (Mock)</h2>
      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Sudokus Completed</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((s) => (
            <tr key={s.user}>
              <td>{s.user}</td>
              <td>{s.completed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
