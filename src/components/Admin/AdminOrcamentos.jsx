import { useState } from "react";
import { getOrcamentos, atualizarOrcamento, deletarOrcamento } from "../../services/orcamentosService.js";

function AdminOrcamentos() {
  const [orcamentos, setOrcamentos] = useState(getOrcamentos());
  const [expandId, setExpandId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("todos");

  const handleChangeStatus = (id, newStatus) => {
    const updated = atualizarOrcamento(id, { status: newStatus });
    if (updated) {
      setOrcamentos(orcamentos.map(o => o.id === id ? updated : o));
    }
  };

  const handleDelete = (id) => {
    if (confirm("Tem certeza que deseja deletar este orçamento?")) {
      if (deletarOrcamento(id)) {
        setOrcamentos(orcamentos.filter(o => o.id !== id));
      }
    }
  };

  const filteredOrcamentos = filterStatus === "todos"
    ? orcamentos
    : orcamentos.filter(o => o.status === filterStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case "pendente":
        return "#ff9800";
      case "em_analise":
        return "#2196f3";
      case "respondido":
        return "#4caf50";
      case "rejeitado":
        return "#f44336";
      default:
        return "#999";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "pendente":
        return "Pendente";
      case "em_analise":
        return "Em Análise";
      case "respondido":
        return "Respondido";
      case "rejeitado":
        return "Rejeitado";
      default:
        return status;
    }
  };

  const containerStyle = {
    padding: "0"
  };

  const headerStyle = {
    marginBottom: "0",
    padding: "20px 30px",
    borderBottom: "1px solid #e0e0e0"
  };

  const filterStyle = {
    display: "flex",
    gap: "8px",
    marginBottom: "0",
    flexWrap: "wrap",
    padding: "15px 30px",
    borderBottom: "1px solid #e0e0e0",
    backgroundColor: "#f9f9f9"
  };

  const filterButtonStyle = (active) => ({
    padding: "8px 16px",
    border: active ? "none" : "1px solid #ddd",
    borderRadius: "6px",
    backgroundColor: active ? "#2196f3" : "white",
    color: active ? "white" : "#666",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: active ? "600" : "500",
    transition: "all 0.3s ease"
  });

  const contentStyle = {
    padding: "30px"
  };

  const cardStyle = {
    backgroundColor: "white",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    marginBottom: "15px",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)"
  };

  const cardHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    backgroundColor: "#f9f9f9",
    borderBottom: "1px solid #e0e0e0",
    cursor: "pointer",
    transition: "background-color 0.3s ease"
  };

  const cardContentStyle = {
    padding: "20px"
  };

  const statusBadgeStyle = (status) => ({
    padding: "6px 12px",
    borderRadius: "20px",
    backgroundColor: getStatusColor(status),
    color: "white",
    fontSize: "11px",
    fontWeight: "600"
  });

  const infoGridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "15px"
  };

  const infoItemStyle = {
    padding: "12px",
    backgroundColor: "#f9f9f9",
    borderRadius: "6px"
  };

  const infoLabelStyle = {
    fontWeight: "600",
    color: "#666",
    fontSize: "12px",
    marginBottom: "4px"
  };

  const infoValueStyle = {
    color: "#333",
    fontSize: "14px"
  };

  const descriptionStyle = {
    padding: "12px",
    backgroundColor: "#f9f9f9",
    borderRadius: "6px",
    marginBottom: "15px",
    lineHeight: "1.5",
    fontSize: "14px",
    color: "#333"
  };

  const actionButtonStyle = (type) => ({
    padding: "8px 16px",
    marginRight: "10px",
    marginBottom: "5px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
    backgroundColor: type === "delete" ? "#f44336" : "#ff9800",
    color: "white",
    fontWeight: "500",
    transition: "background-color 0.3s ease"
  });

  const selectStyle = {
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    marginRight: "10px",
    cursor: "pointer"
  };

  const expandIconStyle = {
    transform: expandId === null ? "rotate(0deg)" : "rotate(180deg)",
    transition: "transform 0.3s",
    fontSize: "18px",
    color: "#999"
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h3 style={{ margin: "0 0 5px 0" }}>Pedidos de Orçamento</h3>
        <p style={{ color: "#666", margin: 0, fontSize: "13px" }}>
          Total: {orcamentos.length} orçamentos
        </p>
      </div>

      <div style={filterStyle}>
        <button
          style={filterButtonStyle(filterStatus === "todos")}
          onClick={() => setFilterStatus("todos")}
        >
          Todos ({orcamentos.length})
        </button>
        <button
          style={filterButtonStyle(filterStatus === "pendente")}
          onClick={() => setFilterStatus("pendente")}
        >
          Pendentes ({orcamentos.filter(o => o.status === "pendente").length})
        </button>
        <button
          style={filterButtonStyle(filterStatus === "em_analise")}
          onClick={() => setFilterStatus("em_analise")}
        >
          Em Análise ({orcamentos.filter(o => o.status === "em_analise").length})
        </button>
        <button
          style={filterButtonStyle(filterStatus === "respondido")}
          onClick={() => setFilterStatus("respondido")}
        >
          Respondidos ({orcamentos.filter(o => o.status === "respondido").length})
        </button>
        <button
          style={filterButtonStyle(filterStatus === "rejeitado")}
          onClick={() => setFilterStatus("rejeitado")}
        >
          Rejeitados ({orcamentos.filter(o => o.status === "rejeitado").length})
        </button>
      </div>

      <div style={contentStyle}>
        {filteredOrcamentos.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999", marginTop: "30px", padding: "20px" }}>
            Nenhum orçamento encontrado
          </p>
        ) : (
          filteredOrcamentos.map(orcamento => (
            <div key={orcamento.id} style={cardStyle}>
              <div
                style={cardHeaderStyle}
                onClick={() => setExpandId(expandId === orcamento.id ? null : orcamento.id)}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f9f9f9"}
              >
                <div>
                  <h4 style={{ margin: "0 0 4px 0", color: "#1a3a52" }}>#{orcamento.id} - {orcamento.nome}</h4>
                  <p style={{ margin: 0, color: "#666", fontSize: "13px" }}>
                    {orcamento.assunto}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <div style={statusBadgeStyle(orcamento.status)}>
                    {getStatusLabel(orcamento.status)}
                  </div>
                  <span style={expandIconStyle}>▼</span>
                </div>
              </div>

              {expandId === orcamento.id && (
                <div style={cardContentStyle}>
                  <div style={infoGridStyle}>
                    <div style={infoItemStyle}>
                      <div style={infoLabelStyle}>📧 Email</div>
                      <div style={infoValueStyle}>{orcamento.email}</div>
                    </div>
                    <div style={infoItemStyle}>
                      <div style={infoLabelStyle}>📱 Telefone</div>
                      <div style={infoValueStyle}>{orcamento.telefone}</div>
                    </div>
                    <div style={infoItemStyle}>
                      <div style={infoLabelStyle}>📅 Data do Pedido</div>
                      <div style={infoValueStyle}>
                        {new Date(orcamento.data).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                    <div style={infoItemStyle}>
                      <div style={infoLabelStyle}>💰 Valor Estimado</div>
                      <div style={infoValueStyle}>
                        {orcamento.valor_estimado || "Não respondido"}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <div style={{ ...infoLabelStyle, marginBottom: "8px" }}>
                      📝 Descrição
                    </div>
                    <div style={descriptionStyle}>
                      {orcamento.descricao}
                    </div>
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <div style={{ ...infoLabelStyle, marginBottom: "8px" }}>
                      📦 Produtos Interessados
                    </div>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {orcamento.produtos.map((produto, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#e3f2fd",
                            color: "#1e88e5",
                            borderRadius: "6px",
                            fontSize: "13px",
                            fontWeight: "500"
                          }}
                        >
                          {produto}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <div style={{ ...infoLabelStyle, marginBottom: "8px" }}>
                      🔄 Atualizar Status
                    </div>
                    <select
                      value={orcamento.status}
                      onChange={(e) => handleChangeStatus(orcamento.id, e.target.value)}
                      style={selectStyle}
                    >
                      <option value="pendente">🟠 Pendente</option>
                      <option value="em_analise">🔵 Em Análise</option>
                      <option value="respondido">🟢 Respondido</option>
                      <option value="rejeitado">🔴 Rejeitado</option>
                    </select>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      style={actionButtonStyle("delete")}
                      onClick={() => handleDelete(orcamento.id)}
                    >
                      🗑️ Deletar Orçamento
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminOrcamentos;
