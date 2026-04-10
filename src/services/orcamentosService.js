const orcamentos = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@email.com",
    telefone: "(11) 98765-4321",
    assunto: "Orçamento para Portão Automático",
    descricao: "Gostaria de um orçamento para instalar um portão automático em minha residência.",
    status: "pendente",
    data: "2026-04-08",
    produtos: ["Portão com Motor(PPA)", "Motor de Portão PPA"],
    valor_estimado: null
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@email.com",
    telefone: "(21) 99876-5432",
    assunto: "Projeto Personalizado - Janelas",
    descricao: "Preciso de um projeto completo para renovação de todas as janelas do imóvel.",
    status: "respondido",
    data: "2026-04-05",
    produtos: ["Janela Maxim Ar"],
    valor_estimado: "R$ 5.500,00"
  },
  {
    id: 3,
    nome: "Carlos Oliveira",
    email: "carlos@email.com",
    telefone: "(31) 97654-3210",
    assunto: "Guarda-Corpo para Varanda",
    descricao: "Gostaria de instalar um guarda-corpo de segurança em minha varanda.",
    status: "em_analise",
    data: "2026-04-03",
    produtos: ["Guarda-Corpo de Alumínio"],
    valor_estimado: "R$ 2.800,00"
  }
];

/**
 * Obtém todos os orçamentos
 */
function getOrcamentos() {
  return orcamentos;
}

/**
 * Obtém um orçamento por ID
 */
function getOrcamento(id) {
  return orcamentos.find(o => o.id === id);
}

/**
 * Adiciona um novo orçamento
 */
function adicionarOrcamento(orcamento) {
  const novoOrcamento = {
    id: Math.max(...orcamentos.map(o => o.id), 0) + 1,
    ...orcamento,
    status: "pendente",
    data: new Date().toISOString().split('T')[0]
  };
  orcamentos.push(novoOrcamento);
  return novoOrcamento;
}

/**
 * Atualiza um orçamento
 */
function atualizarOrcamento(id, orcamento) {
  const index = orcamentos.findIndex(o => o.id === id);
  if (index !== -1) {
    orcamentos[index] = { ...orcamentos[index], ...orcamento };
    return orcamentos[index];
  }
  return null;
}

/**
 * Deleta um orçamento
 */
function deletarOrcamento(id) {
  const index = orcamentos.findIndex(o => o.id === id);
  if (index !== -1) {
    orcamentos.splice(index, 1);
    return true;
  }
  return false;
}

export { getOrcamentos, getOrcamento, adicionarOrcamento, atualizarOrcamento, deletarOrcamento };
