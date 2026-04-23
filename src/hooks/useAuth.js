import { useState } from "react";
import authService from "../services/authService.js";

const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email, senha) => {
    setLoading(true);
    try {
      const result = await authService.login(email, senha);
      
      if (result.success) {
        // Redirecionar para admin se for admin
        if (email === "admin@gpm.com" || email === "admin@glimpse.com") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/projetos";
        }
      }
      
      return result;
    } catch (error) {
      return {
        success: false,
        message: "Erro ao fazer login",
      };
    } finally {
      setLoading(false);
    }
  };

  const handleCadastro = async (nome, email, senha, cpf) => {
    setLoading(true);
    try {
      const result = await authService.cadastro(nome, email, senha, cpf);
      return result;
    } catch (error) {
      return {
        success: false,
        message: "Erro ao fazer cadastro",
      };
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, handleCadastro, loading };
};

export default useAuth;