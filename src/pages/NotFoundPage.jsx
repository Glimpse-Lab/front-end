import { useNavigate } from 'react-router';
import { SearchX, RotateCcw, Home } from 'lucide-react';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--blue-light)] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center border border-[var(--border)]">
        <div className="w-16 h-16 bg-[var(--blue-light)] rounded-full flex items-center justify-center mx-auto mb-6">
          <SearchX className="w-8 h-8 text-[var(--blue-main)]" />
        </div>

        <p className="text-sm font-semibold text-[var(--blue-main)] mb-1">Erro 404</p>

        <h1 className="text-2xl font-bold text-[var(--blue-dark)] mb-3">
          Página não encontrada
        </h1>

        <p className="text-[var(--blue-dark)]/70 mb-8 text-sm leading-relaxed">
          A página que você está procurando não existe ou foi removida.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border)] text-[var(--blue-dark)] hover:bg-gray-50 transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4" /> Voltar
          </button>
          <button
            onClick={() => navigate('/', { replace: true })}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--blue-main)] text-white hover:bg-[var(--blue-dark)] transition-colors text-sm"
          >
            <Home className="w-4 h-4" /> Início
          </button>
        </div>
      </div>
    </div>
  );
}
