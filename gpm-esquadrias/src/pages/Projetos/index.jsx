import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjetos } from '../../services/projetosService';
import '../../assets/style.css';

const Projetos = () => {
  const navigate = useNavigate();
  const [projetos, setProjetos] = useState([]);
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setProjetos(getProjetos());
  }, []);

  const abrirModal = (projeto) => {
    setProjetoSelecionado(projeto);
    setCurrentSlide(0);
  };

  const fecharModal = () => setProjetoSelecionado(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projetoSelecionado.images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projetoSelecionado.images.length) % projetoSelecionado.images.length);
  };

  return (
    <div className="projetos-page">
      {/* HEADER REUTILIZADO */}
      <header className="site-header">
        <nav className="navbar container">
          <div onClick={() => navigate('/formulario')} className="logo" style={{ cursor: 'pointer' }}>
            <img src="/src/assets/logo com fundo.png" alt="Logo" />
          </div>
          <ul className="nav-links">
            <li><a href="/#hero">HOME</a></li>
            <li><a href="/#diferenciais">DIFERENCIAIS</a></li>
            <li><a href="/#catalogo">CATALOGO</a></li>
            <li><a href="/projetos">PROJETOS</a></li>
          </ul>
          <div className="nav-cta">
            <button onClick={() => navigate('/formulario')} className="btn btn-primary" style={{ border: 'none' }}>
              Solicitar orçamento
            </button>
          </div>
          <a className="redRestrito" onClick={() => navigate('/formulario')} style={{ cursor: 'pointer' }}>
            🔒 Acesso Restrito
          </a>
        </nav>
      </header>

      <main className="projetos container">
        <h2 className="section-title">Projetos</h2>
        <p className="section-description">Conheça nossos projetos mais recentes.</p>

        <div className="projetos-grid">
          {projetos.map((p) => (
            <div key={p.id} className="projeto-card" onClick={() => abrirModal(p)}>
              <div className="projeto-card-image">
                <img src={p.images[0]} alt={p.title} className="projeto-main-image" />
              </div>
              <div className="projeto-card-content">
                <h3 className="projeto-title">{p.title}</h3>
                <p className="projeto-description">{p.description}</p>
                <div className="projeto-meta">
                  <span className="projeto-location">📍 {p.location}</span>
                  <span className="projeto-date">📅 {p.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL REACTIVO */}
      {projetoSelecionado && (
        <div id="projeto-modal" style={{ display: 'flex' }} onClick={(e) => e.target.id === 'projeto-modal' && fecharModal()}>
          <div className="modal-content">
            <span className="modal-close" onClick={fecharModal}>&times;</span>
            <div className="modal-body">
              <div className="modal-carousel">
                <div className="carousel-track">
                  {projetoSelecionado.images.map((img, index) => (
                    <div key={index} className={`carousel-slide ${index === currentSlide ? 'ativo' : ''}`}>
                      <img src={img} alt={`Slide ${index}`} />
                    </div>
                  ))}
                </div>
                <button className="carousel-prev" onClick={prevSlide}>❮</button>
                <button className="carousel-next" onClick={nextSlide}>❯</button>
              </div>
              
              <div className="modal-info">
                <h2>{projetoSelecionado.title}</h2>
                <p className="modal-description">{projetoSelecionado.fullDescription}</p>
                <div className="modal-meta">
                  <div className="meta-item"><span className="meta-label">Local:</span> {projetoSelecionado.location}</div>
                  <div className="meta-item"><span className="meta-label">Data:</span> {projetoSelecionado.date}</div>
                </div>
                <a href="/formulario" className="btn btn-primary modal-cta">Solicitar Orçamento</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projetos;