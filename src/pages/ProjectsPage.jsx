import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { ProjectCard } from '../components/ProjectCard';
import { Modal } from '../components/Modal';

export function ProjectsPage() {
  const { projects } = useApp();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('Todos');

  const categories = ['Todos', 'Residencial', 'Comercial', 'Corporativo'];
  const filtered = filter === 'Todos' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[var(--blue-dark)] mb-4">Nossos Projetos</h1>
          <p className="text-[var(--blue-dark)]/70 text-lg">Conheça os projetos que desenvolvemos com excelência e qualidade</p>
        </div>

        <div className="flex gap-4 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-lg transition-colors ${filter === cat ? 'bg-[var(--blue-main)] text-white' : 'bg-white border border-[var(--border)] text-[var(--blue-dark)] hover:border-[var(--blue-main)]'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={() => setSelected(project)} />
          ))}
        </div>
      </div>

      {selected && (
        <Modal onClose={() => setSelected(null)} maxWidth="max-w-xl">
          <div className="relative">
            <img src={selected.image} alt={selected.name} className="w-full h-56 object-cover" />
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg hover:bg-white transition-colors">
              <X className="w-6 h-6 text-[var(--blue-dark)]" />
            </button>
          </div>
          <div className="p-6">
            <div className="text-sm text-[var(--blue-main)] mb-2">{selected.category}</div>
            <h2 className="text-3xl font-bold text-[var(--blue-dark)] mb-4">{selected.name}</h2>
            {selected.location && (
              <div className="flex items-center gap-2 text-[var(--blue-dark)]/70 mb-6">
                <MapPin className="w-5 h-5" />
                <span>{selected.location}</span>
              </div>
            )}
            <div className="mb-6">
              <h3 className="font-bold text-[var(--blue-dark)] mb-2">Descrição</h3>
              <p className="text-[var(--blue-dark)]/80 leading-relaxed">{selected.description}</p>
            </div>
            <div className="mb-8">
              <h3 className="font-bold text-[var(--blue-dark)] mb-2">Materiais Utilizados</h3>
              <p className="text-[var(--blue-dark)]/80">{selected.materials}</p>
            </div>
            <Link to="/orcamento" className="w-full bg-[var(--blue-main)] text-white px-6 py-3 rounded-lg hover:bg-[var(--blue-dark)] transition-colors inline-block text-center">
              Solicitar Orçamento para Projeto Similar
            </Link>
          </div>
        </Modal>
      )}
    </div>
  );
}
