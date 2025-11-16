import { NavLink, Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <header className="site-header">
        <div className="container navbar">
          <NavLink to="/" end className="brand">
            FJ&apos;s Puzzle Grid
          </NavLink>

          <nav className="navlinks">
            <NavLink to="/" end className="nav-link">
              Home
            </NavLink>
            <NavLink to="/games" className="nav-link">
              Games
            </NavLink>
            <NavLink to="/rules" className="nav-link">
              Rules
            </NavLink>
            <NavLink to="/scores" className="nav-link">
              Scores
            </NavLink>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
            <NavLink to="/register" className="nav-link">
              Register
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
