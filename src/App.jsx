import { useState } from "react";
import Formulario from "./components/Formulario/Formulario.jsx";
import Administracao from "./components/Administracao.jsx";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigateToAdmin = () => {
    setCurrentPage("admin");
  };

  const handleNavigateHome = () => {
    setCurrentPage("home");
  };

  return (
    <div>
      {currentPage === "home" && (
        <Formulario onNavigateToAdmin={handleNavigateToAdmin} />
      )}
      {currentPage === "admin" && (
        <Administracao onNavigateHome={handleNavigateHome} />
      )}
    </div>
  );
}
