export default function LoginPage() {
  return (
    <section className="card">
      <h2>Login</h2>
      <form className="stack">
        <label className="field">
          Username
          <input type="text" name="username" />
        </label>
        <label className="field">
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit" className="btn">
          Login
        </button>
      </form>
      <p className="note">This page is mocked and does not perform real login.</p>
    </section>
  );
}
