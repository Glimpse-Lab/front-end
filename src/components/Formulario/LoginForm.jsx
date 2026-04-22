import { useState } from "react";
import EmailInput from "./EmailInput.jsx";
import PasswordInput from "./PasswordInput.jsx";
import FormMessage from "./FormMessage.jsx";
import useAuth from "../../hooks/useAuth.js";

/**
 * Formulário de login
 */
function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const { handleLogin, loading } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !senha) {
      setMessage({ text: "Preencha todos os campos", type: "error" });
      return;
    }

    const result = await handleLogin(email, senha);
    
    if (result.success) {
      setMessage({ text: "Login realizado com sucesso!", type: "success" });
      setEmail("");
      setSenha("");
      if (onSuccess) {
        onSuccess({ email, ...result.data });
      }
    } else {
      setMessage({ text: result.message, type: "error" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormMessage message={message} />

      <EmailInput
        id="loginEmail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <PasswordInput
        id="loginSenha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <button 
        type="submit"
        disabled={loading}
        style={{ 
          width: "100%",
          marginTop: "16px",
          padding: "12px",
          background: loading ? "#999" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "transform 0.2s, box-shadow 0.2s",
          boxShadow: loading ? "none" : "0 4px 12px rgba(102, 126, 234, 0.3)",
          opacity: loading ? 0.6 : 1
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 16px rgba(102, 126, 234, 0.4)";
          }
        }}
        onMouseLeave={(e) => {
          if (!loading) {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.3)";
          }
        }}
      >
        {loading ? "Carregando..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
