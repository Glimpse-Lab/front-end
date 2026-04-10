import { getProdutosStorage, saveProdutosStorage } from "../utils/dataSync.js";

/**
 * Retorna todos os produtos do localStorage
 */
function getProdutos() {
  return getProdutosStorage();
}

/**
 * Busca um produto por ID
 */
function getProdutoById(id) {
  const produtos = getProdutos();
  return produtos.find(p => p.id === parseInt(id));
}

/**
 * Salva alterações dos produtos no localStorage
 */
function saveProdutos(produtos) {
  saveProdutosStorage(produtos);
}

/**
 * Abre modal de produto (para ser integrado com componente React)
 */
function abrirModalProduto(produto) {
  const modal = document.getElementById("produto-modal-catalogo");
  if (!modal) return;

  const modalContent = modal.querySelector(".modal-content");

  let imagesHTML = produto.images.map((img, index) => `
    <div class="carousel-slide ${index === 0 ? 'ativo' : ''}">
      <img src="${img}" alt="Imagem ${index + 1} do produto">
    </div>
  `).join('');

  modalContent.innerHTML = `
    <span class="modal-close">&times;</span>
    <div class="modal-body">
      <div class="carousel">${imagesHTML}</div>
      <div class="produto-info">
        <h2>${produto.title}</h2>
        <p>${produto.fullDescription}</p>
        <p><strong>Preço:</strong> ${produto.price}</p>
        <p><strong>Material:</strong> ${produto.material}</p>
        <p><strong>Garantia:</strong> ${produto.warranty}</p>
      </div>
    </div>
  `;

  modal.style.display = "flex";
}

export { getProdutos, getProdutoById, abrirModalProduto, saveProdutos };
