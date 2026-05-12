import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { CheckCircle, AlertCircle, ArrowLeft, MailCheck } from 'lucide-react';
import { Button } from '../components/Button';
import { FormField, Input, PasswordInput } from '../components/FormField';
import api from '../provider/api';

function ErrorAlert({ message }) {
  return (
    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
      <p className="text-red-800 text-sm">{message}</p>
    </div>
  );
}

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Captura o token UUID da URL (se existir)
  const tokenURL = searchParams.get('token');

  // Se o usuário clicou no link do email, já inicia na etapa de senha
  const [step, setStep] = useState(tokenURL ? 'password' : 'email');
  
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Atualizei os steps removendo a digitação do código manual
  const stepMeta = {
    email: {
      title: 'Recuperar Senha',
      subtitle: 'Informe seu e-mail para receber o link de redefinição',
    },
    checkEmail: {
      title: 'Verifique seu e-mail',
      subtitle: `Enviamos um link de recuperação para ${email}`,
    },
    password: {
      title: 'Nova Senha',
      subtitle: 'Crie uma nova senha para sua conta',
    },
    done: {
      title: 'Senha Redefinida',
      subtitle: 'Sua senha foi atualizada com sucesso',
    },
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Faz o POST para o endpoint do Spring Boot que criamos
      await api.post('/usuarios/esqueci-senha', { email });
      setStep('checkEmail');
    } catch (err) {
      setError('Não foi possível enviar o link. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    if (newPassword.length < 6) { // Ajustado para 6 conforme padrão comum (ou 8 se preferir)
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    
    setError('');
    setLoading(true);
    try {
      // Envia o token capturado da URL junto com a nova senha
      await api.post('/usuarios/redefinir-senha', {
        token: tokenURL,
        novaSenha: newPassword
      });
      setStep('done');
    } catch (err) {
      // Trata a exceção TokenInvalidoException vinda do Spring Boot
      if (err.response && err.response.status === 400) {
        setError('Este link de recuperação expirou ou é inválido. Solicite um novo.');
      } else {
        setError('Não foi possível redefinir a senha. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const { title, subtitle } = stepMeta[step];

  return (
    <div className="min-h-screen bg-[var(--blue-dark)] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-5">
          <img src="/src/assets/logo.png" alt="GPM Esquadrias" className="h-16 w-auto mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-white mb-1">{title}</h1>
          <p className="text-white/70 text-sm">{subtitle}</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6">

          {/* Indicador de etapas atualizado (Email -> Senha) */}
          {step !== 'done' && step !== 'checkEmail' && (
            <div className="flex items-center gap-1.5 mb-5">
              {['email', 'password'].map((s, i) => (
                <div key={s} className="flex items-center gap-1.5 flex-1">
                  <div
                    className={`h-1.5 w-full rounded-full transition-colors ${
                      ['email', 'password'].indexOf(step) >= i
                        ? 'bg-[var(--blue-main)]'
                        : 'bg-gray-200'
                    }`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Etapa 1 — Pedir E-mail */}
          {step === 'email' && (
            <form onSubmit={handleEmailSubmit}>
              {error && <ErrorAlert message={error} />}
              <FormField label="E-mail" last>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                />
              </FormField>
              <Button type="submit" className="w-full mb-3" disabled={loading}>
                {loading ? 'Enviando...' : 'Receber link de recuperação'}
              </Button>
            </form>
          )}

          {/* Etapa 2 — Aviso para checar o email (Substitui a tela de digitar código) */}
          {step === 'checkEmail' && (
            <div className="flex flex-col items-center text-center gap-3 py-4 mb-3">
              <MailCheck className="w-12 h-12 text-[var(--blue-main)]" />
              <p className="text-sm text-gray-600">
                Se o e-mail estiver cadastrado, você receberá um link seguro. 
                Clique nele para criar sua nova senha.
              </p>
            </div>
          )}

          {/* Etapa 3 — Nova senha (Acessada via Link do e-mail) */}
          {step === 'password' && (
            <form onSubmit={handlePasswordSubmit}>
              {error && <ErrorAlert message={error} />}
              <FormField label="Nova senha">
                <PasswordInput
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                />
              </FormField>
              <FormField label="Confirmar nova senha" last>
                <PasswordInput
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repita a senha"
                />
              </FormField>
              <Button type="submit" className="w-full mb-3" disabled={loading}>
                {loading ? 'Salvando...' : 'Redefinir senha'}
              </Button>
            </form>
          )}

          {/* Etapa 4 — Concluído */}
          {step === 'done' && (
            <div className="flex flex-col items-center text-center gap-3 py-2 mb-3">
              <CheckCircle className="w-10 h-10 text-green-500" />
              <p className="text-[var(--blue-dark)] font-medium">Senha redefinida com sucesso!</p>
              <p className="text-sm text-gray-500">Você já pode entrar com sua nova senha.</p>
              <Button className="w-full mt-1" onClick={() => navigate('/login')}>
                Ir para o login
              </Button>
            </div>
          )}

          {step !== 'done' && (
            <div className="text-center mt-1">
              <Link
                to="/login"
                className="inline-flex items-center gap-1 text-sm text-[var(--blue-main)] hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Voltar ao login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}