import { useState } from "react";            
import AuthContext from "./AuthContext";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";             
import Dashboard from "./components/Dashboard";

function App() {            

  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);    // Track if user is on registration page

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