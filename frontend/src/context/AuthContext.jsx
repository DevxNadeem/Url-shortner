import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const API = "http://localhost:3000";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("snip_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    const userData = { email };
    setUser(userData);
    localStorage.setItem("snip_user", JSON.stringify(userData));
    return data;
  };

  const register = async (name, email, password) => {
    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");
    return data;
  };

  const logout = async () => {
    await fetch(`${API}/logout`, { credentials: "include" });
    setUser(null);
    localStorage.removeItem("snip_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export const API_BASE = "http://localhost:3000";
