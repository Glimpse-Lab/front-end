import api from "../provider/api";

const produtoService = {
  // Buscar todos os produtos
  fetchAll: async () => {
    try {
      const response = await api.get("/produtos");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Buscar produto por ID
  fetchById: async (id) => {
    try {
      const response = await api.get(`/produtos/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Criar novo produto (Ajustado para envio de arquivo)
  create: async (data) => {
    try {
      const response = await api.post("/produtos", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Atualizar produto (Ajustado para envio de arquivo)
  update: async (id, data) => {
    try {
      const response = await api.put(`/produtos/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Deletar produto
  delete: async (id) => {
    try {
      await api.delete(`/produtos/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default produtoService;