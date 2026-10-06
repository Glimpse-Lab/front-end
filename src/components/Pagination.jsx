export function Pagination({ pageInfo, onPageChange, onPageSizeChange }) {
  if (!pageInfo) return null;

  const { page, size, totalElements, totalPages, first, last } = pageInfo;
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-4 border-t border-[var(--border)]">
      <span className="text-sm text-[var(--blue-dark)]/70">
        Página {page + 1} de {Math.max(totalPages, 1)} • {totalElements} itens
      </span>
      <div className="flex items-center gap-2">
        <select
          value={size}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
          className="px-3 py-2 rounded-lg border border-[var(--border)] text-sm bg-white"
          aria-label="Itens por página"
        >
          {[5, 10, 20, 50].map((option) => <option key={option} value={option}>{option} por página</option>)}
        </select>
        <button
          type="button"
          disabled={first}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--blue-dark)] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <button
          type="button"
          disabled={last}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--blue-dark)] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
