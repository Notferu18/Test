import { useState, useContext, useEffect } from "react";
import AuthContext from "../AuthContext";   
import '../styles/LoginPage.css';


function LoginPage({ onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    setError("");
  }, [username, password]);

  function handleSubmit(e) {
    e.preventDefault();

    if (username === "" || password === "") {
      setError("Please fill in all fields.");
      return;
    }

    if (username === "lipra" && password === "1234") {
      setUser({ name: username });
      alert("Login successful!");
    } else {
      setError("Invalid username or password.");
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <p className="signup-text">
          Don’t have an account?{" "}
          <button onClick={onSwitch} className="switch-btn">Sign up</button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;