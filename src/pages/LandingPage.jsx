import { Link } from 'react-router';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProjectCard } from '../components/ProjectCard';
import { ProductCard } from '../components/ProductCard';

export function LandingPage() {
  const { projects, products } = useApp();

  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-[var(--blue-dark)] to-[var(--blue-main)]">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-cover bg-center opacity-30 [background-image:url('https://images.unsplash.com/photo-1615469309529-733e81176c42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920')]"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <h1 className="text-5xl font-bold mb-6">Esquadrias de Alumínio de Alta Performance</h1>
          <p className="text-xl mb-8 text-white/90">
            Soluções técnicas completas para arquitetos e construtoras. Qualidade, precisão e excelência em cada projeto.
          </p>
          <Link to="/orcamento" className="inline-flex items-center gap-2 bg-white text-[var(--blue-dark)] px-8 py-4 rounded-lg hover:bg-[var(--blue-light)] transition-colors">
            Solicitar Orçamento <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[var(--blue-dark)] mb-6">Sobre a GPM Esquadrias</h2>
              <p className="text-[var(--blue-dark)]/80 leading-relaxed mb-6">
                Há mais de 15 anos no mercado, a GPM Esquadrias é referência em soluções de alumínio para projetos residenciais, comerciais e corporativos de alto padrão.
              </p>
              <div className="space-y-3">
                {[
                  'Equipe técnica especializada e certificada',
                  'Materiais de primeira linha com garantia estendida',
                  'Projetos customizados e acompanhamento integral',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[var(--blue-main)] flex-shrink-0 mt-0.5" />
                    <p className="text-[var(--blue-dark)]/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1498204461721-63092366318f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" alt="Fachada moderna" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[var(--blue-light)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[var(--blue-dark)] mb-4">Projetos em Destaque</h2>
            <p className="text-[var(--blue-dark)]/70">Conheça alguns dos nossos trabalhos mais recentes</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} showLink />
            ))}
          </div>
          <div className="text-center">
            <Link to="/projetos" className="inline-flex items-center gap-2 bg-[var(--blue-main)] text-white px-6 py-3 rounded-lg hover:bg-[var(--blue-dark)] transition-colors">
              Ver Todos os Projetos
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[var(--blue-dark)] mb-4">Nossos Produtos</h2>
            <p className="text-[var(--blue-dark)]/70">Linha completa de esquadrias e sistemas em alumínio</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/produtos" className="inline-flex items-center gap-2 bg-[var(--blue-main)] text-white px-6 py-3 rounded-lg hover:bg-[var(--blue-dark)] transition-colors">
              Ver Todos os Produtos
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[var(--blue-dark)] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Pronto para Iniciar seu Projeto?</h2>
          <p className="text-xl mb-8 text-white/80">Entre em contato conosco e receba um orçamento personalizado sem compromisso.</p>
          <Link to="/orcamento" className="inline-flex items-center gap-2 bg-white text-[var(--blue-dark)] px-8 py-4 rounded-lg hover:bg-[var(--blue-light)] transition-colors">
            Solicitar Orçamento Agora <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
