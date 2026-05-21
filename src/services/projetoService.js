import api from "../provider/api";

const projetoService = {
  // Buscar todos os projetos
  fetchAll: async () => {
    try {
      const response = await api.get("/galeriaportfolio");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Buscar projeto por ID
  fetchById: async (id) => {
    try {
      const response = await api.get(`/galeriaportfolio/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Criar novo projeto
  create: async (data) => {
    try {
      const response = await api.post("/galeriaportfolio", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Atualizar projeto
  update: async (id, data) => {
    try {
      const response = await api.put(`/galeriaportfolio/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Deletar projeto
  delete: async (id) => {
    try {
      await api.delete(`/galeriaportfolio/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default projetoService;
