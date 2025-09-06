import { useState, useContext, useEffect } from "react";
import AuthContext from "../AuthContext";
import "../styles/LoginPage.css";

function LoginPage({ onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    setError("");
  }, [username, password]);

  async function handleSubmit(e) {
    e.preventDefault();

    function inputsInvalid() {
      if (username === "" || password === "") {
        setError("Please fill in all fields.");
        return true;
      }
      return false;
    }

    async function sendLoginRequest() {                                
      const res = await fetch("http://localhost/inventory_api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      return await res.json();
    }

    function handleResponse(data) {              // handle response data keneme
      if (data.success) {
        setUser({ name: username });
        alert("Login successful!");
      } else {
        setError(
          data.message ||
            "Invalid userid or password. Please try again."
        );
      }
    }

    if (inputsInvalid()) return;

    try {
      const data = await sendLoginRequest();
      handleResponse(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  }

  return (                                  
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>UserID</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your UserID"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <p className="signup-text">
          Don’t have an account?{" "}
          <button onClick={onSwitch} className="switch-btn">
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
