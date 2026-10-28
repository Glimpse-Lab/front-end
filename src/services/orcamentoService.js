import api from "../provider/api";

const orcamentoService = {
  // Criar novo orçamento com dados de cliente inline
  // Cria novo cliente se não existir, ou usa cliente existente
  criarComCliente: async (nomeCliente, emailCliente, celularCliente, descricaoProjeto, cep, numEndereco, complemento, rua, bairro, cidade, estado) => {
    try {
      const response = await api.post("/orcamentos/com-cliente", {
        nomeCliente,
        emailCliente,
        celularCliente,
        descricaoProjeto,
        cep,
        numEndereco,
        complemento,
        rua,
        bairro,
        cidade,
        estado,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Criar orçamento com ID de cliente existente
  criar: async (clienteId, descricaoProjeto, cep, numEndereco, complemento) => {
    try {
      const response = await api.post("/orcamentos", {
        clienteId,
        descricaoProjeto,
        cep,
        numEndereco,
        complemento,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obter orçamento por ID (requer autenticação)
  obterPorId: async (id) => {
    try {
      const response = await api.get(`/orcamentos/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Listar todos os orçamentos (requer autenticação)
  // page/size: paginação; search: filtro por nome/e-mail do cliente ou descrição; status: filtro por status
  listar: async ({ page, size, search, status } = {}) => {
    try {
      const params = {};
      if (page !== undefined) params.page = page;
      if (size !== undefined) params.size = size;
      if (search && search.trim()) params.search = search.trim();
      if (status) params.status = status;
      const response = await api.get("/orcamentos", { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Atualizar orçamento (requer autenticação)
  atualizar: async (id, clienteId, descricaoProjeto, cep, numEndereco, complemento) => {
    try {
      const response = await api.put(`/orcamentos/${id}`, {
        clienteId,
        descricaoProjeto,
        cep,
        numEndereco,
        complemento,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  atualizarStatus: async (id, status) => {
    try {
      const response = await api.put(`/orcamentos/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Excluir orçamento (requer autenticação)
  excluir: async (id) => {
    try {
      await api.delete(`/orcamentos/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default orcamentoService;
