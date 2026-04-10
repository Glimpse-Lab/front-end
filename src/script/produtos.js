// Inicializar dados do localStorage
function inicializarProdutosDoStorage() {
  try {
    const stored = localStorage.getItem("gpm_produtos");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Erro ao carregar produtos do localStorage:", error);
  }
  
  // Dados padrão se localStorage estiver vazio
  return [
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
}

let produtos = inicializarProdutosDoStorage();

// Escutar mudanças no localStorage via storage event
window.addEventListener("storage", function(event) {
  if (event.key === "gpm_produtos" || event.key === "gpm_produtos_timestamp") {
    console.log("Sincronizando produtos da página inicial...");
    // Recarregar a página quando detectar mudanças
    location.reload();
  }
});

// Fallback: também verificar periodicamente (para sincronizar em abas abertas simultaneamente)
setInterval(() => {
  try {
    const stored = localStorage.getItem("gpm_produtos");
    if (stored) {
      const newProdutos = JSON.parse(stored);
      if (JSON.stringify(newProdutos) !== JSON.stringify(produtos)) {
        console.log("Detectada mudança em produtos, recarregando...");
        produtos = newProdutos;
        // Renderizar novamente
        const CatalogoContainer = document.getElementById("catalogo-container");
        if (CatalogoContainer) {
          location.reload();
        }
      }
    }
  } catch (error) {
    console.error("Erro ao sincronizar produtos:", error);
  }
}, 2000);

// Função para renderizar produtos no grid
function renderizarProdutos() {
  const grid = document.querySelector(".catalogo-grid");
  if (!grid) return;
  
  // Limpar grid
  grid.innerHTML = "";
  
  produtos.forEach((produto, index) => {
    const article = document.createElement("article");
    article.className = "produto";
    article.setAttribute("data-product-id", produto.id);
    
    article.innerHTML = `
      <div class="produto-img">
        <img src="${produto.images && produto.images.length > 0 ? produto.images[0] : '/src/assets/janelaMaximAr.jpg'}" alt="${produto.title}" />
      </div>
      <h3>${produto.title}</h3>
      <p>${produto.description}</p>
      <button class="btn">Ver produto</button>
    `;
    
    // Adicionar event listener em vez de onclick inline
    const btn = article.querySelector(".btn");
    btn.addEventListener("click", () => {
      abrirModalProduto(produto);
    });
    
    grid.appendChild(article);
  });
}

// Renderizar produtos assim que a página carregar
document.addEventListener("DOMContentLoaded", renderizarProdutos);
function abrirModalProduto(produto) {
  const modal = document.getElementById("produto-modal-catalogo");
  const modalContent = modal.querySelector(".modal-content");
  
  let imagesHTML = produto.images.map((img, index) => `
    <div class="carousel-slide ${index === 0 ? 'ativo' : ''}">
      <img src="${img}" alt="Imagem ${index + 1} do produto">
    </div>
  `).join('');
  
  modalContent.innerHTML = `
    <span class="modal-close">&times;</span>
    
    <div class="modal-body">
      <div class="modal-carousel">
        <div class="carousel-track">
          ${imagesHTML}
        </div>
        <button class="carousel-prev">❮</button>
        <button class="carousel-next">❯</button>
        <div class="carousel-indicators">
          ${produto.images.map((_, i) => `<span class="indicator ${i === 0 ? 'ativo' : ''}" data-index="${i}"></span>`).join('')}
        </div>
      </div>
      
      <div class="modal-info">
        <h2>${produto.title}</h2>
        <p class="modal-description">${produto.fullDescription}</p>
        <div class="modal-meta">
          <div class="meta-item">
            <span class="meta-label">Preço:</span>
            <span class="meta-value">${produto.price}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Material:</span>
            <span class="meta-value">${produto.material}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Garantia:</span>
            <span class="meta-value">${produto.warranty}</span>
          </div>
        </div>
        <button class="btn btn-main modal-cta">Solicitar orçamento</button>
      </div>
    </div>
  `;
  
  modal.style.display = "flex";
  
  // Carousel functionality
  let currentImageIndex = 0;
  
  function mostrarSlide(index) {
    const slides = modal.querySelectorAll(".carousel-slide");
    const indicators = modal.querySelectorAll(".indicator");
    
    if (slides.length === 0) {
      console.error("Nenhum slide encontrado");
      return;
    }
    
    slides.forEach(slide => slide.classList.remove("ativo"));
    indicators.forEach(ind => ind.classList.remove("ativo"));
    
    if (index >= 0 && index < slides.length) {
      slides[index].classList.add("ativo");
      if (indicators[index]) {
        indicators[index].classList.add("ativo");
      }
    }
  }
  
  const nextBtn = modal.querySelector(".carousel-next");
  const prevBtn = modal.querySelector(".carousel-prev");
  
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const slidesCount = modal.querySelectorAll(".carousel-slide").length;
      currentImageIndex = (currentImageIndex + 1) % slidesCount;
      mostrarSlide(currentImageIndex);
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const slidesCount = modal.querySelectorAll(".carousel-slide").length;
      currentImageIndex = (currentImageIndex - 1 + slidesCount) % slidesCount;
      mostrarSlide(currentImageIndex);
    });
  }
  
  const indicators = modal.querySelectorAll(".indicator");
  indicators.forEach(ind => {
    ind.addEventListener("click", () => {
      currentImageIndex = parseInt(ind.dataset.index);
      mostrarSlide(currentImageIndex);
    });
  });
  
  // Fechar modal
  modal.querySelector(".modal-close").addEventListener("click", fecharModalProduto);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      fecharModalProduto();
    }
  });
}

// Função para fechar o modal
function fecharModalProduto() {
  const modal = document.getElementById("produto-modal-catalogo");
  modal.style.display = "none";
}

// Fallback: renderizar produtos se DOMContentLoaded não disparar a tempo
setTimeout(() => {
  const grid = document.querySelector(".catalogo-grid");
  if (grid && grid.children.length === 0) {
    renderizarProdutos();
  }
}, 500);
