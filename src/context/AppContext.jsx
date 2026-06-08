import { createContext, useState, useEffect } from 'react';
import { mockProjects, mockProducts, mockQuotes } from '../data/mockData';
import { useAuthToken } from '../hooks/useAuthToken';
import usuarioService from '../services/usuarioService';
import produtoService from '../services/produtoService';
import projetoService from '../services/projetoService';

export const AppContext = createContext(undefined);

// IDs fixos do DataSeeder (inseridos nessa ordem quando o banco está vazio)
const PRODUCT_CATEGORY_IDS = { 'Janelas': 1, 'Portas': 2, 'Sistemas': 3, 'Acessórios': 4 };
const PROJECT_CATEGORY_IDS = { 'Residencial': 5, 'Comercial': 6, 'Corporativo': 7 };

const mockProductImageByName = Object.fromEntries(mockProducts.map((p) => [p.name, p.image]));
const mockProjectImageByName = Object.fromEntries(mockProjects.map((p) => [p.name, p.image]));

const mapProduct = (p) => ({
  id: String(p.id),
  name: p.nome,
  category: p.categoriaNome || '',
  categoryId: p.categoriaId ?? '',
  description: p.descricao || '',
  specifications: p.especificacaoTecnica || '',
  image: p.imagemUrl || mockProductImageByName[p.nome] || '',
  preco: p.preco,
  quantidadeEstoque: p.quantidadeEstoque,
});

const mapProject = (p) => ({
  id: String(p.id),
  name: p.titulo,
  description: p.descricao || '',
  category: p.categoria?.nome || p.categoriaNome || '',
  categoryId: p.categoria?.id ?? '',
  location: p.localizacao || '',
  materials: p.materiaisUtilizados || '',
  image: Array.isArray(p.imagensUrls) ? (p.imagensUrls[0] || mockProjectImageByName[p.titulo] || '') : (p.imagensUrls || mockProjectImageByName[p.titulo] || ''),
  date: p.dataProjeto || '',
});

