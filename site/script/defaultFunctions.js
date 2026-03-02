const validarSenha = (senha) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(senha);
};

const validarEmail = (email) => {
    const regex = 
    /}^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

const validarCPF = (cpf) => {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf);
};

const validarTelefone = (telefone) => {
    const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return regex.test(telefone);
};

export { validarSenha, validarEmail, validarCPF, validarTelefone };
