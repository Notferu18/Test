import { useState, useContext, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthContext from "../AuthContext";
import "../styles/LoginPage.css";

function LoginPage({ onSwitch }) {          
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(AuthContext);
  const minLength = 4;

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
      if (!username.includes("@")) {
        setError("Please enter a valid email address.");
        return true;
      }
      if (password.length < minLength) {
        setError(`Password must be at least ${minLength} characters.`);
        return true;
      }
      return false;
    }

    async function sendLoginRequest() { // API Call
      const res = await fetch("http://localhost/inventory_api/login.php", {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      return await res.json();
    }

    function handleResponse(data) {
      if (data.success) {
        // Successful login
        setUser({ name: username });
        window.localStorage.setItem("user", JSON.stringify({ name: username })); 
        alert("Login successful! You will be redirected to the dashboard.");
      } else {
        setError(
          data.message || "Invalid email or password. Please try again."
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
            <label>Email</label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group password-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                minLength={minLength}
                maxLength={12}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)} // password visibility
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
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