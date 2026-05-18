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

  // Criar novo produto
  create: async (data) => {
    try {
      const response = await api.post("/produtos", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Atualizar produto
  update: async (id, data) => {
    try {
      const response = await api.put(`/produtos/${id}`, data);
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
