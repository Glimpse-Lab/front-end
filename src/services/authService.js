import { validarCPF, validarEmail, validarSenha } from "../utils/validators.js";

const API_URL = "http://localhost:3300";

/**
 * Cadastra um novo usuário
 */
async function cadastrar(email, senha, cpf) {
  if (!validarCPF(cpf)) {
    return { success: false, message: "CPF inválido" };
  }

  if (!validarEmail(email)) {
    return { success: false, message: "Email inválido" };
  }

  if (!validarSenha(senha)) {
    return { success: false, message: "Senha inválida" };
  }

  try {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha, cpf }),
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar usuário");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

/**
 * Realiza login do usuário
 */
async function logar(email, senha) {
  if (!validarEmail(email)) {
    return { success: false, message: "Email inválido" };
  }

  if (!validarSenha(senha)) {
    return { success: false, message: "Senha inválida" };
  }

  try {
    const response = await fetch(
      `${API_URL}/usuarios?email=${encodeURIComponent(email)}`
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar usuário");
    }

    const usuarios = await response.json();

    if (usuarios.length === 0) {
      return { success: false, message: "Usuário não encontrado" };
    }

    const usuario = usuarios[0];

    if (usuario.senha !== senha) {
      return { success: false, message: "Senha incorreta" };
    }

    return { success: true, data: usuario };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export { cadastrar, logar };
