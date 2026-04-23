import { useState, useEffect } from "react";
import { getProjetos, saveProjetos } from "../../services/projetosService.js";

function AdminProjetos() {
  const [projetos, setProjetos] = useState(getProjetos());
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    imageUrl: ""
  });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Salvar projetos no localStorage sempre que mudarem
  useEffect(() => {
    saveProjetos(projetos);
  }, [projetos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          imageUrl: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editId) {
      setProjetos(projetos.map(p => {
        if (p.id === editId) {
          const updated = { ...p, ...formData };
          // Se houver URL de imagem, adicionar ao array
          if (formData.imageUrl && !updated.images.includes(formData.imageUrl)) {
            updated.images = [formData.imageUrl, ...updated.images.slice(0, 2)];
          }
          return updated;
        }
        return p;
      }));
      setEditId(null);
    } else {
      const newProjeto = {
        id: Math.max(...projetos.map(p => p.id), 0) + 1,
        title: formData.title,
        description: formData.description,
        location: formData.location,
        date: formData.date,
        images: formData.imageUrl ? [formData.imageUrl] : [],
        fullDescription: formData.description
      };
      setProjetos([...projetos, newProjeto]);
    }
    
    setFormData({
      title: "",
      description: "",
      location: "",
      date: "",
      imageUrl: ""
    });
    setShowForm(false);
  };

  const handleEdit = (projeto) => {
    setFormData({
      ...projeto,
      imageUrl: projeto.images && projeto.images.length > 0 ? projeto.images[0] : ""
    });
    setEditId(projeto.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Tem certeza que deseja deletar este projeto?")) {
      setProjetos(projetos.filter(p => p.id !== id));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
    setFormData({
      title: "",
      description: "",
      location: "",
      date: "",
      imageUrl: ""
    });
  };

  const containerStyle = {
    padding: "0"
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0",
    padding: "20px 30px",
    borderBottom: "1px solid #e0e0e0"
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#2196f3",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background-color 0.3s ease"
  };

  const formStyle = {
    backgroundColor: "#f9f9f9",
    padding: "25px 30px",
    borderBottom: "1px solid #e0e0e0",
    margin: "0"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontFamily: "inherit",
    fontSize: "14px",
    transition: "border-color 0.3s ease"
  };

  const formButtonsStyle = {
    display: "flex",
    gap: "10px"
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "0",
    backgroundColor: "white",
    borderRadius: "0"
  };

  const thStyle = {
    backgroundColor: "#f5f5f5",
    color: "#1a3a52",
    padding: "15px 20px",
    textAlign: "left",
    fontWeight: "600",
    borderBottom: "2px solid #e0e0e0",
    fontSize: "13px"
  };

  const tdStyle = {
    padding: "15px 20px",
    borderBottom: "1px solid #e0e0e0"
  };

  const contentPadding = {
    padding: "30px"
  };

  const actionButtonStyle = (type) => ({
    padding: "6px 12px",
    marginRight: "5px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    backgroundColor: type === "delete" ? "#f44336" : type === "edit" ? "#ff9800" : "#4caf50",
    color: "white"
  });

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h3 style={{ margin: 0 }}>Projetos Cadastrados</h3>
        {!showForm && (
          <button style={buttonStyle} onClick={() => setShowForm(true)}>
            + Novo Projeto
          </button>
        )}
      </div>

      {showForm && (
        <div style={formStyle}>
          <h4 style={{ marginTop: 0, marginBottom: "15px", color: "#1a3a52" }}>
            {editId ? "✏️ Editar Projeto" : "➕ Adicionar Novo Projeto"}
          </h4>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Nome do Projeto"
              value={formData.title}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <textarea
              name="description"
              placeholder="Descrição"
              value={formData.description}
              onChange={handleChange}
              style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Localização (ex: São Paulo, SP)"
              value={formData.location}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <input
              type="month"
              name="date"
              placeholder="Data (Mês/Ano)"
              value={formData.date}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <div style={{ ...inputStyle, padding: "10px", border: "2px solid #2196f3", borderRadius: "6px", cursor: "pointer" }}>
              <label style={{ display: "block", cursor: "pointer", fontWeight: "500", color: "#2196f3", marginBottom: "8px" }}>
                📁 Selecionar Imagem do Projeto
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "block", width: "100%", cursor: "pointer" }}
              />
              {formData.imageUrl && (
                <div style={{ marginTop: "10px" }}>
                  <p style={{ margin: "8px 0 4px 0", fontSize: "12px", color: "#666" }}>Preview:</p>
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    style={{ maxWidth: "100%", maxHeight: "200px", borderRadius: "4px" }}
                  />
                </div>
              )}
            </div>
            <div style={formButtonsStyle}>
              <button type="submit" style={buttonStyle}>
                {editId ? "Atualizar" : "Adicionar"}
              </button>
              <button
                type="button"
                style={{ ...buttonStyle, backgroundColor: "#999" }}
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {!showForm && (
        <div style={contentPadding}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Projeto</th>
                <th style={thStyle}>Localização</th>
                <th style={thStyle}>Data</th>
                <th style={thStyle}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {projetos.map((projeto, index) => (
                <tr key={projeto.id} style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9" }}>
                  <td style={tdStyle}>{projeto.id}</td>
                  <td style={tdStyle}>{projeto.title}</td>
                  <td style={tdStyle}>{projeto.location}</td>
                  <td style={tdStyle}>{projeto.date}</td>
                  <td style={tdStyle}>
                    <button
                      style={actionButtonStyle("edit")}
                      onClick={() => handleEdit(projeto)}
                    >
                      Editar
                    </button>
                    <button
                      style={actionButtonStyle("delete")}
                      onClick={() => handleDelete(projeto.id)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {projetos.length === 0 && (
            <p style={{ textAlign: "center", color: "#999", marginTop: "30px", padding: "20px" }}>
              Nenhum projeto cadastrado
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminProjetos;
