import { useState } from "react";

function RegisterPage({ onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
   
    if (!username || !password || !confirm) {
      setError("All fields are required."); //walay unod
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");  
      return;
    }

    alert("Account registered successfully!");  
    onSwitch();
  }
}
