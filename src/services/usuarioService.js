import api from "../provider/api";

const usuarioService = {
  listar: async () => {
    const response = await api.get("/usuarios");
    return response.data;
  },

  cadastrar: async ({ name, email, cpf, password }) => {
    const response = await api.post("/usuarios", {
      nome: name,
      email,
      cpf,
      senha: password
    });
    return response.data;
  },

  remover: async (id) => {
    await api.delete(`/usuarios/${id}`);
  },

  atualizar: async (id, { name, email, password, role }) => {
    const body = { nome: name, email };
    if (password) body.senha = password;
    if (role) body.role = role; // Apenas enviado se fornecido (ADMIN)
    const response = await api.put(`/usuarios/${id}`, body);
    return response.data;
  },
};

export default usuarioService;
