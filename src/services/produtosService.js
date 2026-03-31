const produtos = [
  {
    id: 1,
    title: "Janela Maxim Ar",
    description: "Janela de alumínio com alta qualidade",
    fullDescription: "Janela de alumínio com alta qualidade e durabilidade. Oferece excelente ventilação e é perfeita para sua residência ou comércio. Construída com alumínio reforçado e vidro temperado de segurança.",
    images: [
      "/src/assets/janelaMaximAr.jpg",
      "/src/assets/janela_veneziana_aluminio_branco_3_folhas.jpg",
      "/src/assets/porta_pivotante_de_aluminio_branco.jpg"
    ],
    price: "R$ 450,00 a 850,00",
    material: "Alumínio",
    warranty: "5 anos"
  },
  {
    id: 2,
    title: "Porta Pivotante",
    description: "Porta de alumínio com alta qualidade",
    fullDescription: "Porta de alumínio com acabamento elegante e vidro temperado de alta segurança. Ideal para ambientes residenciais e comerciais modernos. Oferece isolamento térmico e acústico superior.",
    images: [
      "/src/assets/porta_pivotante_de_aluminio_branco.jpg",
      "/src/assets/guarda-corpo-de-aluminio-branco-.jpg",
      "/src/assets/janelaMaximAr.jpg"
    ],
    price: "R$ 1.200,00 a 2.500,00",
    material: "Alumínio com vidro temperado",
    warranty: "5 anos"
  },
  {
    id: 3,
    title: "Portão com Motor(PPA)",
    description: "Portão de alumínio com motor elétrico",
    fullDescription: "Portão de alumínio com motor elétrico PPA, oferecendo comodidade, segurança e automação para sua residência ou comércio. Sistema anti-esmagamento e travas anti-arrombamento inclusos.",
    images: [
      "/src/assets/portaocomMotor.png",
      "/src/assets/motorJET.jpg",
      "/src/assets/motor_de_portao_ppa_dz_stark.png"
    ],
    price: "R$ 2.800,00 a 5.000,00",
    material: "Alumínio com motor PPA",
    warranty: "2 anos (motor) + 5 anos (estrutura)"
  },
  {
    id: 4,
    title: "Motor de Portão PPA",
    description: "Motor elétrico para portões automáticos",
    fullDescription: "Motor elétrico PPA para portões de alumínio, oferecendo operação silenciosa, segura e confiável. Compatível com sistemas de controle remoto wireless e sensores de segurança.",
    images: [
      "/src/assets/motor_de_portao_ppa_dz_stark.png",
      "/src/assets/motorJET.jpg",
      "/src/assets/portaocomMotor.png"
    ],
    price: "R$ 800,00 a 1.500,00",
    material: "Motor PPA",
    warranty: "2 anos"
  },
  {
    id: 5,
    title: "Janela Veneziana 3 folhas",
    description: "Janela com acabamento branco",
    fullDescription: "Janela veneziana de alumínio branco com 3 folhas de vidro e sistema de ventilação avançado. Fornece privacidade, beleza e controle de luz natural para sua casa ou comércio.",
    images: [
      "/src/assets/janela_veneziana_aluminio_branco_3_folhas.jpg",
      "/src/assets/janela_veneziana_aluminio_branco_3_folhas.png",
      "/src/assets/janelaMaximAr.jpg"
    ],
    price: "R$ 600,00 a 1.200,00",
    material: "Alumínio branco",
    warranty: "5 anos"
  },
  {
    id: 6,
    title: "Guarda-Corpo em Alumínio",
    description: "Guarda-corpo com acabamento branco",
    fullDescription: "Guarda-corpo de alumínio com acabamento branco de alta qualidade, ideal para segurança e estética em sua casa ou comércio. Segue normas de segurança e resiste a intempéries.",
    images: [
      "/src/assets/guarda-corpo-de-aluminio-branco-.jpg",
      "/src/assets/porta_pivotante_de_aluminio_branco.jpg",
      "/src/assets/janelaMaximAr.jpg"
    ],
    price: "R$ 300,00 a 700,00",
    material: "Alumínio branco",
    warranty: "5 anos"
  }
];

/**
 * Retorna todos os produtos
 */
function getProdutos() {
  return produtos;
}

/**
 * Busca um produto por ID
 */
function getProdutoById(id) {
  return produtos.find(p => p.id === parseInt(id));
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

export { getProdutos, getProdutoById, abrirModalProduto };
