import { useContext } from "react";
import AuthContext from "../AuthContext";
import "../styles/Dashboard.css";

function Dashboard() {
  const { user, setUser } = useContext(AuthContext);

  function handleLogout() {
    setUser(null);
  }

  const inventoryStats = [
    { name: "Total Products", value: 100 },
    { name: "Low Stock", value: 5 },
    { name: "Orders Today", value: 20 },
    { name: "Suppliers", value: 2 },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h1>Hellooo, {user?.name?.split('@')[0]}!!</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>

        <div className="inventory-stats">
          {inventoryStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <h2>{stat.value}</h2>
              <p>{stat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;