import { useState } from "react";
import FormTabs from "./FormTabs.jsx";
import CadastroForm from "./CadastroForm.jsx";
import LoginForm from "./LoginForm.jsx";

/**
 * Componente principal do Formulário
 * Gerencia as abas de cadastro e login
 */
function Formulario({ onNavigateToAdmin }) {
  const [tab, setTab] = useState("cadastro");

  const handleCadastroSuccess = (dados) => {
    console.log("Cadastro realizado:", dados);
    // Integrar com useAuth hook futuramente
  };

  const handleLoginSuccess = (dados) => {
    console.log("Login realizado:", dados);
    
    // Verificar se é email de admin
    const adminEmails = ["gpm@admin.com", "glimpse@admin.com"];
    if (dados.email && adminEmails.includes(dados.email)) {
      if (onNavigateToAdmin) {
        onNavigateToAdmin();
      }
    }
  };

  const containerStyle = {
    background: "white",
    borderRadius: "10px",
    padding: "30px", // Diminua um pouco o padding se estiver muito largo
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
    maxWidth: "400px", // Estreitar um pouco ajuda a alinhar como na foto
    width: "100%",
    margin: "auto" // Centraliza verticalmente e horizontalmente
  };

  const titleStyle = {
    color: "#333",
    marginBottom: "30px",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold"
  };


  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={containerStyle}>
        <h2 style={titleStyle}>Sistema de Cadastro e Login</h2>

        <FormTabs activeTab={tab} onTabChange={setTab} />

        {tab === "cadastro" && <CadastroForm onSuccess={handleCadastroSuccess} />}

        {tab === "login" && <LoginForm onSuccess={handleLoginSuccess} />}
      </div>
    </div>
  );
}

export default Formulario;
