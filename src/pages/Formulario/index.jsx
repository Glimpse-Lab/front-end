import FormularioComponent from "../../components/Formulario/Formulario.jsx";
import { useNavigate } from "react-router-dom";

export default function FormularioPage() {
  const navigate = useNavigate();
  
  // Se o login for admin, navegamos para a rota /admin
  const handleAdminAccess = () => navigate("/admin");

  return <FormularioComponent onNavigateToAdmin={handleAdminAccess} />;
}