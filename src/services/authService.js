import { validarCPF, validarEmail, validarSenha } from "../utils/validators.js";

const API_URL = "http://localhost:8080";

/**
 * Cadastra um novo usuário
 */
async function cadastrar(nome, email, senha, cpf) {
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
      body: JSON.stringify({ nome, email, senha, cpf }),
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
    const response = await fetch(`${API_URL}/usuarios/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      throw new Error("Erro ao realizar login");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export { cadastrar, logar };
