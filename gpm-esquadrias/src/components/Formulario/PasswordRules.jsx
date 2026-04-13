import { ruleStyle } from "../../utils/helpers.js";

/**
 * Componente para exibir os requisitos de senha
 */
function PasswordRules({ rules }) {
  const requisitosMensagens = {
    min: "Mínimo 8 caracteres",
    upper: "Uma letra maiúscula",
    lower: "Uma letra minúscula",
    number: "Um número",
    special: "Um caractere especial (@$!%*?&)"
  };

  return (
    <div 
      style={{ 
        marginTop: "12px", 
        padding: "12px", 
        background: "#f8f9fa", 
        border: "1px solid #dee2e6",
        borderRadius: "4px"
      }}
    >
      <p style={{ marginTop: 0, marginBottom: "8px", fontWeight: "bold", color: "#333", fontSize: "13px" }}>
        ✓ Requisitos da Senha:
      </p>
      {Object.entries(rules).map(([key, isValid]) => (
        <p key={key} style={{
          ...ruleStyle(isValid),
          marginBottom: "4px",
          fontSize: "13px",
          color: isValid ? "#155724" : "#666"
        }}>
          {isValid ? "✓ " : "✗ "}{requisitosMensagens[key]}
        </p>
      ))}
    </div>
  );
}

export default PasswordRules;
