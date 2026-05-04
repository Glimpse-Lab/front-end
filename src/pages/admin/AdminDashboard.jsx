import { useApp } from '../../context/AppContext';
import { FolderOpen, Package, Mail, Users } from 'lucide-react';
import { AdminPageHeader } from '../../components/AdminPageHeader';
import { StatusBadge } from '../../components/StatusBadge';

export function AdminDashboard() {
  const { projects, products, quotes, employees } = useApp();
  const pendingQuotes = quotes.filter(q => q.status === 'pending').length;

  const stats = [
    { label: 'Total de Projetos', value: projects.length, icon: FolderOpen, color: 'bg-blue-100 text-blue-600' },
    { label: 'Total de Produtos', value: products.length, icon: Package, color: 'bg-green-100 text-green-600' },
    { label: 'Orçamentos Pendentes', value: pendingQuotes, icon: Mail, color: 'bg-yellow-100 text-yellow-600' },
    { label: 'Funcionários Ativos', value: employees.length, icon: Users, color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <AdminPageHeader title="Dashboard" subtitle="Visão geral do sistema" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl p-6 border border-[var(--border)] shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-[var(--blue-dark)]">{value}</div>
            </div>
            <p className="text-[var(--blue-dark)]/70 text-sm">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 border border-[var(--border)] shadow-sm mb-6">
        <h2 className="text-xl font-bold text-[var(--blue-dark)] mb-4">Orçamentos Recentes</h2>
        <div className="space-y-3">
          {quotes.slice(0, 5).map((quote) => (
            <div key={quote.id} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
              <div>
                <p className="font-medium text-[var(--blue-dark)]">{quote.clientName}</p>
                <p className="text-sm text-[var(--blue-dark)]/60">{quote.projectType}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-[var(--blue-dark)]/60">{new Date(quote.date).toLocaleDateString('pt-BR')}</span>
                <StatusBadge status={quote.status} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-[var(--border)] shadow-sm">
          <h2 className="text-xl font-bold text-[var(--blue-dark)] mb-4">Projetos Recentes</h2>
          <div className="space-y-3">
            {projects.slice(0, 3).map((project) => (
              <div key={project.id} className="flex items-center gap-4">
                <img src={project.image} alt={project.name} className="w-16 h-16 object-cover rounded-lg" />
                <div>
                  <p className="font-medium text-[var(--blue-dark)]">{project.name}</p>
                  <p className="text-sm text-[var(--blue-dark)]/60">{project.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-[var(--border)] shadow-sm">
          <h2 className="text-xl font-bold text-[var(--blue-dark)] mb-4">Produtos Recentes</h2>
          <div className="space-y-3">
            {products.slice(0, 3).map((product) => (
              <div key={product.id} className="flex items-center gap-4">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg bg-[var(--blue-light)]" />
                <div>
                  <p className="font-medium text-[var(--blue-dark)]">{product.name}</p>
                  <p className="text-sm text-[var(--blue-dark)]/60">{product.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
