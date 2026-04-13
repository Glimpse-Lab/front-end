import { useMemo } from "react";

const usePasswordRules = (senha) => {
  return useMemo(() => ({
    min: senha.length >= 8,
    upper: /[A-Z]/.test(senha),
    lower: /[a-z]/.test(senha),
    number: /[0-9]/.test(senha),
    special: /[@$!%*?&]/.test(senha)
  }), [senha]);
};

export default usePasswordRules;