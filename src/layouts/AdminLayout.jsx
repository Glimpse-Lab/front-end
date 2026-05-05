import { Outlet, Navigate, useNavigate } from 'react-router';
import { Link, useLocation } from 'react-router';
import { LayoutDashboard, Package, FolderOpen, Mail, Users, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import authService from '../services/authService';
import { ScrollToTop } from '../components/ScrollToTop';

function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, currentUser } = useApp();

  const isActive = (p) => location.pathname === p;

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/projetos', icon: FolderOpen, label: 'Projetos' },
    { path: '/admin/produtos', icon: Package, label: 'Produtos' },
    { path: '/admin/orcamentos', icon: Mail, label: 'Orçamentos' },
    { path: '/admin/funcionarios', icon: Users, label: 'Funcionários' },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-[var(--sidebar)] text-[var(--sidebar-foreground)] flex flex-col z-40">
      <div className="p-6 border-b border-[var(--sidebar-border)]">
        <div className="flex justify-center mb-4">
          <img src="/src/assets/logo.png" alt="GPM Esquadrias" className="h-12 w-auto" />
        </div>
        <div className="text-sm text-white/60">
          <p className="truncate">{currentUser?.name}</p>
          <p className="text-xs">{currentUser?.role}</p>
        </div>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                active
                  ? 'bg-[var(--sidebar-accent)] text-white'
                  : 'text-white/80 hover:bg-[var(--sidebar-accent)] hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[var(--sidebar-border)]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-white/80 hover:bg-[var(--sidebar-accent)] hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}

export function AdminLayout() {
  const token = authService.getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[var(--blue-light)]">
      <ScrollToTop />
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
