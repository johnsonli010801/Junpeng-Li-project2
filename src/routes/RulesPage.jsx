export default function RulesPage() {
  return (
    <section className="card">
      <h2>Rules of Sudoku</h2>
      <ul>
        <li>Each row must contain every number exactly once.</li>
        <li>Each column must contain every number exactly once.</li>
        <li>Each sub-grid (box) must contain every number exactly once.</li>
        <li>Easy: 6×6 grid. Normal: 9×9 grid.</li>
      </ul>

      <h3>Credits</h3>
      <p>
        Made by Junpeng Li. Connect with me:
        <br />
        <a href="mailto:junpengli0801@gmail.com">Email</a> ·{" "}
        <a href="https://github.com/">GitHub</a> ·{" "}
        <a href="https://www.linkedin.com/in/johnson-li-a2309823b/">LinkedIn</a>
      </p>
    </section>
  );
}
