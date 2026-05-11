import api from "../provider/api";

const clienteService = {
  // Validar se cliente já existe por email ou telefone
  validarClienteDuplicado: async (email, celular) => {
    try {
      const response = await api.post("/clientes/validar", {
        email,
        celular,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Cadastrar novo cliente
  cadastrar: async (nome, email, celular) => {
    try {
      const response = await api.post("/clientes", {
        nome,
        email,
        celular,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obter cliente por ID
  obterPorId: async (id) => {
    try {
      const response = await api.get(`/clientes/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Listar todos os clientes (requer autenticação)
  listar: async () => {
    try {
      const response = await api.get("/clientes");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Atualizar cliente (requer autenticação)
  atualizar: async (id, nome, email, celular) => {
    try {
      const response = await api.put(`/clientes/${id}`, {
        nome,
        email,
        celular,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Excluir cliente (requer autenticação)
  excluir: async (id) => {
    try {
      await api.delete(`/clientes/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default clienteService;
