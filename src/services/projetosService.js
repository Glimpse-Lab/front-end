import { getProjetosStorage, saveProjetosStorage } from "../utils/dataSync.js";

function getProjetos() {
  return getProjetosStorage();
}

function getProjetoById(id) {
  const projetos = getProjetos();
  return projetos.find(p => p.id === parseInt(id));
}

function saveProjetos(projetos) {
  saveProjetosStorage(projetos);
}

function renderizarProjetos() {
  const projetosContainer = document.getElementById("projetos-container");
  if (!projetosContainer) return;

  const projetos = getProjetos();
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

export { getProjetos, getProjetoById, renderizarProjetos, saveProjetos };
