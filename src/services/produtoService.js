import api from '../provider/api';

export async function criarProduto(payload) {
  // payload: { nome, descricao, preco, quantidadeEstoque, especificacaoTecnica, imagemUrl, categoriaId }
  return api.post('/produtos', payload).then(res => res.data);
}