export function AppProvider({ children }) {
  const { isAuthenticated, user: currentUser, handleLogin, handleLogout, updateStoredUser } = useAuthToken();
  const [projects, setProjects] = useState(mockProjects);
  const [products, setProducts] = useState(mockProducts);
  const [quotes, setQuotes] = useState(mockQuotes);
  const [employees, setEmployees] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);

  // Popula o backend com dados simulados na primeira vez que estiver vazio
  const seedProducts = async () => {
    for (const p of mockProducts) {
      try {
        await produtoService.create({
          nome: p.name,
          descricao: p.description,
          preco: 1500,
          quantidadeEstoque: 10,
          especificacaoTecnica: p.specifications,
          imagemUrl: p.image,
          categoriaId: PRODUCT_CATEGORY_IDS[p.category] || 1,
        });
      } catch { /* ignora duplicatas ou outros erros */ }
    }
  };

  const seedProjects = async () => {
    for (const p of mockProjects) {
      try {
        await projetoService.create({
          titulo: p.name,
          descricao: p.description,
          localizacao: p.location,
          materiaisUtilizados: p.materials,
          imagensUrls: p.image,
          categoriaId: PROJECT_CATEGORY_IDS[p.category] || 5,
          dataProjeto: '2026-01-01T00:00:00',
        });
      } catch { /* ignora duplicatas ou outros erros */ }
    }
  };

  // Recarrega produtos do backend no estado compartilhado
  const reloadProducts = async () => {
    try {
      const data = await produtoService.fetchAll();
      setProducts(data.map(mapProduct));
    } catch { /* mantém estado atual */ }
  };

  // Recarrega projetos do backend no estado compartilhado
  const reloadProjects = async () => {
    try {
      const data = await projetoService.fetchAll();
      setProjects(data.map(mapProject));
    } catch { /* mantém estado atual */ }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const loadProducts = async () => {
      setLoadingProducts(true);
      try {
        let data = await produtoService.fetchAll();
        if (data.length === 0) {
          await seedProducts();
          data = await produtoService.fetchAll();
        }
        setProducts(data.map(mapProduct));
      } catch { /* mantém mockData em caso de falha */ }
      setLoadingProducts(false);
    };

    const loadProjects = async () => {
      setLoadingProjects(true);
      try {
        let data = await projetoService.fetchAll();
        if (data.length === 0) {
          await seedProjects();
          data = await projetoService.fetchAll();
        }
        setProjects(data.map(mapProject));
      } catch { /* mantém mockData em caso de falha */ }
      setLoadingProjects(false);
    };

    loadProducts();
    loadProjects();

    usuarioService.listar()
      .then(setEmployees)
      .catch(() => setEmployees([]));

    import('../services/orcamentoService').then(({ default: orcamentoService }) => {
      orcamentoService.listar()
        .then((backendQuotes) => {
          const mapped = backendQuotes.map((q) => ({
            id: String(q.id),
            clientName: q.cliente?.nome || '',
            email: q.cliente?.email || '',
            phone: q.cliente?.celular || '',
            projectType: q.descricaoProjeto || '',
            message: q.descricaoProjeto || '',
            date: q.dataSolicitacao ? q.dataSolicitacao.split('T')[0] : new Date().toISOString().split('T')[0],
            endereco: q.endereco || null,
            status: (function mapStatus(s) {
              if (!s) return 'pending';
              switch (s) {
                case 'PENDENTE': return 'pending';
                case 'EM_ANDAMENTO': return 'in_progress';
                case 'PROPOSTA_ENVIADA': return 'proposal_sent';
                case 'APROVADO': return 'approved';
                case 'RECUSADO': return 'rejected';
                case 'CANCELADO': return 'cancelled';
                default: return 'pending';
              }
            })(q.status?.name ? q.status.name : q.status),
          }));
          setQuotes(mapped);
        })
        .catch(() => { /* mantém mockQuotes */ });
    });
  }, [isAuthenticated]);

  const login = async (email, password) => {
    try {
      await handleLogin(email, password);
      return null;
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401 || status === 403) return 'E-mail ou senha incorretos.';
      if (!status) return 'Erro de conexão. Verifique sua internet e tente novamente.';
      return 'Ocorreu um erro inesperado. Tente novamente.';
    }
  };

  const logout = () => { handleLogout(); };

  // ---- CRUD Produtos (chama API + atualiza estado compartilhado) ----

  const addProduct = async (formData) => {
    const created = await produtoService.create(formData);
    const mapped = mapProduct(created);
    setProducts((prev) => [...prev, mapped]);
    reloadProducts(); // remove resíduos de mock após primeira criação real
    return mapped;
  };

  const updateProduct = async (id, formData) => {
    const updated = await produtoService.update(id, formData);
    const mapped = mapProduct(updated);
    setProducts((prev) => prev.map((p) => p.id === String(id) ? mapped : p));
    return mapped;
  };

  const removeProduct = async (id) => {
    await produtoService.delete(id);
    setProducts((prev) => prev.filter((p) => p.id !== String(id)));
  };

  // ---- CRUD Projetos ----

  const addProject = async (formData) => {
    const created = await projetoService.create(formData);
    const mapped = mapProject(created);
    setProjects((prev) => [...prev, mapped]);
    reloadProjects();
    return mapped;
  };

  const updateProject = async (id, formData) => {
    const updated = await projetoService.update(id, formData);
    const mapped = mapProject(updated);
    setProjects((prev) => prev.map((p) => p.id === String(id) ? mapped : p));
    return mapped;
  };

  const removeProject = async (id) => {
    await projetoService.delete(id);
    setProjects((prev) => prev.filter((p) => p.id !== String(id)));
  };

  // ---- Outros ----

  const updateQuoteStatus = (quoteId, status) => {
    setQuotes((prev) => prev.map(q => q.id === quoteId ? { ...q, status } : q));
  };

  const addEmployee = async (employee) => {
    const created = await usuarioService.cadastrar(employee);
    setEmployees((prev) => [...prev, created]);
  };

  const removeEmployee = async (id) => {
    await usuarioService.remover(id);
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  const updateEmployee = async (id, data) => {
    const updated = await usuarioService.atualizar(id, data);
    setEmployees((prev) => prev.map((e) => e.id === id ? { ...e, ...updated } : e));
    if (currentUser && currentUser.id === id) updateStoredUser(updated);
  };

  const submitQuote = (quote) => {
    const newQuote = {
      ...quote,
      id: quote.id ? String(quote.id) : String(quotes.length + 1),
      date: quote.date ? quote.date : new Date().toISOString().split('T')[0],
      status: quote.status ? quote.status : 'pending',
    };
    setQuotes((prev) => [...prev, newQuote]);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        projects,
        products,
        quotes,
        employees,
        loadingProducts,
        loadingProjects,
        login,
        logout,
        addProject,
        updateProject,
        removeProject,
        addProduct,
        updateProduct,
        removeProduct,
        updateQuoteStatus,
        addEmployee,
        removeEmployee,
        updateEmployee,
        submitQuote,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { useApp } from '../hooks/useApp';
