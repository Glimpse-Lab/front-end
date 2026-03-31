import { useState } from "react";
import { isPasswordValid } from "../../utils/helpers.js";
import usePasswordRules from "../../hooks/usePasswordRules.js";
import EmailInput from "./EmailInput.jsx";
import PasswordInput from "./PasswordInput.jsx";
import CPFInput from "./CPFInput.jsx";
import PasswordRules from "./PasswordRules.jsx";
import FormMessage from "./FormMessage.jsx";

/**
 * Formulário de cadastro
 */
function CadastroForm({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [showSenhaInfo, setShowSenhaInfo] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const rules = usePasswordRules(senha);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isPasswordValid(rules)) {
      setMessage({ text: "Senha inválida. Revise os requisitos.", type: "error" });
      return;
    }

    setMessage({ text: "Cadastro realizado com sucesso!", type: "success" });
    setEmail("");
    setSenha("");
    setCpf("");

    if (onSuccess) {
      onSuccess({ email, senha, cpf });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormMessage message={message} />

      <EmailInput
        id="cadastroEmail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="form-group" style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "8px" }}>
          <label htmlFor="cadastroSenha" style={{ margin: 0, color: "#555", fontWeight: "bold", fontSize: "14px" }}>
            Senha:
          </label>
          <button
            type="button"
            onClick={() => setShowSenhaInfo(!showSenhaInfo)}
            aria-label="Mostrar requisitos da senha"
            title="Clique para ver requisitos"
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              border: "2px solid #667eea",
              color: "#667eea",
              background: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
              padding: 0,
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
              lineHeight: "1",
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#667eea";
              e.target.style.color = "#fff";
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#fff";
              e.target.style.color = "#667eea";
              e.target.style.transform = "scale(1)";
            }}
          >
            ?
          </button>
        </div>
        <input
          type="password"
          id="cadastroSenha"
          placeholder="Digite uma senha forte"
          required
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            border: "2px solid #ddd",
            borderRadius: "5px",
            fontSize: "14px",
            backgroundColor: "#fff",
            transition: "border-color 0.3s"
          }}
          onFocus={(e) => e.target.style.borderColor = "#667eea"}
          onBlur={(e) => e.target.style.borderColor = "#ddd"}
        />
        {showSenhaInfo && <PasswordRules rules={rules} />}
      </div>

      <CPFInput
        id="cadastroCpf"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
      />

      <button 
        type="submit" 
        style={{ 
          width: "100%",
          marginTop: "16px",
          padding: "12px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "transform 0.2s, box-shadow 0.2s",
          boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)"
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 6px 16px rgba(102, 126, 234, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.3)";
        }}
      >
        Cadastrar
      </button>
    </form>
  );
}

export default CadastroForm;
