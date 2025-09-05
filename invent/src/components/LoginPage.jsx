import { useState, useContext, useEffect } from "react";
import AuthContext from "../AuthContext";

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
      setError("Please fill in");
      return;
    }

    if (username === "admin" && password === "123") {
      setUser({ name: username });
      alert("Login successful!");
    } else {
      setError("Invalid username or password.");
    }


















  }
}
