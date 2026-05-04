import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

export function ConfirmDialog({ title, message, confirmLabel = 'Confirmar', onConfirm, onCancel, loading = false }) {
  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-6"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-xl max-w-sm w-full shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-7 h-7 text-red-600" />
            </div>
            <h2 className="text-lg font-bold text-[var(--blue-dark)] mb-2">{title}</h2>
            <p className="text-sm text-[var(--blue-dark)]/70 leading-relaxed">{message}</p>
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1" onClick={onCancel} disabled={loading}>
              Cancelar
            </Button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-60"
            >
              {loading ? 'Removendo...' : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
