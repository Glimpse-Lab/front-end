import { useEffect, useMemo, useState } from 'react';
import { Search, Eye, Clock3, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AdminPageHeader } from '../../components/AdminPageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { Modal, ModalHeader } from '../../components/Modal';
import orcamentoService from '../../services/orcamentoService';

const STATUS_LABELS = {
  pending: 'Pendente',
  in_progress: 'Em análise',
  proposal_sent: 'Proposta enviada',
  approved: 'Aprovado',
  rejected: 'Recusado',
  cancelled: 'Cancelado',
};

const STATUS_ICONS = {
  pending: Clock3,
  in_progress: Loader2,
  proposal_sent: Clock3,
  approved: CheckCircle2,
  rejected: XCircle,
  cancelled: XCircle,
};

const mapStatus = (status) => {
  if (!status) return 'pending';
  switch (status) {
    case 'PENDENTE': return 'pending';
    case 'EM_ANDAMENTO': return 'in_progress';
    case 'PROPOSTA_ENVIADA': return 'proposal_sent';
    case 'APROVADO': return 'approved';
    case 'RECUSADO': return 'rejected';
    case 'CANCELADO': return 'cancelled';
    default: return status;
  }
};

const mapBackendStatus = (status) => {
  switch (status) {
    case 'pending': return 'PENDENTE';
    case 'in_progress': return 'EM_ANDAMENTO';
    case 'proposal_sent': return 'PROPOSTA_ENVIADA';
    case 'approved': return 'APROVADO';
    case 'rejected': return 'RECUSADO';
    case 'cancelled': return 'CANCELADO';
    default: return 'PENDENTE';
  }
};

const formatDateTime = (value) => {
  if (!value) return '-';
  const date = new Date(value);
  return date.toLocaleString('pt-BR');
};

const normalizeQuote = (q) => ({
  id: String(q.id),
  clientName: q.cliente?.nome || '',
  email: q.cliente?.email || '',
  phone: q.cliente?.celular || '',
  projectType: q.descricaoProjeto || '',
  message: q.descricaoProjeto || '',
  date: q.dataSolicitacao ? q.dataSolicitacao.split('T')[0] : new Date().toISOString().split('T')[0],
  status: mapStatus(q.status?.name ? q.status.name : q.status),
  endereco: q.endereco || null,
  cep: q.endereco?.cep || q.cep || '',
  numEndereco: q.endereco?.numero ?? q.numEndereco ?? '',
  complemento: q.endereco?.complemento || q.complemento || '',
  rua: q.endereco?.rua || q.rua || '',
  bairro: q.endereco?.bairro || q.bairro || '',
  cidade: q.endereco?.cidade || q.cidade || '',
  estado: q.endereco?.estado || q.estado || '',
});

