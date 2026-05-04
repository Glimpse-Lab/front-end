const LABELS = { pending: 'Pendente', in_progress: 'Em análise', approved: 'Aprovado', rejected: 'Recusado' };
const COLORS = { pending: 'bg-yellow-100 text-yellow-800', in_progress: 'bg-blue-100 text-blue-800', approved: 'bg-green-100 text-green-800', rejected: 'bg-red-100 text-red-800' };

export function StatusBadge({ status }) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${COLORS[status]}`}>
      {LABELS[status]}
    </span>
  );
}
