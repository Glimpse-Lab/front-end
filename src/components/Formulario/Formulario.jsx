import { useState } from "react";
import FormTabs from "./FormTabs.jsx";
import CadastroForm from "./CadastroForm.jsx";
import LoginForm from "./LoginForm.jsx";

/**
 * Componente principal do Formulário
 * Gerencia as abas de cadastro e login
 */
function Formulario() {
  const [tab, setTab] = useState("cadastro");

  const handleCadastroSuccess = (dados) => {
    console.log("Cadastro realizado:", dados);
    // Integrar com useAuth hook futuramente
  };

  const handleLoginSuccess = (dados) => {
    console.log("Login realizado:", dados);
    // Integrar com useAuth hook futuramente
  };

  const containerStyle = {
    background: "white",
    borderRadius: "10px",
    padding: "40px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
    maxWidth: "450px",
    width: "100%",
    margin: "20px auto"
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
