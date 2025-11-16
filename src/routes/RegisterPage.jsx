export default function RegisterPage() {
  return (
    <section className="card">
      <h2>Register</h2>
      <form className="stack">
        <label className="field">
          Username
          <input type="text" name="username" />
        </label>
        <label className="field">
          Password
          <input type="password" name="password" />
        </label>
        <label className="field">
          Verify Password
          <input type="password" name="password2" />
        </label>
        <button type="submit" className="btn">
          Create Account
        </button>
      </form>
      <p className="note">Mock form only; no backend.</p>
    </section>
  );
}
