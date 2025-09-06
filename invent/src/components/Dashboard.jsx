import { useContext } from "react";
import AuthContext from "../AuthContext";
import "../styles/Dashboard.css";

function Dashboard() {                  // Dashboard!!!
  const { user, setUser } = useContext(AuthContext);

  function handleLogout() {
    setUser(null);
  }

  return (
    <div className="dashboard-container">      
      <h1>Hello, {user?.name}!</h1>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}

export default Dashboard;