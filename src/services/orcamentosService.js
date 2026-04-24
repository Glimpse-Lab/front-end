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

export async function criarOrcamento(dados) {
  // Simulamos um pequeno delay de 500ms para o botão dar o feedback visual de "Enviando..."
  await new Promise(resolve => setTimeout(resolve, 500));

  const orcamentos = getOrcamentos();
  
  const novoOrcamento = {
    id: Date.now().toString(), // Cria um ID único
    dataCriacao: new Date().toISOString(),
    ...dados
  };

  console.log(novoOrcamento);

  orcamentos.push(novoOrcamento);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orcamentos));

  return novoOrcamento;

}