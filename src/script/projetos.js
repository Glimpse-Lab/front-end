// Inicializar dados do localStorage
function inicializarProjetosDoStorage() {
  try {
    const stored = localStorage.getItem("gpm_projetos");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Erro ao carregar projetos do localStorage:", error);
  }
  
  // Dados padrão se localStorage estiver vazio
  return [
    {
      id: 1,
      title: "Guarda-Corpo de Alumínio",
      description: "Solução elegante e segura",
      fullDescription: "Guarda-corpo de alumínio branco de alta qualidade, oferecendo segurança e elegância para qualquer ambiente. Ideal para varandas, escadas e áreas externas.",
      images: [
        "/src/assets/guarda-corpo-de-aluminio-branco-.jpg",
        "/src/assets/porta_pivotante_de_aluminio_branco.jpg",
        "/src/assets/janelaMaximAr.jpg"
      ],
      location: "São Paulo, SP",
      date: "Março 2026"
    },
    {
      id: 2,
      title: "Sistema de Travas",
      description: "Segurança premium para portas",
      fullDescription: "Sistema completo de travas e fechaduras de alumínio, garantindo máxima segurança e durabilidade. Instalação profissional incluída.",
      images: [
        "/src/assets/trava (1).jpg",
        "/src/assets/trava.jpg",
        "/src/assets/portaocomMotor.png"
      ],
      location: "Rio de Janeiro, RJ",
      date: "Fevereiro 2026"
    },
    {
      id: 3,
      title: "Motor de Portão",
      description: "Automação inteligente",
      fullDescription: "Motor de portão automático de última geração com sistema de segurança avançado. Controle remoto wireless incluído para facilitar o acesso.",
      images: [
        "/src/assets/motorJET.jpg",
        "/src/assets/motor_de_portao_ppa_dz_stark.png",
        "/src/assets/portaocomMotor.png"
      ],
      location: "Belo Horizonte, MG",
      date: "Janeiro 2026"
    },
    {
      id: 4,
      title: "Janelas Venezianas",
      description: "Ventilação e privacidade",
      fullDescription: "Janelas venezianas de alumínio branco com 3 folhas de vidro, oferecendo perfeita ventilação e controle de luz natural.",
      images: [
        "/src/assets/janela_veneziana_aluminio_branco_3_folhas.jpg",
        "/src/assets/janelaMaximAr.jpg",
        "/src/assets/janela_veneziana_aluminio_branco_3_folhas.png"
      ],
      location: "Brasília, DF",
      date: "Dezembro 2025"
    },
    {
      id: 5,
      title: "Célula Solar",
      description: "Energia sustentável",
      fullDescription: "Instalação de célula solar de alta eficiência, resultando em economia de energia e sustentabilidade ambiental.",
      images: [
        "/src/assets/fotocelula.jpg",
        "/src/assets/motorJET.jpg",
        "/src/assets/janelaMaximAr.jpg"
      ],
      location: "Curitiba, PR",
      date: "Novembro 2025"
    },
    {
      id: 6,
      title: "Porta Pivotante",
      description: "Design moderno e minimalista",
      fullDescription: "Porta pivotante de alumínio com vidro temperado, conferindo um toque de modernidade e elegância ao ambiente.",
      images: [
        "/src/assets/porta_pivotante_de_aluminio_branco.jpg",
        "/src/assets/guarda-corpo-de-aluminio-branco-.jpg",
        "/src/assets/janela_veneziana_aluminio_branco_3_folhas.jpg"
      ],
      location: "Salvador, BA",
      date: "Outubro 2025"
    }
  ];
}

let projetos = inicializarProjetosDoStorage();

// Escutar mudanças no localStorage via storage event
window.addEventListener("storage", function(event) {
  if (event.key === "gpm_projetos" || event.key === "gpm_projetos_timestamp") {
    console.log("Sincronizando projetos da página inicial...");
    // Recarregar a página quando detectar mudanças
    location.reload();
  }
});

// Fallback: também verificar periodicamente
setInterval(() => {
  try {
    const stored = localStorage.getItem("gpm_projetos");
    if (stored) {
      const newProjetos = JSON.parse(stored);
      if (JSON.stringify(newProjetos) !== JSON.stringify(projetos)) {
        console.log("Detectada mudança em projetos, recarregando...");
        projetos = newProjetos;
        // Renderizar novamente
        const projetosContainer = document.getElementById("projetos-container");
        if (projetosContainer) {
          location.reload();
        }
      }
    }
  } catch (error) {
    console.error("Erro ao sincronizar projetos:", error);
  }
}, 2000);

// Função para renderizar projetos
function renderizarProjetos() {
  const projetosContainer = document.getElementById("projetos-container");
  if (!projetosContainer) return;
  
  // Limpar container
  projetosContainer.innerHTML = "";
  
  projetos.forEach((projeto, index) => {
    const projetoCard = document.createElement("div");
    projetoCard.classList.add("projeto-card");
    projetoCard.setAttribute("data-project-id", projeto.id);
    
    projetoCard.innerHTML = `
      <div class="projeto-card-image">
        <img src="${projeto.images && projeto.images.length > 0 ? projeto.images[0] : '/src/assets/janelaMaximAr.jpg'}" alt="${projeto.title}" class="projeto-main-image">
      </div>
      <div class="projeto-card-content">
        <h3 class="projeto-title">${projeto.title}</h3>
        <p class="projeto-description">${projeto.description}</p>
        <div class="projeto-meta">
          <span class="projeto-location">📍 ${projeto.location}</span>
          <span class="projeto-date">📅 ${projeto.date}</span>
        </div>
      </div>
    `;
    
    // Adicionar event listener em vez de onclick inline
    projetoCard.addEventListener("click", () => {
      abrirModalProjeto(projeto);
    });
    
    projetosContainer.appendChild(projetoCard);
  });
}

// Renderizar projetos assim que a página carregar
document.addEventListener("DOMContentLoaded", renderizarProjetos);

// Fallback: renderizar se DOMContentLoaded não disparar a tempo
setTimeout(() => {
  const container = document.getElementById("projetos-container");
  if (container && container.children.length === 0) {
    renderizarProjetos();
  }
}, 500);

// Função para abrir o modal
function abrirModalProjeto(projeto) {
  const modal = document.getElementById("projeto-modal");
  const modalContent = modal.querySelector(".modal-content");
  
  let imagesHTML = projeto.images.map((img, index) => `
    <div class="carousel-slide ${index === 0 ? 'ativo' : ''}">
      <img src="${img}" alt="Imagem ${index + 1} do projeto">
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
          ${projeto.images.map((_, i) => `<span class="indicator ${i === 0 ? 'ativo' : ''}" data-index="${i}"></span>`).join('')}
        </div>
      </div>
      
      <div class="modal-info">
        <h2>${projeto.title}</h2>
        <p class="modal-description">${projeto.fullDescription}</p>
        <div class="modal-meta">
          <div class="meta-item">
            <span class="meta-label">Local:</span>
            <span class="meta-value">${projeto.location}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Data:</span>
            <span class="meta-value">${projeto.date}</span>
          </div>
        </div>
        <button class="btn btn-main modal-cta">Solicitar Orçamento</button>
      </div>
    </div>
  `;
  
  modal.style.display = "flex";
  
  // Carrossel 
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
  modal.querySelector(".modal-close").addEventListener("click", fecharModalProjeto);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      fecharModalProjeto();
    }
  });
}

// Função para fechar o modal
function fecharModalProjeto() {
  const modal = document.getElementById("projeto-modal");
  modal.style.display = "none";
}