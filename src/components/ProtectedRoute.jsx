import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import authService from "../services/authService.js";

/**
 * Componente que protege rotas, permitindo acesso apenas para usuários autenticados
 * Se o usuário não tiver token, redireciona para a home
 * 
 * @param {Object} props - Propriedades
 * @param {React.ReactNode} props.children - Elemento a ser renderizado se autenticado
 * @returns {React.ReactNode} Elemento protegido ou redirecionamento
 */
export default function ProtectedRoute({ children }) {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica autenticação ao montar o componente
    const checkAuth = () => {
      const token = authService.getToken();
      const user = authService.getUser();
      const authenticated = !!token && !!user;

      console.log("🔒 ProtectedRoute Check:", {
        authenticated,
        hasToken: !!token,
        hasUser: !!user,
        token: token ? token.substring(0, 20) + "..." : null,
        user: user?.email || null,
      });

      setIsAuthenticated(authenticated);
      setIsChecking(false);
    };

    checkAuth();
  }, []);

  if (isChecking) {
    // Enquanto verifica, mostra uma tela em branco ou loading
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <p>Verificando autenticação...</p>
    </div>;
  }

  if (!isAuthenticated) {
    console.warn("❌ Acesso negado - redirecionando para /");
    return <Navigate to="/" replace />;
  }

  console.log("✅ Acesso permitido");
  return children;
}
