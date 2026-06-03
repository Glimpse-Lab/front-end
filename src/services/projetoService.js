import api from "../provider/api";

const projetoService = {
  // Buscar todos os projetos
  fetchAll: async () => {
    try {
      const response = await api.get("/projetos");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Buscar projeto por ID
  fetchById: async (id) => {
    try {
      const response = await api.get(`/projetos/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Criar novo projeto
  create: async (data) => {
    try {
      const response = await api.post("/projetos", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Atualizar projeto
  update: async (id, data) => {
    try {
      const response = await api.put(`/projetos/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Deletar projeto
  delete: async (id) => {
    try {
      await api.delete(`/projetos/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default projetoService;