import { useState } from "react";
import AdminSidebar from "./Administracao/AdminSidebar.jsx";
import AdminProdutos from "./Administracao/AdminProdutos.jsx";
import AdminProjetos from "./Administracao/AdminProjetos.jsx";
import AdminOrcamentos from "./Administracao/AdminOrcamentos.jsx";

/**
 * Componente principal de Administração
 * Gerencia produtos, projetos e visualiza orçamentos
 */
function Administracao({ onNavigateHome }) {
  const [activeTab, setActiveTab] = useState("produtos");

  const getPageTitle = () => {
    switch (activeTab) {
      case "produtos":
        return { title: "Gerenciar Produtos", subtitle: "Adicionar, editar e deletar produtos" };
      case "projetos":
        return { title: "Gerenciar Projetos", subtitle: "Adicionar, editar e deletar projetos" };
      case "orcamentos":
        return { title: "Pedidos de Orçamento", subtitle: "Visualizar e gerenciar orçamentos" };
      default:
        return { title: "Painel", subtitle: "" };
    }
  };

  const { title, subtitle } = getPageTitle();

  const appStyle = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5"
  };

  const mainStyle = {
    flex: 1,
    marginLeft: "250px"
  };

  const headerStyle = {
    backgroundColor: "#fff",
    borderBottom: "1px solid #e0e0e0",
    padding: "20px 30px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  const headerLeftStyle = {
    flex: 1
  };

  const titleStyle = {
    margin: "0 0 5px 0",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1a3a52"
  };

  const subtitleStyle = {
    margin: 0,
    fontSize: "13px",
    color: "#999"
  };

  const contentStyle = {
    padding: "30px"
  };

  const contentContainerStyle = {
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    overflow: "hidden"
  };

  return (
    <div style={appStyle}>
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onHome={onNavigateHome}
      />

      <div style={mainStyle}>
        <div style={headerStyle}>
          <div style={headerLeftStyle}>
            <h1 style={titleStyle}>{title}</h1>
            <p style={subtitleStyle}>{subtitle}</p>
          </div>
        </div>

        <div style={contentStyle}>
          <div style={contentContainerStyle}>
            {activeTab === "produtos" && <AdminProdutos />}
            {activeTab === "projetos" && <AdminProjetos />}
            {activeTab === "orcamentos" && <AdminOrcamentos />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Administracao;