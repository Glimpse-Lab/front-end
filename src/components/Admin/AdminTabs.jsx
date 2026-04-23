function AdminTabs({ activeTab, onTabChange }) {
  const tabsStyle = {
    display: "flex",
    gap: "0",
    borderBottom: "2px solid #ddd",
    marginBottom: "0"
  };

  const tabButtonStyle = (isActive) => ({
    padding: "15px 25px",
    border: "none",
    backgroundColor: "transparent",
    color: isActive ? "#1e88e5" : "#666",
    fontWeight: isActive ? "bold" : "normal",
    fontSize: "16px",
    cursor: "pointer",
    borderBottom: isActive ? "3px solid #1e88e5" : "none",
    marginBottom: "-2px",
    transition: "all 0.3s ease"
  });

  return (
    <div style={tabsStyle}>
      <button
        style={tabButtonStyle(activeTab === "produtos")}
        onClick={() => onTabChange("produtos")}
      >
        📦 Produtos
      </button>
      <button
        style={tabButtonStyle(activeTab === "projetos")}
        onClick={() => onTabChange("projetos")}
      >
        🏗️ Projetos
      </button>
      <button
        style={tabButtonStyle(activeTab === "orcamentos")}
        onClick={() => onTabChange("orcamentos")}
      >
        📋 Orçamentos
      </button>
    </div>
  );
}

export default AdminTabs;
