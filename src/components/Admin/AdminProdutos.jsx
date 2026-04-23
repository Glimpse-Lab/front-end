import { useState, useEffect } from "react";
import { getProdutos, saveProdutos } from "../../services/produtosService.js";

function AdminProdutos() {
  const [produtos, setProdutos] = useState(getProdutos());
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    material: "",
    warranty: "",
    imageUrl: ""
  });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Salvar produtos no localStorage sempre que mudarem
  useEffect(() => {
    saveProdutos(produtos);
  }, [produtos]);

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
      setProdutos(produtos.map(p => {
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
      const newProduto = {
        id: Math.max(...produtos.map(p => p.id), 0) + 1,
        ...formData,
        images: formData.imageUrl ? [formData.imageUrl] : [],
        fullDescription: formData.description
      };
      setProdutos([...produtos, newProduto]);
    }
    
    setFormData({
      title: "",
      description: "",
      price: "",
      material: "",
      warranty: "",
      imageUrl: ""
    });
    setShowForm(false);
  };

  const handleEdit = (produto) => {
    setFormData({
      ...produto,
      imageUrl: produto.images && produto.images.length > 0 ? produto.images[0] : ""
    });
    setEditId(produto.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Tem certeza que deseja deletar este produto?")) {
      setProdutos(produtos.filter(p => p.id !== id));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
    setFormData({
      title: "",
      description: "",
      price: "",
      material: "",
      warranty: "",
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
        <h3 style={{ margin: 0 }}>Produtos Cadastrados</h3>
        {!showForm && (
          <button style={buttonStyle} onClick={() => setShowForm(true)}>
            + Novo Produto
          </button>
        )}
      </div>

      {showForm && (
        <div style={formStyle}>
          <h4 style={{ marginTop: 0, marginBottom: "15px", color: "#1a3a52" }}>
            {editId ? "✏️ Editar Produto" : "➕ Adicionar Novo Produto"}
          </h4>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Nome do Produto"
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
              name="price"
              placeholder="Preço (ex: R$ 1.500,00)"
              value={formData.price}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <input
              type="text"
              name="material"
              placeholder="Material"
              value={formData.material}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <input
              type="text"
              name="warranty"
              placeholder="Garantia (ex: 5 anos)"
              value={formData.warranty}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <div style={{ ...inputStyle, padding: "10px", border: "2px solid #1e88e5", borderRadius: "6px", cursor: "pointer" }}>
              <label style={{ display: "block", cursor: "pointer", fontWeight: "500", color: "#1e88e5", marginBottom: "8px" }}>
                📁 Selecionar Imagem do Produto
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
                <th style={thStyle}>Produto</th>
                <th style={thStyle}>Preço</th>
                <th style={thStyle}>Material</th>
                <th style={thStyle}>Garantia</th>
                <th style={thStyle}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto, index) => (
                <tr key={produto.id} style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9" }}>
                  <td style={tdStyle}>{produto.id}</td>
                  <td style={tdStyle}>{produto.title}</td>
                  <td style={tdStyle}>{produto.price}</td>
                  <td style={tdStyle}>{produto.material}</td>
                  <td style={tdStyle}>{produto.warranty}</td>
                  <td style={tdStyle}>
                    <button
                      style={actionButtonStyle("edit")}
                      onClick={() => handleEdit(produto)}
                    >
                      Editar
                    </button>
                    <button
                      style={actionButtonStyle("delete")}
                      onClick={() => handleDelete(produto.id)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {produtos.length === 0 && (
            <p style={{ textAlign: "center", color: "#999", marginTop: "30px", padding: "20px" }}>
              Nenhum produto cadastrado
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminProdutos;
