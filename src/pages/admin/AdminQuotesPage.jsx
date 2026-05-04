import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search } from 'lucide-react';
import { AdminPageHeader } from '../../components/AdminPageHeader';
import { StatusBadge } from '../../components/StatusBadge';

export function AdminQuotesPage() {
  const { quotes, updateQuoteStatus } = useApp();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = quotes.filter((q) => {
    const matchFilter = filter === 'all' || q.status === filter;
    const matchSearch = q.clientName.toLowerCase().includes(search.toLowerCase()) ||
                        q.email.toLowerCase().includes(search.toLowerCase()) ||
                        q.projectType.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const filterBtns = [
    { key: 'all', label: 'Todos', active: 'bg-[var(--blue-main)] text-white', inactive: 'bg-gray-100 text-[var(--blue-dark)] hover:bg-gray-200' },
    { key: 'pending', label: 'Pendentes', active: 'bg-yellow-500 text-white', inactive: 'bg-gray-100 text-[var(--blue-dark)] hover:bg-gray-200' },
    { key: 'in_progress', label: 'Em Análise', active: 'bg-blue-500 text-white', inactive: 'bg-gray-100 text-[var(--blue-dark)] hover:bg-gray-200' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <AdminPageHeader title="Orçamentos" subtitle="Gerencie todas as solicitações de orçamento" />
      </div>

      <div className="bg-white rounded-xl border border-[var(--border)] shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--blue-dark)]/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por cliente, e-mail ou tipo de projeto..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-main)]"
            />
          </div>
          <div className="flex gap-2">
            {filterBtns.map(({ key, label, active, inactive }) => (
              <button key={key} onClick={() => setFilter(key)} className={`px-4 py-3 rounded-lg transition-colors ${filter === key ? active : inactive}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[var(--border)] shadow-sm overflow-hidden">
        <div>
          <table className="w-full table-fixed">
            <thead className="bg-[var(--blue-light)] border-b border-[var(--border)]">
              <tr>
                <th className="text-left px-4 py-4 text-[var(--blue-dark)] w-[22%]">Cliente</th>
                <th className="text-left px-4 py-4 text-[var(--blue-dark)] w-[22%]">E-mail</th>
                <th className="text-left px-4 py-4 text-[var(--blue-dark)] w-[18%]">Tipo de Projeto</th>
                <th className="text-left px-4 py-4 text-[var(--blue-dark)] w-[12%]">Data</th>
                <th className="text-left px-4 py-4 text-[var(--blue-dark)] w-[12%]">Status</th>
                <th className="text-left px-4 py-4 text-[var(--blue-dark)] w-[14%]">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((quote) => (
                <tr key={quote.id} className="border-b border-[var(--border)] last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="font-medium text-[var(--blue-dark)] truncate">{quote.clientName}</div>
                    <div className="text-sm text-[var(--blue-dark)]/60">{quote.phone}</div>
                  </td>
                  <td className="px-4 py-4 text-[var(--blue-dark)]/70 truncate">{quote.email}</td>
                  <td className="px-4 py-4 text-[var(--blue-dark)]/70 truncate">{quote.projectType}</td>
                  <td className="px-4 py-4 text-[var(--blue-dark)]/70 whitespace-nowrap">{new Date(quote.date).toLocaleDateString('pt-BR')}</td>
                  <td className="px-4 py-4"><StatusBadge status={quote.status} /></td>
                  <td className="px-4 py-4">
                    <select
                      value={quote.status}
                      onChange={(e) => updateQuoteStatus(quote.id, e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue-main)]"
                    >
                      <option value="pending">Pendente</option>
                      <option value="in_progress">Em análise</option>
                      <option value="approved">Aprovado</option>
                      <option value="rejected">Recusado</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[var(--blue-dark)]/60">Nenhum orçamento encontrado com os filtros selecionados.</div>
        )}
      </div>
    </div>
  );
}
