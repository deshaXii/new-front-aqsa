import { useState } from "react";

const useAuthStore = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  const login = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("loginTime", Date.now());
  };

  const logout = () => {
    setToken(null);
    setUser({});
    localStorage.clear();
  };

  return { token, user, login, logout };
};

export default useAuthStore;
