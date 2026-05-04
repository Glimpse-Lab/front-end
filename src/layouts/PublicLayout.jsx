import { Outlet } from 'react-router';
import { Link, useLocation } from 'react-router';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Lock } from 'lucide-react';

function Header() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-[var(--border)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/src/assets/logo.png" alt="GPM Esquadrias" className="h-10 w-auto" />
          <span className="text-[var(--blue-dark)] font-bold text-xl">GPM Esquadrias</span>
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            to="/projetos"
            className={`transition-colors ${isActive('/projetos') ? 'text-[var(--blue-main)]' : 'text-[var(--blue-dark)] hover:text-[var(--blue-main)]'}`}
          >
            Projetos
          </Link>
          <Link
            to="/produtos"
            className={`transition-colors ${isActive('/produtos') ? 'text-[var(--blue-main)]' : 'text-[var(--blue-dark)] hover:text-[var(--blue-main)]'}`}
          >
            Produtos
          </Link>
          <Link
            to="/orcamento"
            className="bg-[var(--blue-main)] text-white px-6 py-2.5 rounded-lg hover:bg-[var(--blue-dark)] transition-colors"
          >
            Solicitar Orçamento
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--blue-dark)] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/src/assets/logo.png" alt="GPM Esquadrias" className="h-12 w-auto" />
              <span className="font-bold text-xl">GPM Esquadrias</span>
            </div>
            <p className="text-white/80 leading-relaxed">
              Excelência em esquadrias de alumínio para projetos residenciais, comerciais e corporativos.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Links Rápidos</h3>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-white/80 hover:text-white transition-colors">Início</Link>
              <Link to="/projetos" className="text-white/80 hover:text-white transition-colors">Projetos</Link>
              <Link to="/produtos" className="text-white/80 hover:text-white transition-colors">Produtos</Link>
              <Link to="/orcamento" className="text-white/80 hover:text-white transition-colors">Solicitar Orçamento</Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contato</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[var(--blue-main)]" />
                <span className="text-white/80">(11) 3456-7890</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[var(--blue-main)]" />
                <span className="text-white/80">contato@gpmesquadrias.com.br</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[var(--blue-main)]" />
                <span className="text-white/80">São Paulo, SP</span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <Facebook className="w-5 h-5 text-white/80 hover:text-[var(--blue-main)] cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-white/80 hover:text-[var(--blue-main)] cursor-pointer transition-colors" />
                <Linkedin className="w-5 h-5 text-white/80 hover:text-[var(--blue-main)] cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex items-center justify-between text-white/60 text-sm">
          <span>© 2026 GPM Esquadrias. Todos os direitos reservados.</span>
          <Link to="/login" className="flex items-center gap-1.5 text-white/30 hover:text-white/60 transition-colors">
            <Lock className="w-3.5 h-3.5" />
            Acesso restrito
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
