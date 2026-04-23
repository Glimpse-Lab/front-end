import useAuth from "../../hooks/useAuth.js";

function AdminSidebar({ activeTab, onTabChange, onHome }) {
  const { handleLogout } = useAuth();
  
  const sidebarStyle = {
    width: "250px",
    backgroundColor: "#1a3a52",
    color: "white",
    minHeight: "100vh",
    padding: "20px 0",
    position: "fixed",
    left: 0,
    top: 0,
    boxShadow: "2px 0 8px rgba(0, 0, 0, 0.15)",
    display: "flex",
    flexDirection: "column",
    zIndex: "1001",
    pointerEvents: "auto",
    overflow: "hidden"
  };

  const headerStyle = {
    padding: "0 15px 30px 15px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "60px",
    flexShrink: 0
  };

  const logoStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    whiteSpace: "nowrap"
  };

  const navStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    minHeight: "0"
  };

  const navItemStyle = (isActive) => ({
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "12px 15px",
    backgroundColor: isActive ? "#2196f3" : "transparent",
    color: isActive ? "white" : "rgba(255, 255, 255, 0.8)",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
    border: "none",
    fontWeight: isActive ? "600" : "500",
    marginBottom: "5px"
  });

  const iconStyle = {
    fontSize: "20px",
    minWidth: "20px",
    textAlign: "center"
  };

  const footerStyle = {
    paddingLeft: "10px",
    paddingRight: "10px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    paddingTop: "15px",
    paddingBottom: "15px",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  };

  const logoutButtonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "12px 15px",
    backgroundColor: "#d32f2f",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s ease",
    border: "none",
    fontWeight: "600",
    width: "100%"
  };

  const homeButtonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "12px 15px",
    backgroundColor: "#4caf50",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s ease",
    border: "none",
    fontWeight: "600",
    width: "100%",
    marginBottom: "0"
  };

  return (
    <div style={sidebarStyle}>
      <div style={headerStyle}>
        <div style={logoStyle}>🔧 Admin</div>
      </div>

      <nav style={navStyle}>
        <button
          style={navItemStyle(activeTab === "produtos")}
          onClick={() => onTabChange("produtos")}
          onMouseEnter={(e) => activeTab !== "produtos" && (e.currentTarget.style.backgroundColor = "rgba(33, 150, 243, 0.3)")}
          onMouseLeave={(e) => activeTab !== "produtos" && (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <span style={iconStyle}>📦</span>
          <span>Produtos</span>
        </button>

        <button
          style={navItemStyle(activeTab === "projetos")}
          onClick={() => onTabChange("projetos")}
          onMouseEnter={(e) => activeTab !== "projetos" && (e.currentTarget.style.backgroundColor = "rgba(33, 150, 243, 0.3)")}
          onMouseLeave={(e) => activeTab !== "projetos" && (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <span style={iconStyle}>🏗️</span>
          <span>Projetos</span>
        </button>

        <button
          style={navItemStyle(activeTab === "orcamentos")}
          onClick={() => onTabChange("orcamentos")}
          onMouseEnter={(e) => activeTab !== "orcamentos" && (e.currentTarget.style.backgroundColor = "rgba(33, 150, 243, 0.3)")}
          onMouseLeave={(e) => activeTab !== "orcamentos" && (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <span style={iconStyle}>📋</span>
          <span>Orçamentos</span>
        </button>
      </nav>

      <div style={footerStyle}>
        <button
          style={logoutButtonStyle}
          onClick={handleLogout}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#b71c1c";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#d32f2f";
          }}
          title="Fazer logout e retornar à home"
        >
          <span>🚪</span>
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
