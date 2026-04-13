const STORAGE_KEY = "gpm_orcamentos";

export const getOrcamentos = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const atualizarOrcamento = (id, novosDados) => {
  const orcamentos = getOrcamentos();
  const index = orcamentos.findIndex(o => o.id === id);
  if (index !== -1) {
    orcamentos[index] = { ...orcamentos[index], ...novosDados };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orcamentos));
    return orcamentos[index];
  }
  return null;
};

export const deletarOrcamento = (id) => {
  const orcamentos = getOrcamentos();
  const filtrados = orcamentos.filter(o => o.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtrados));
  return true;
};