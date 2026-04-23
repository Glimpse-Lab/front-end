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
      const response = await api.post("/usuarios/login", {
        email,
        senha,
      });

      // Se houver token na resposta, armazenar no localStorage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user || {}));
      }

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Erro ao fazer login",
        error,
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
      const response = await api.post("/usuarios/cadastrar", {
        nome,
        email,
        senha,
        cpf,
      });

      // Se houver token na resposta, armazenar no localStorage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user || {}));
      }

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Erro ao fazer cadastro",
        error,
      };
    }
  },

  /**
   * Faz logout do usuário
   */
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
   * Verifica se o usuário está autenticado
   * @returns {boolean} True se houver token, false caso contrário
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};

export default authService;
