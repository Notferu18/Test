import { createContext, useState } from "react";

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [users, setUsers] = useState([{ username: "admin", password: "1234" }]);

  function registerUser(newUser) {
    const usernameExists = users.some(
      (user) => user.username === newUser.username
    );
    if (usernameExists) {
      alert("Username already exists!");
      return;
    }
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setIsRegistering(false);
  }

  function login(username, password) {
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );
    if (foundUser) {
      setCurrentUser(foundUser);
      return true;
    }
    return false;
  }

  function logout() {
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isRegistering,
        setIsRegistering,
        registerUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
