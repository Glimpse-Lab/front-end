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
      const formData = new FormData();
      formData.append('nome', data.nome);
      formData.append('descricao', data.descricao);
      formData.append('preco', data.preco);
      formData.append('quantidadeEstoque', data.quantidadeEstoque);
      if (data.especificacaoTecnica) formData.append('especificacaoTecnica', data.especificacaoTecnica);
      if (data.categoriaId) formData.append('categoriaId', data.categoriaId);
      if (data.imagemUrl) formData.append('imagemUrl', data.imagemUrl);
      if (data.file) formData.append('file', data.file);
      const response = await api.post("/produtos", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Atualizar produto
  update: async (id, data) => {
    try {
      const formData = new FormData();
      formData.append('nome', data.nome);
      formData.append('descricao', data.descricao);
      formData.append('preco', data.preco);
      formData.append('quantidadeEstoque', data.quantidadeEstoque);
      if (data.especificacaoTecnica) formData.append('especificacaoTecnica', data.especificacaoTecnica);
      if (data.categoriaId) formData.append('categoriaId', data.categoriaId);
      if (data.imagemUrl) formData.append('imagemUrl', data.imagemUrl);
      if (data.file) formData.append('file', data.file);
      const response = await api.put(`/produtos/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
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
