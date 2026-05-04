import { useState, useEffect, useCallback } from "react";
import authService from "../services/authService";

export function useAuthToken() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Inicializa o estado com token e usuário já salvos no localStorage
  useEffect(() => {
    const storedToken = authService.getToken();
    const storedUser = authService.getUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  // Realiza o login e propaga o token para o estado React
  const handleLogin = useCallback(async (email, senha) => {
    await authService.login(email, senha);
    const storedToken = authService.getToken();
    const storedUser = authService.getUser();
    setToken(storedToken);
    setUser(storedUser);
    setIsAuthenticated(true);
  }, []);

  // Realiza o logout e limpa o estado
  const handleLogout = useCallback(() => {
    authService.logout();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  // Atualiza os dados do usuário no estado e no localStorage
  const updateStoredUser = useCallback((data) => {
    const current = authService.getUser();
    if (current) {
      const updated = { ...current, ...data };
      localStorage.setItem('user', JSON.stringify(updated));
      setUser(updated);
    }
  }, []);

  return { token, user, isAuthenticated, handleLogin, handleLogout, updateStoredUser };
}
