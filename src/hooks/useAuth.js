import { useState } from "react";
import { cadastrar, logar } from "../services/authService.js";

/**
 * Hook customizado para autenticação
 */
function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCadastro = async (nome, email, senha, cpf) => {
    setLoading(true);
    setError(null);
    const result = await cadastrar(nome, email, senha, cpf);
    setLoading(false);
    if (!result.success) {
      setError(result.message);
    }
    return result;
  };

  const handleLogin = async (email, senha) => {
    setLoading(true);
    setError(null);
    const result = await logar(email, senha);
    setLoading(false);
    if (!result.success) {
      setError(result.message);
    }
    return result;
  };

  return { handleCadastro, handleLogin, loading, error };
}

export default useAuth;
