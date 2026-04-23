import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projetos from './pages/Projetos';
import Formulario from './pages/Formulario';
import Admin from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}