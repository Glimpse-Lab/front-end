import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, PackageOpen } from 'lucide-react';
import { Link } from 'react-router';
import { ProductCard } from '../components/ProductCard';
import { Modal } from '../components/Modal';

export function ProductsPage() {
  const { products } = useApp();
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[var(--blue-dark)] mb-4">Nossos Produtos</h1>
          <p className="text-[var(--blue-dark)]/70 text-lg">Linha completa de esquadrias e sistemas em alumínio de alta qualidade</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onClick={() => setSelected(product)} />
          ))}
        </div>
      </div>

      {selected && (
        <Modal onClose={() => setSelected(null)} maxWidth="max-w-xl">
          <div className="relative">
            <div className="h-56 bg-[var(--blue-light)] overflow-hidden">
              <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
            </div>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg hover:bg-white transition-colors">
              <X className="w-6 h-6 text-[var(--blue-dark)]" />
            </button>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 text-sm text-[var(--blue-main)] mb-2">
              <PackageOpen className="w-5 h-5" />
              <span>{selected.category}</span>
            </div>
            <h2 className="text-3xl font-bold text-[var(--blue-dark)] mb-6">{selected.name}</h2>
            <div className="mb-6">
              <h3 className="font-bold text-[var(--blue-dark)] mb-2">Descrição</h3>
              <p className="text-[var(--blue-dark)]/80 leading-relaxed">{selected.description}</p>
            </div>
            <div className="mb-8 bg-[var(--blue-light)] p-6 rounded-lg">
              <h3 className="font-bold text-[var(--blue-dark)] mb-3">Especificações Técnicas</h3>
              <p className="text-[var(--blue-dark)]/80 leading-relaxed">{selected.specifications}</p>
            </div>
            <Link to="/orcamento" className="w-full bg-[var(--blue-main)] text-white px-6 py-3 rounded-lg hover:bg-[var(--blue-dark)] transition-colors inline-block text-center">
              Solicitar Orçamento
            </Link>
          </div>
        </Modal>
      )}
    </div>
  );
}
