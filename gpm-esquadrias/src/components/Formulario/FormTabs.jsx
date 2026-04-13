/**
 * Componente para exibir abas do formulário
 */
function FormTabs({ activeTab, onTabChange }) {
  const tabStyle = {
    display: "flex",
    marginBottom: "30px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
  };

  const buttonStyle = (isActive) => ({
    flex: 1,
    padding: "14px 16px",
    background: isActive ? "#fff" : "transparent",
    color: isActive ? "#667eea" : "#666",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: isActive ? "bold" : "500",
    transition: "all 0.3s",
    boxShadow: isActive ? "inset 0 -3px 0 #667eea" : "none"
  });

  return (
    <div style={tabStyle}>
      <button
        type="button"
        style={buttonStyle(activeTab === "cadastro")}
        onClick={() => onTabChange("cadastro")}
        onMouseEnter={(e) => !activeTab.includes("cadastro") && (e.target.style.background = "#f9f9f9")}
        onMouseLeave={(e) => !activeTab.includes("cadastro") && (e.target.style.background = "transparent")}
      >
        Cadastro
      </button>
      <button
        type="button"
        style={buttonStyle(activeTab === "login")}
        onClick={() => onTabChange("login")}
        onMouseEnter={(e) => !activeTab.includes("login") && (e.target.style.background = "#f9f9f9")}
        onMouseLeave={(e) => !activeTab.includes("login") && (e.target.style.background = "transparent")}
      >
        Login
      </button>
    </div>
  );
}

export default FormTabs;
