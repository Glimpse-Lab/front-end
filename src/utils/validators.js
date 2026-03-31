/**
 * Valida se uma senha atende aos requisitos:
 * - Mínimo 8 caracteres
 * - Uma letra maiúscula
 * - Uma letra minúscula
 * - Um número
 * - Um caractere especial (@$!%*?&)
 */
function validarSenha(senha) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(senha);
}

/**
 * Valida formato de email
 */
function validarEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

/**
 * Valida CPF (apenas verifica formato e dígitos)
 */
function validarCPF(cpf) {
  const cpfLimpo = cpf.replace(/\D/g, '');

  if (cpfLimpo.length !== 11) {
    return false;
  }

  if (/^(\d)\1{10}$/.test(cpfLimpo)) {
    return false;
  }

  return true;
}

/**
 * Valida número de telefone no formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
 */
function validarTelefone(telefone) {
  const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return regex.test(telefone);
}

export { validarSenha, validarEmail, validarCPF, validarTelefone };
