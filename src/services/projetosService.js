const projetos = [
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

function getProjetos() {
  return projetos;
}

function getProjetoById(id) {
  return projetos.find(p => p.id === parseInt(id));
}

function renderizarProjetos() {
  const projetosContainer = document.getElementById("projetos-container");
  if (!projetosContainer) return;

  projetos.forEach(projeto => {
    const projetoCard = document.createElement("div");
    projetoCard.classList.add("projeto-card");
    projetoCard.dataset.projectId = projeto.id;

    projetoCard.innerHTML = `
      <div class="projeto-card-image">
        <img src="${projeto.images[0]}" alt="${projeto.title}" class="projeto-main-image">
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

    projetosContainer.appendChild(projetoCard);
  });
}

export { getProjetos, getProjetoById, renderizarProjetos };
