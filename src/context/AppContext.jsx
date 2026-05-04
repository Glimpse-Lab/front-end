import { createContext, useContext, useState, useEffect } from 'react';
import { mockProjects, mockProducts, mockQuotes } from '../data/mockData';
import { useAuthToken } from '../hooks/useAuthToken';
import usuarioService from '../services/usuarioService';

const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  const { isAuthenticated, user: currentUser, handleLogin, handleLogout, updateStoredUser } = useAuthToken();
  const [projects, setProjects] = useState(mockProjects);
  const [products, setProducts] = useState(mockProducts);
  const [quotes, setQuotes] = useState(mockQuotes);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      usuarioService.listar()
        .then(setEmployees)
        .catch(() => setEmployees([]));
    }
  }, [isAuthenticated]);

  const login = async (email, password) => {
    try {
      await handleLogin(email, password);
      return null;
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        return 'E-mail ou senha incorretos.';
      }
      if (!status) {
        return 'Erro de conexão. Verifique sua internet e tente novamente.';
      }
      return 'Ocorreu um erro inesperado. Tente novamente.';
    }
  };

  const logout = () => {
    handleLogout();
  };

  const addProject = (project) => {
    const newProject = { ...project, id: String(Date.now()) };
    setProjects((prev) => [...prev, newProject]);
  };

  const updateProject = (id, data) => {
    setProjects((prev) => prev.map((p) => p.id === id ? { ...p, ...data } : p));
  };

  const removeProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const addProduct = (product) => {
    const newProduct = { ...product, id: String(Date.now()) };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (id, data) => {
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, ...data } : p));
  };

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuoteStatus = (quoteId, status) => {
    setQuotes(quotes.map(q => q.id === quoteId ? { ...q, status } : q));
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
    if (currentUser && currentUser.id === id) {
      updateStoredUser(updated);
    }
  };

  const submitQuote = (quote) => {
    const newQuote = {
      ...quote,
      id: String(quotes.length + 1),
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setQuotes([...quotes, newQuote]);
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
        submitQuote
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
