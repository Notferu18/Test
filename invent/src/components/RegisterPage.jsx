import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/RegisterPage.css";

function RegisterPage({ onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost/inventory_api/register.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Registration successful! You can now log in.");
        onSwitch();
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
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
                placeholder="Create a password"
                maxLength={12}
                minLength={4}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="form-group password-group">
            <label>Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm password"
              />
              <span
                className="toggle-password"
                onClick={() => setShowConfirm(!showConfirm)}
              ></span>
            </div>
          </div>
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
        <p className="switch-text">
          Already have an account?{" "}
          <button onClick={onSwitch} className="switch-btn">
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
