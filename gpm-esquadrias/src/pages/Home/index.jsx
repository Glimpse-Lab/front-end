import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProdutos } from '../../services/produtosService';
import '../../assets/style.css'; 

export default function Home() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Busca os produtos do localStorage ao carregar a página
  useEffect(() => {
    setProdutos(getProdutos());
  }, []);

  useEffect(() => {
    const sincronizarProdutos = () => {
      setProdutos(getProdutos());
    };

    const handleStorage = (event) => {
      if (event.key === "gpm_produtos" || event.key === "gpm_produtos_timestamp") {
        sincronizarProdutos();
      }
    };

    window.addEventListener("storage", handleStorage);

    // Fallback para abas já abertas que não receberam update por evento.
    const intervalId = setInterval(sincronizarProdutos, 2000);

    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(intervalId);
    };
  }, []);

  const abrirModalProduto = (produto) => {
    setProdutoSelecionado(produto);
    setCurrentSlide(0);
  };

  const fecharModalProduto = () => {
    setProdutoSelecionado(null);
  };

  const nextSlide = () => {
    if (!produtoSelecionado || !produtoSelecionado.images?.length) {
      return;
    }

    setCurrentSlide((prev) => (prev + 1) % produtoSelecionado.images.length);
  };

  const prevSlide = () => {
    if (!produtoSelecionado || !produtoSelecionado.images?.length) {
      return;
    }

    setCurrentSlide((prev) => (prev - 1 + produtoSelecionado.images.length) % produtoSelecionado.images.length);
  };

  return (
    <>
      {/* HEADER */}
      <header className="site-header" id="header">
        <nav className="navbar container">
          <div className="logo">
            <img src="/src/assets/logo com fundo.png" alt="GPM Esquadrias" />
          </div>

          <ul className="nav-links">
            <li><a href="#hero">HOME</a></li>
            <li><a href="#diferenciais">DIFERENCIAIS</a></li>
            <li><a href="#catalogo">CATÁLOGO</a></li>
            <li><a onClick={() => navigate('/projetos')} style={{cursor: 'pointer'}}>PROJETOS</a></li>
          </ul>

          <div className="nav-cta">
            <button onClick={() => navigate('/formulario')} className="btn btn-primary">
              Solicitar orçamento
            </button>
          </div>
          <a className="redRestrito" onClick={() => navigate('/formulario')} style={{cursor: 'pointer'}}>
            🔒 Acesso Restrito
          </a>
        </nav>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="hero" id="hero">
          <div className="hero-image">
            <img src="/src/assets/01c50a_b8fz5e9d74fc4397b963dbc146c5088d~mv2.png" alt="Imagem principal" />
          </div>

          <div className="container hero-grid">
            <div className="hero-content">
              <h1>Melhores esquadrias e portas de alumínio para sua residência ou comércio!</h1>
              <p>A empresa líder em soluções de esquadrias e portas de alumínio, oferecendo qualidade, inovação e atendimento personalizado.</p>
              <div className="hero-btn">
                <button onClick={() => navigate('/projetos')} className="btn btn-secondary">
                  Ver projetos
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ESTATÍSTICAS */}
        <section className="stats" id="estatisticas">
          <div className="container stats-grid">
            <article className="stat-item">
              <h3 className="stat-number">500+</h3>
              <p className="stat-label">Projetos</p>
            </article>
            <article className="stat-item">
              <h3 className="stat-number">15+</h3>
              <p className="stat-label">Anos de Experiência</p>
            </article>
            <article className="stat-item">
              <h3 className="stat-number">98%</h3>
              <p className="stat-label">Satisfação</p>
            </article>
            <article className="stat-item">
              <h3 className="stat-number">50+</h3>
              <p className="stat-label">Cidades</p>
            </article>
          </div>
        </section>

        {/* DIFERENCIAIS */}
        <section className="diferenciais" id="diferenciais">
          <div className="container">
            <header className="section-header">
              <h2>Por que escolher nossa empresa?</h2>
            </header>

            <div className="diferenciais-grid">
              <article className="diferencial-item">
                <div className="diferencial-icon">
                  <img src="/src/assets/shield_90dp_1C1C4E_FILL0_wght400_GRAD0_opsz48.png" alt="Segurança" />
                </div>
                <div className="diferencial-content">
                  <h3>Segurança</h3>
                  <p>Oferecemos soluções de esquadrias e portas de alumínio com altíssima qualidade e segurança.</p>
                </div>
              </article>

              <article className="diferencial-item">
                <div className="diferencial-icon">
                  <img src="/src/assets/calendar_clock_65dp_1C1C4E_FILL0_wght400_GRAD0_opsz48.png" alt="Prazo" />
                </div>
                <div className="diferencial-content">
                  <h3>Prazo de Entrega</h3>
                  <p>Comprometemo-nos com prazos de entrega rigorosos, garantindo que seus projetos sejam concluídos no tempo.</p>
                </div>
              </article>

              <article className="diferencial-item">
                <div className="diferencial-icon">
                  <img src="/src/assets/award_star_65dp_1C1C4E_FILL0_wght400_GRAD0_opsz48.png" alt="Qualidade" />
                </div>
                <div className="diferencial-content">
                  <h3>Material de Qualidade</h3>
                  <p>Utilizamos materiais de alta qualidade em todos os nossos produtos, garantindo durabilidade.</p>
                </div>
              </article>

              <article className="diferencial-item">
                <div className="diferencial-icon">
                  <img src="/src/assets/business_messages_65dp_1C1C4E_FILL0_wght400_GRAD0_opsz48.png" alt="Atendimento" />
                </div>
                <div className="diferencial-content">
                  <h3>Atendimento Personalizado</h3>
                  <p>Oferecemos um atendimento excepcional, adaptando nossas soluções às necessidades de cada cliente.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* CATÁLOGO DE PRODUTOS */}
        <section className="catalogo" id="catalogo">
          <div className="container">
            <header className="section-header">
              <h2>Nosso catálogo de produtos</h2>
            </header>

            <div className="catalogo-grid">
              {produtos.slice(0, 6).map((produto) => (
                <article key={produto.id} className="produto">
                  <div className="produto-img">
                    {/* Renderiza a primeira imagem do array, se existir */}
                    <img src={produto.images && produto.images.length > 0 ? produto.images[0] : '/src/assets/janelaMaximAr.jpg'} alt={produto.title} />
                  </div>
                  <h3>{produto.title}</h3>
                  <p>{produto.description}</p>
                  <button className="btn" onClick={() => abrirModalProduto(produto)}>
                    Ver produto
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROJETOS REALIZADOS (DESTAQUE) */}
        <section className="projetos" id="projetos-destaque">
          <div className="container">
            <header className="section-header">
              <h2>Conheça alguns projetos realizados</h2>
            </header>

            <div className="projeto-destaque">
              <div className="projeto-img">
                <video className="video" width="100%" controls>
                  <source src="/src/assets/WhatsApp Video 2026-03-08 at 13.22.57.mp4" type="video/mp4" />
                  Seu navegador não suporta vídeos.
                </video>
              </div>

              <div className="projeto-info">
                <h3>Instalação de motores PPA Jetflex</h3>
                <p>
                  Instalação de motores PPA Jetflex o mais rápido da categoria.
                  Serviço completo com travas anti-arrombamento e sistema
                  anti-esmagamento. Com esse conjunto você tem mais praticidade,
                  conforto e segurança. Não dê mole para o azar!
                </p>
                <button onClick={() => navigate('/projetos')} className="btn">Ver projetos</button>
              </div>
            </div>

            <div className="projetos-galeria">
              <img src="/src/assets/motorJET.jpg" alt="Motor Jet" />
              <img src="/src/assets/trava (1).jpg" alt="Trava de segurança" />
              <img src="/src/assets/fotocelula.jpg" alt="Fotocélula" />
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section className="about">
          <div className="container">
            <p className="about-intro">
              Atuamos no mercado há mais de 10 anos entregando soluções de alta
              qualidade para clientes em todo o país. Nosso compromisso é unir
              tecnologia, inovação e atendimento personalizado.
            </p>
            <p className="about-cta">Quer saber como podemos ajudar no seu próximo projeto?</p>
            <button onClick={() => navigate('/formulario')} className="btn-primary" style={{cursor: 'pointer', border: 'none'}}>
              Solicitar orçamento
            </button>
          </div>
        </section>

        {/* PRINCIPAL CTA */}
        <section className="main-cta">
          <div className="container">
            <h2>NÃO FIQUE DE FORA!</h2>
            <p className="cta-subtitle">Venha já solicitar seu orçamento! Modernize sua residência com as melhores soluções em esquadrias.</p>
            <button onClick={() => navigate('/formulario')} className="btn-main" style={{cursor: 'pointer', border: 'none'}}>
              Falar com especialista
            </button>
          </div>
        </section>

        {produtoSelecionado && (
          <div
            id="produto-modal-catalogo"
            style={{ display: 'flex' }}
            onClick={(e) => e.target.id === 'produto-modal-catalogo' && fecharModalProduto()}
          >
            <div className="modal-content">
              <span className="modal-close" onClick={fecharModalProduto}>&times;</span>

              <div className="modal-body">
                <div className="modal-carousel">
                  <div className="carousel-track">
                    {(produtoSelecionado.images && produtoSelecionado.images.length > 0
                      ? produtoSelecionado.images
                      : ['/src/assets/janelaMaximAr.jpg']
                    ).map((img, index) => (
                      <div key={index} className={`carousel-slide ${index === currentSlide ? 'ativo' : ''}`}>
                        <img src={img} alt={`Imagem ${index + 1} do produto`} />
                      </div>
                    ))}
                  </div>
                  <button className="carousel-prev" onClick={prevSlide}>❮</button>
                  <button className="carousel-next" onClick={nextSlide}>❯</button>
                  <div className="carousel-indicators">
                    {(produtoSelecionado.images && produtoSelecionado.images.length > 0
                      ? produtoSelecionado.images
                      : ['/src/assets/janelaMaximAr.jpg']
                    ).map((_, index) => (
                      <span
                        key={index}
                        className={`indicator ${index === currentSlide ? 'ativo' : ''}`}
                        data-index={index}
                        onClick={() => setCurrentSlide(index)}
                      />
                    ))}
                  </div>
                </div>

                <div className="modal-info">
                  <h2>{produtoSelecionado.title}</h2>
                  <p className="modal-description">{produtoSelecionado.fullDescription}</p>
                  <div className="modal-meta">
                    <div className="meta-item">
                      <span className="meta-label">Preço:</span>
                      <span className="meta-value">{produtoSelecionado.price}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Material:</span>
                      <span className="meta-value">{produtoSelecionado.material}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Garantia:</span>
                      <span className="meta-value">{produtoSelecionado.warranty}</span>
                    </div>
                  </div>
                  <button
                    className="btn btn-main modal-cta"
                    onClick={() => {
                      fecharModalProduto();
                      navigate('/formulario');
                    }}
                  >
                    Solicitar orçamento
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer id="footer" className="footer">
        <div className="footer-container">
          <a className="footer-logo" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <video className="video" width="90" height="90" autoPlay loop muted>
              <source src="/src/assets/logoMovel.mp4" type="video/mp4" />
            </video>
            <p className="instagram" style={{color: '#0d3c61', fontWeight: 'bold'}}>Instagram</p>
          </a>

          <div className="footer-links">
            <h3>Institucional</h3>
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#diferenciais">Diferenciais</a></li>
              <li><a onClick={() => navigate('/projetos')} style={{cursor: 'pointer'}}>Projetos</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Produtos</h3>
            <ul>
              <li><a href="#catalogo">Esquadrias</a></li>
              <li><a href="#catalogo">Portões</a></li>
              <li><a href="#catalogo">Motores</a></li>
            </ul>
          </div>

          <div className="footer-contato">
            <h3>Contato</h3>
            <ul>
              <li>Email: gpm.esquadrias25@gmail.com</li>
              <li>Telefone: (11) 94117-0990</li>
            </ul>
          </div>
        </div>
        <div className="footer-copy">
          © 2026 Glimpse/GPM Esquadrias. Todos os direitos reservados.
        </div>
      </footer>
    </>
  );
}