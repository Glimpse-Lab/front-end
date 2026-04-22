import { useState } from "react";

const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email, senha) => {
    setLoading(true);
    // Simulação de delay de rede
    await new Promise(res => setTimeout(res, 800));
    setLoading(false);
    
    // Simulação de sucesso
    if(email == "admin@gpm.com" || email == "admin@glimpse.com"){
      window.location.href = "/admin";
      return { success: true, data: { email, senha } };
    }
    return { success: true, data: { email, senha } };
  };

  const handleCadastro = async (nome, email, senha, cpf) => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 1000));
    setLoading(false);
    
    return { success: true, data: { nome, email, senha, cpf } };
  };

  return { handleLogin, handleCadastro, loading };
};

export default useAuth;