import { validarCPF, validarEmail, validarSenha } from "./defaultFunctions";

async function cadastrar(email, senha, cpf) {
  if (!validarCPF(cpf)) {
    console.error("CPF inválido");
    return { success: false, message: "CPF inválido" };
  }
  
  if (!validarEmail(email)) {
    console.error("Email inválido");
    return { success: false, message: "Email inválido" };
  }
  
  if (!validarSenha(senha)) {
    console.error("Senha inválida");
    return { success: false, message: "Senha inválida" };
  }

  try {
    const response = await fetch("http://localhost:3000/usuarios", {
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
    console.log("Usuário cadastrado com sucesso:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    return { success: false, message: error.message };
  }
}

async function logar(email, senha) {
  if (!validarEmail(email)) {
    console.error("Email inválido");
    return { success: false, message: "Email inválido" };
  }
  
  if (!validarSenha(senha)) {
    console.error("Senha inválida");
    return { success: false, message: "Senha inválida" };
  }

  try {
    const response = await fetch(`http://localhost:3000/usuarios?email=${encodeURIComponent(email)}`);
    
    if (!response.ok) {
      throw new Error("Erro ao buscar usuário");
    }
    
    const usuarios = await response.json();
    
    if (usuarios.length === 0) {
      console.error("Usuário não encontrado");
      return { success: false, message: "Usuário não encontrado" };
    }
    
    const usuario = usuarios[0];
    
    if (usuario.senha !== senha) {
      console.error("Senha incorreta");
      return { success: false, message: "Senha incorreta" };
    }
    
    console.log("Login realizado com sucesso:", usuario);
    return { success: true, data: usuario };
  } catch (error) {
    console.error("Erro ao logar:", error);
    return { success: false, message: error.message };
  }
}


export { cadastrar, logar };