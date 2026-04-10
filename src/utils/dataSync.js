/**
 * Utilitário para sincronização de dados entre admin e página inicial
 * Usa localStorage para persistir dados
 */

// Dados padrão de produtos
const produtosPadrao = [
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

// Dados padrão de projetos
const projetosPadrao = [
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

/**
 * Inicializa localStorage com dados padrão (apenas na primeira vez)
 */
function inicializarDados() {
  try {
    // Se não há produtos salvos, inicializar com padrão
    if (!localStorage.getItem("gpm_produtos")) {
      localStorage.setItem("gpm_produtos", JSON.stringify(produtosPadrao));
      localStorage.setItem("gpm_produtos_timestamp", Date.now().toString());
    }
    // Se não há projetos salvos, inicializar com padrão
    if (!localStorage.getItem("gpm_projetos")) {
      localStorage.setItem("gpm_projetos", JSON.stringify(projetosPadrao));
      localStorage.setItem("gpm_projetos_timestamp", Date.now().toString());
    }
  } catch (error) {
    console.error("Erro ao inicializar dados:", error);
  }
}

// Inicializar imediatamente quando o módulo carrega
inicializarDados();

/**
 * Obtém produtos do localStorage
 */
function getProdutosStorage() {
  try {
    inicializarDados();
    const data = localStorage.getItem("gpm_produtos");
    return data ? JSON.parse(data) : produtosPadrao;
  } catch (error) {
    console.error("Erro ao obter produtos:", error);
    return produtosPadrao;
  }
}

/**
 * Salva produtos no localStorage com timestamp
 */
function saveProdutosStorage(produtos) {
  try {
    localStorage.setItem("gpm_produtos", JSON.stringify(produtos));
    localStorage.setItem("gpm_produtos_timestamp", Date.now().toString());
  } catch (error) {
    console.error("Erro ao salvar produtos:", error);
  }
}

/**
 * Obtém projetos do localStorage
 */
function getProjetosStorage() {
  try {
    inicializarDados();
    const data = localStorage.getItem("gpm_projetos");
    return data ? JSON.parse(data) : projetosPadrao;
  } catch (error) {
    console.error("Erro ao obter projetos:", error);
    return projetosPadrao;
  }
}

/**
 * Salva projetos no localStorage com timestamp
 */
function saveProjetosStorage(projetos) {
  try {
    localStorage.setItem("gpm_projetos", JSON.stringify(projetos));
    localStorage.setItem("gpm_projetos_timestamp", Date.now().toString());
  } catch (error) {
    console.error("Erro ao salvar projetos:", error);
  }
}

export {
  inicializarDados,
  getProdutosStorage,
  saveProdutosStorage,
  getProjetosStorage,
  saveProjetosStorage,
  produtosPadrao,
  projetosPadrao
};
