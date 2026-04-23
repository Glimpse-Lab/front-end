import { useState } from "react";
import authService from "../services/authService.js";

/**
 * Hook para gerenciar autenticação
 * Fornece métodos para login e cadastro
 */
const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Realiza login do usuário
   */
  const handleLogin = async (email, senha) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authService.login(email, senha);
      
      if (result.success) {
        console.log("✅ Login bem-sucedido, armazenando dados...");
        
        // Pequeno delay para garantir que localStorage foi sincronizado
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Verifica se dados foram realmente salvos
        const savedToken = authService.getToken();
        const savedUser = authService.getUser();
        console.log("📦 Verificando dados salvos:", {
          hasToken: !!savedToken,
          hasUser: !!savedUser,
          email: savedUser?.email,
        });
        
        // Redirecionar para admin se o email termina com @admin.com
        if (email.endsWith("@admin.com")) {
          console.log("🔐 Redirecionando para /admin");
          window.location.href = "/admin";
        } else {
          console.log("📁 Redirecionando para /projetos");
          window.location.href = "/projetos";
        }
      } else {
        setError(result.message);
      }
      
      return result;
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
  };

  /**
   * Realiza cadastro de novo usuário
   */
  const handleCadastro = async (nome, email, senha, cpf) => {
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
  };

  /**
   * Realiza logout do usuário
   */
  const handleLogout = () => {
    authService.logout();
    window.location.href = "/";
  };

  /**
   * Obtém o usuário logado
   */
  const getUser = () => {
    return authService.getUser();
  };

  /**
   * Verifica se o usuário está autenticado
   */
  const isAuthenticated = () => {
    return authService.isAuthenticated();
  };

  return {
    handleLogin,
    handleCadastro,
    handleLogout,
    getUser,
    isAuthenticated,
    loading,
    error,
    setError,
  };
};

export default useAuth;
