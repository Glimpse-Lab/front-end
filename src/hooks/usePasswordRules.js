import { useMemo } from "react";
import { getPasswordRules } from "../utils/helpers.js";

/**
 * Hook customizado para gerenciar regras de validação de senha
 */
function usePasswordRules(senha) {
  const rules = useMemo(() => {
    return getPasswordRules(senha);
  }, [senha]);

  return rules;
}

export default usePasswordRules;
