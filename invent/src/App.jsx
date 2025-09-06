import { useState, useEffect } from "react";            
import AuthContext from "./AuthContext";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";             
import Dashboard from "./components/Dashboard";

function App() { 

  const [user, setUser] = useState(() => {
    const storedUser = window.localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isRegistering, setIsRegistering] = useState(false);


  useEffect(() => {
    if (user) {
      window.localStorage.setItem("user", JSON.stringify(user));
    } else {
      window.localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>            
      {user ? (
        <Dashboard />
      ) : isRegistering ? (
        <RegisterPage onSwitch={() => setIsRegistering(false)} />
      ) : (
        <LoginPage onSwitch={() => setIsRegistering(true)} />
      )}
    </AuthContext.Provider>
  );
}

export default App;