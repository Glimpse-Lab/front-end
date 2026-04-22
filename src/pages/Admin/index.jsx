import { useState } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminProdutos from "../../components/Admin/AdminProdutos";
import AdminProjetos from "../../components/Admin/AdminProjetos";
import AdminOrcamentos from "../../components/Admin/AdminOrcamentos";


export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("produtos");

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main style={{ flex: 1, marginLeft: "250px", padding: "30px" }}>
        {activeTab === "produtos" && <AdminProdutos />}
        {activeTab === "projetos" && <AdminProjetos />}
        {activeTab === "orcamentos" && <AdminOrcamentos />}
      </main>
    </div>
  );
}