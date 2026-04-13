const STORAGE_KEY = "gpm_projetos";

const PROJETOS_PADRAO = [
  {
    id: 1,
    title: "Guarda-Corpo de Alumínio",
    description: "Solução elegante e segura",
    fullDescription: "Guarda-corpo de alumínio branco de alta qualidade...",
    images: ["/src/assets/guarda-corpo-de-aluminio-branco-.jpg", "/src/assets/porta_pivotante_de_aluminio_branco.jpg"],
    location: "São Paulo, SP",
    date: "Março 2026"
  },
  // ... adicione os outros itens do seu HTML aqui
];

export const getProjetos = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    saveProjetos(PROJETOS_PADRAO);
    return PROJETOS_PADRAO;
  }
  return JSON.parse(data);
};

export const saveProjetos = (projetos) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projetos));
};