export function AdminQuotesPage() {
  const { quotes, updateQuoteStatus } = useApp();
  const [backendQuotes, setBackendQuotes] = useState(quotes);
  const [quoteHistoryById, setQuoteHistoryById] = useState({});
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [savingStatusId, setSavingStatusId] = useState(null);
  const [modalStatus, setModalStatus] = useState('pending');
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    let mounted = true;
    orcamentoService.listar()
      .then((backend) => {
        if (!mounted) return;
        const mapped = backend.map(normalizeQuote);
        setBackendQuotes(mapped);
        setQuoteHistoryById((prev) => {
          const next = { ...prev };
          mapped.forEach((quote) => {
            next[quote.id] = [
              {
                status: quote.status,
                label: STATUS_LABELS[quote.status] || 'Status atualizado',
                at: quote.date,
                note: 'Orçamento criado',
              },
            ];
          });
          return next;
        });
      })
      .catch(() => {
        // mantém o estado atual caso o backend falhe
      });

    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => backendQuotes.filter((q) => {
    const matchFilter = filter === 'all' || q.status === filter;
    const matchSearch = q.clientName.toLowerCase().includes(search.toLowerCase()) ||
                        q.email.toLowerCase().includes(search.toLowerCase()) ||
                        q.projectType.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  }), [backendQuotes, filter, search]);

  const filterBtns = [
    { key: 'all', label: 'Todos', active: 'bg-[var(--blue-main)] text-white', inactive: 'bg-gray-100 text-[var(--blue-dark)] hover:bg-gray-200' },
    { key: 'pending', label: 'Pendentes', active: 'bg-yellow-500 text-white', inactive: 'bg-gray-100 text-[var(--blue-dark)] hover:bg-gray-200' },
    { key: 'in_progress', label: 'Em Análise', active: 'bg-blue-500 text-white', inactive: 'bg-gray-100 text-[var(--blue-dark)] hover:bg-gray-200' },
  ];

  const persistStatus = async (quoteId, newStatus) => {
    setSavingStatusId(quoteId);
    setFeedback(null);
    try {
      const updated = await orcamentoService.atualizarStatus(quoteId, newStatus);
      const normalized = normalizeQuote(updated);
      setBackendQuotes((prev) => prev.map((q) => (q.id === quoteId ? { ...q, ...normalized } : q)));
      updateQuoteStatus(quoteId, newStatus);
      setQuoteHistoryById((prev) => ({
        ...prev,
        [quoteId]: [
          ...(prev[quoteId] || []),
          {
            status: newStatus,
            label: STATUS_LABELS[newStatus] || 'Status atualizado',
            at: new Date().toISOString(),
            note: 'Alteração salva na administração',
          },
        ],
      }));
      if (selectedQuote && String(selectedQuote.id) === String(quoteId)) {
        setSelectedQuote((prev) => prev ? { ...prev, ...normalized } : prev);
        setModalStatus(normalized.status);
      }
      setFeedback({ type: 'success', message: 'Status atualizado com sucesso.' });
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      setFeedback({ type: 'error', message: 'Não foi possível atualizar o status. Tente novamente.' });
    } finally {
      setSavingStatusId(null);
    }
  };

  const selectedHistory = selectedQuote ? (quoteHistoryById[selectedQuote.id] || []) : [];
  const selectedStatusIcon = STATUS_ICONS[modalStatus] || Clock3;
  const SelectedStatusIcon = selectedStatusIcon;

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
          <div className="flex gap-2 flex-wrap">
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
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedQuote(quote);
                        setModalStatus(quote.status);
                        setFeedback(null);
                      }}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)] text-sm hover:bg-gray-50"
                    >
                      <Eye className="w-4 h-4" />
                      Ver
                    </button>
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

      {selectedQuote && (
        <Modal isOpen={!!selectedQuote} onClose={() => setSelectedQuote(null)} maxWidth="max-w-3xl">
          <ModalHeader title="Detalhes do Orçamento" onClose={() => setSelectedQuote(null)} />
          <div className="p-6 space-y-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h3 className="text-2xl font-bold text-[var(--blue-dark)]">{selectedQuote.clientName}</h3>
                <p className="text-[var(--blue-dark)]/70">{selectedQuote.email} • {selectedQuote.phone}</p>
              </div>
              <StatusBadge status={selectedQuote.status} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard label="Tipo de Projeto" value={selectedQuote.projectType} />
              <InfoCard label="Data" value={new Date(selectedQuote.date).toLocaleDateString('pt-BR')} />
              <InfoCard label="CEP" value={selectedQuote.cep || '-'} />
              <InfoCard label="Número" value={selectedQuote.numEndereco || '-'} />
              <InfoCard label="Complemento" value={selectedQuote.complemento || '-'} />
              <InfoCard label="Rua" value={selectedQuote.rua || '-'} />
              <InfoCard label="Bairro" value={selectedQuote.bairro || '-'} />
              <InfoCard label="Cidade" value={selectedQuote.cidade || '-'} />
              <InfoCard label="Estado" value={selectedQuote.estado || '-'} />
            </div>

            {feedback && (
              <div className={`rounded-lg border px-4 py-3 text-sm ${feedback.type === 'success' ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'}`}>
                {feedback.message}
              </div>
            )}

            <div className="rounded-lg border border-[var(--border)] bg-[var(--blue-light)]/20 p-4 space-y-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <h4 className="font-semibold text-[var(--blue-dark)]">Alterar status</h4>
                  <p className="text-sm text-[var(--blue-dark)]/70">Salve a alteração sem sair desta janela.</p>
                </div>
                <div className="flex items-center gap-2 text-[var(--blue-dark)]/70">
                  <SelectedStatusIcon className={`w-4 h-4 ${savingStatusId === selectedQuote.id ? 'animate-spin' : ''}`} />
                  <span className="text-sm">{STATUS_LABELS[modalStatus] || 'Status'}</span>
                </div>
              </div>
              <select
                value={modalStatus}
                onChange={(e) => setModalStatus(e.target.value)}
                className="w-full px-3 py-3 rounded-lg border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue-main)] bg-white"
              >
                <option value="pending">Pendente</option>
                <option value="in_progress">Em análise</option>
                <option value="proposal_sent">Proposta enviada</option>
                <option value="approved">Aprovado</option>
                <option value="rejected">Recusado</option>
                <option value="cancelled">Cancelado</option>
              </select>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => persistStatus(selectedQuote.id, modalStatus)}
                  disabled={savingStatusId === selectedQuote.id || modalStatus === selectedQuote.status}
                  className="px-4 py-2 rounded-lg bg-[var(--blue-main)] text-white hover:bg-[var(--blue-dark)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {savingStatusId === selectedQuote.id ? 'Salvando...' : 'Salvar status'}
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-[var(--blue-dark)] mb-2">Histórico de status</h4>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {selectedHistory.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-[var(--border)] p-4 text-sm text-[var(--blue-dark)]/60">
                    Sem histórico disponível para este orçamento.
                  </div>
                ) : (
                  selectedHistory.slice().reverse().map((entry, index) => {
                    const Icon = STATUS_ICONS[entry.status] || Clock3;
                    return (
                      <div key={`${entry.at}-${index}`} className="flex gap-3 rounded-lg border border-[var(--border)] p-3 bg-white">
                        <div className="mt-0.5 text-[var(--blue-main)]">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <p className="font-medium text-[var(--blue-dark)]">{entry.label}</p>
                            <p className="text-xs text-[var(--blue-dark)]/50">{formatDateTime(entry.at)}</p>
                          </div>
                          <p className="text-sm text-[var(--blue-dark)]/70">{entry.note}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-[var(--blue-dark)] mb-2">Descrição</h4>
              <p className="text-[var(--blue-dark)]/80 whitespace-pre-line bg-[var(--blue-light)]/30 border border-[var(--border)] rounded-lg p-4">{selectedQuote.message || '-'}</p>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedQuote(null)}
                className="px-4 py-2 rounded-lg bg-[var(--blue-main)] text-white hover:bg-[var(--blue-dark)]"
              >
                Fechar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-lg border border-[var(--border)] p-4 bg-white">
      <p className="text-xs uppercase tracking-wide text-[var(--blue-dark)]/50 mb-1">{label}</p>
      <p className="text-sm font-medium text-[var(--blue-dark)] break-words">{value}</p>
    </div>
  );
}
