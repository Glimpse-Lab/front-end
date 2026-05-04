import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { AlertCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { FormField, Input, PasswordInput } from '../components/FormField';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const errorMsg = await login(email, password);
    if (!errorMsg) {
      navigate('/admin');
    } else {
      setError(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--blue-dark)] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-5">
          <img src="/src/assets/logo.png" alt="GPM Esquadrias" className="h-16 w-auto mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-white mb-1">Área Administrativa</h1>
          <p className="text-white/70 text-sm">Entre com suas credenciais</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
          <FormField label="E-mail">
            <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" className="transition-all" />
          </FormField>
          <FormField label="Senha" last>
            <PasswordInput required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="transition-all" />
          </FormField>
          <Button type="submit" className="w-full mb-3">Entrar</Button>
          <div className="text-center">
            <a href="#" className="text-sm text-[var(--blue-main)] hover:underline">Esqueci minha senha</a>
          </div>
        </form>
      </div>
    </div>
  );
}
