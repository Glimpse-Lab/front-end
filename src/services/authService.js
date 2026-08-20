import api from "../provider/api";

const authService = {
  // Realiza o login, armazena token e dados do usuário no localStorage
  login: async (email, senha) => {
    const response = await api.post("/usuarios/login", { email, senha });

    // Back-end pode retornar o token em "token" ou "mensagem"
    const tokenValue = response.data.token || response.data.mensagem;

    if (tokenValue) {
      localStorage.setItem("token", tokenValue);

      const userData = {
        id: response.data.id,
        nome: response.data.nome,
        email: response.data.email,
        cpf: response.data.cpf,
        role: response.data.role || 'PADRAO',
      };
      localStorage.setItem("user", JSON.stringify(userData));

      // Adiciona o token ao header padrão da instância Axios
      api.defaults.headers.common["Authorization"] = `Bearer ${tokenValue}`;
    } else {
      throw new Error("Servidor não retornou token na resposta do login");
    }
  },

  // Obtém o token armazenado no localStorage
  getToken: () => {
    return localStorage.getItem("token");
  },

  // Obtém os dados do usuário armazenados no localStorage
  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Verifica se o usuário está autenticado (token presente)
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  // Remove o token e dados do usuário no logout
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
  },
};

export default authService;
