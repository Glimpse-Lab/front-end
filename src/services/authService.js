import api from "./api.js";

/**
 * Serviço de autenticação
 * Centraliza todas as requisições relacionadas a login e cadastro
 */

export const authService = {
  /**
   * Realiza login do usuário
   * @param {string} email - Email do usuário
   * @param {string} senha - Senha do usuário
   * @returns {Promise<Object>} Dados do usuário e token
   */
  login: async (email, senha) => {
    try {
      console.log("🔐 Iniciando login para:", email);
      const response = await api.post("/usuarios/login", {
        email,
        senha,
      });

      console.log("📨 Resposta completa do servidor:", response);
      console.log("📨 Dados da resposta:", response.data);
      console.log("📨 Status:", response.status);
      console.log("📨 Headers:", response.headers);

      // Se houver token na resposta, armazenar no localStorage
      if (response.data.token) {
        console.log("✅ Token recebido:", response.data.token.substring(0, 20) + "...");
        localStorage.setItem("token", response.data.token);
        console.log("✅ Token armazenado em localStorage");
        console.log("✅ Verificando localStorage:", localStorage.getItem("token") ? "OK" : "FALHOU");
        
        // Armazena os dados do usuário sem a senha
        const userData = {
          id: response.data.id,
          nome: response.data.nome,
          email: response.data.email,
          cpf: response.data.cpf,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("✅ Dados do usuário armazenados:", userData);
        console.log("✅ Verificando localStorage user:", localStorage.getItem("user") ? "OK" : "FALHOU");
        
        // Adiciona o token ao header da API
        api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
        console.log("✅ Header Authorization configurado");
      } else {
        console.error("❌ ERRO: Resposta do servidor SEM token!");
        console.error("❌ Resposta recebida:", JSON.stringify(response.data, null, 2));
        throw new Error("Servidor não retornou token na resposta do login");
      }

      return {
        success: true,
        data: response.data,
        message: "Login realizado com sucesso",
      };
    } catch (error) {
      console.error("❌ Erro no login - Detalhes completos:");
      console.error("❌ Status:", error.response?.status);
      console.error("❌ Dados do erro:", error.response?.data);
      console.error("❌ Mensagem de erro:", error.message);
      console.error("❌ Erro completo:", error);
      
      const message = error.response?.data?.message || error.response?.statusText || error.message || "Erro ao fazer login";
      return {
        success: false,
        message,
        error: error.response?.status,
      };
    }
  },

  /**
   * Realiza cadastro de novo usuário
   * @param {string} nome - Nome completo do usuário
   * @param {string} email - Email do usuário
   * @param {string} senha - Senha do usuário
   * @param {string} cpf - CPF do usuário
   * @returns {Promise<Object>} Dados do novo usuário
   */
  cadastro: async (nome, email, senha, cpf) => {
    try {
      const response = await api.post("/usuarios", {
        nome,
        email,
        senha,
        cpf,
      });

      return {
        success: true,
        data: response.data,
        message: "Cadastro realizado com sucesso. Faça login para continuar.",
      };
    } catch (error) {
      const message = error.response?.data?.mensagem || error.response?.statusText || "Erro ao fazer cadastro";
      return {
        success: false,
        message,
        error: error.response?.status,
      };
    }
  },

  /**
   * Faz logout do usuário
   */
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
  },

  /**
   * Obtém dados do usuário armazenado no localStorage
   * @returns {Object|null} Dados do usuário ou null
   */
  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  /**
   * Obtém o token armazenado no localStorage
   * @returns {string|null} Token ou null
   */
  getToken: () => {
    return localStorage.getItem("token");
  },

  /**
   * Verifica se o usuário está autenticado
   * @returns {boolean} True se houver token, false caso contrário
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  /**
   * Atualiza os dados do usuário no localStorage
   * @param {Object} userData - Dados atualizados do usuário
   */
  updateUser: (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
  },

  /**
   * Limpa a autenticação completamente
   */
  clearAuth: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
  },
};

export default authService;

