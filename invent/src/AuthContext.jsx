import { createContext, useState } from "react";

const AuthContext = createContext();
export function AuthProvider({ children }) {
const [currentUser, setCurrentUser] = useState(null);
const [isRegistering, setIsRegistering] = useState(false);
const [users, setUsers] = useState([{ username: "admin", password: "1234" }]);














































}