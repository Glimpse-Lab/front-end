import { useState, useCallback, useEffect } from "react";
import authService from "../services/authService.js";

/**
 * Hook para gerenciar autenticação e tokens JWT
 * Fornece métodos para login, logout e verificação de autenticação
 */
const useAuthToken = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Inicializa o estado de autenticação ao montar o componente
  useEffect(() => {
    const storedToken = authService.getToken();
    const storedUser = authService.getUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  /**
   * Realiza login do usuário
   */
  const handleLogin = useCallback(async (email, senha) => {
    setLoading(true);
    setError(null);

    try {
      const result = await authService.login(email, senha);

      if (result.success) {
        setToken(result.data.token);
        setUser({
          id: result.data.id,
          nome: result.data.nome,
          email: result.data.email,
          cpf: result.data.cpf,
        });
        setIsAuthenticated(true);
        return result;
      } else {
        setError(result.message);
        return result;
      }
    } catch (err) {
      const errorMessage = err.message || "Erro ao fazer login";
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Realiza logout do usuário
   */
  const handleLogout = useCallback(() => {
    authService.logout();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  /**
   * Realiza cadastro de novo usuário
   */
  const handleCadastro = useCallback(async (nome, email, senha, cpf) => {
    setLoading(true);
    setError(null);

    try {
      const result = await authService.cadastro(nome, email, senha, cpf);

      if (!result.success) {
        setError(result.message);
      }

      return result;
    } catch (err) {
      const errorMessage = err.message || "Erro ao fazer cadastro";
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Atualiza os dados do usuário
   */
  const updateUser = useCallback((userData) => {
    setUser(userData);
    authService.updateUser(userData);
  }, []);

  /**
   * Verifica se o token está válido
   */
  const isTokenValid = useCallback(() => {
    return token && authService.isAuthenticated();
  }, [token]);

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    handleLogin,
    handleLogout,
    handleCadastro,
    updateUser,
    isTokenValid,
    setError,
  };
};

export default useAuthToken;
