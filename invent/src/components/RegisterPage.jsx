import { useState } from "react";
import '../styles/RegisterPage.css';


function RegisterPage({ onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!username || !password || !confirm) {
      setError("All fields are required."); //walay unod
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");  //password 
      return;
    }

    alert("Account registered successfully!");  //successful registration
    onSwitch();
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm password"
            />
          </div>
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
        <p className="switch-text">
          Already have an account?{" "}
          <button onClick={onSwitch} className="switch-btn">Login</button>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;