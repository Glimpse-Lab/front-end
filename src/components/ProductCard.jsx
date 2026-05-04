import { PackageOpen } from 'lucide-react';

export function ProductCard({ product, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl border border-[var(--border)] ${onClick ? 'cursor-pointer group transition-all' : 'transition-shadow'}`}
    >
      <div className="h-64 overflow-hidden bg-[var(--blue-light)]">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-300 ${onClick ? 'group-hover:scale-105' : 'hover:scale-105'}`}
        />
      </div>
      <div className="p-6">
        <div className={`text-xs text-[var(--blue-main)] mb-2 ${onClick ? 'flex items-center gap-2' : ''}`}>
          {onClick && <PackageOpen className="w-4 h-4" />}
          <span>{product.category}</span>
        </div>
        <h3 className="font-bold text-[var(--blue-dark)] mb-2">{product.name}</h3>
        <p className="text-[var(--blue-dark)]/70 text-sm line-clamp-2">{product.description}</p>
      </div>
    </div>
  );
}
