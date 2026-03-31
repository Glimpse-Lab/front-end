/**
 * Formata estilos condicionais para elementos de validação
 */
function ruleStyle(isValid) {
  return {
    color: isValid ? "green" : "",
    fontWeight: isValid ? "bolder" : ""
  };
}

/**
 * Retorna regras de validação de senha como objeto
 */
function getPasswordRules(senha) {
  return {
    min: senha.length >= 8,
    upper: /[A-Z]/.test(senha),
    lower: /[a-z]/.test(senha),
    number: /[0-9]/.test(senha),
    special: /[@$!%*?&#]/.test(senha)
  };
}

/**
 * Verifica se todas as regras de senha estão válidas
 */
function isPasswordValid(rules) {
  return rules.min && rules.upper && rules.lower && rules.number && rules.special;
}

export { ruleStyle, getPasswordRules, isPasswordValid };
