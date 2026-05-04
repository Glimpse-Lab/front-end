import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, Send, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../components/Button';
import { FormField, Input, Textarea } from '../components/FormField';

export function QuotePage() {
  const { submitQuote } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState('');
  const [cepFilled, setCepFilled] = useState(false);

  const empty = {
    nome: '',
    email: '',
    telefone: '',
    cep: '',
    rua: '',
    bairro: '',
    cidade: '',
    estado: '',
    numero: '',
    complemento: '',
    mensagem: '',
  };
  const [formData, setFormData] = useState(empty);
  const set = (key) => (e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }));

  const handleTelefone = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 11);
    const masked = raw.length <= 10
      ? raw.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2')
      : raw.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
    setFormData((prev) => ({ ...prev, telefone: masked }));
  };

  const handleCepChange = async (e) => {
    const raw = e.target.value.replace(/\D/g, '');
    const formatted = raw.length > 5 ? `${raw.slice(0, 5)}-${raw.slice(5, 8)}` : raw;
    setFormData((prev) => ({ ...prev, cep: formatted }));
    setCepError('');

    if (raw.length < 8) {
      if (cepFilled) {
        setCepFilled(false);
        setFormData((prev) => ({ ...prev, rua: '', bairro: '', cidade: '', estado: '' }));
      }
      return;
    }

    setCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`);
      const data = await res.json();
      if (data.erro) {
        setCepError('CEP não encontrado. Verifique e tente novamente.');
        setCepFilled(false);
      } else {
        setFormData((prev) => ({
          ...prev,
          rua: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          estado: data.uf || '',
        }));
        setCepFilled(true);
      }
    } catch {
      setCepError('Não foi possível consultar o CEP. Verifique sua conexão.');
      setCepFilled(false);
    } finally {
      setCepLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    try {
      await submitQuote(formData);
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setFormData(empty); setCepFilled(false); }, 4000);
    } catch {
      setSubmitError('Não foi possível enviar sua solicitação. Verifique sua conexão e tente novamente.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-16">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-[var(--blue-dark)] mb-4">Solicitação Enviada!</h2>
          <p className="text-[var(--blue-dark)]/70 mb-6">Recebemos sua solicitação de orçamento. Nossa equipe entrará em contato em breve.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-[var(--blue-dark)] mb-2">Solicitar Orçamento</h1>
          <p className="text-[var(--blue-dark)]/70">Preencha o formulário abaixo e nossa equipe entrará em contato</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 border border-[var(--border)] text-sm">

          <h2 className="text-base font-bold text-[var(--blue-dark)] mb-3">Dados de Contato</h2>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Nome Completo *" compact>
              <Input compact type="text" required value={formData.nome} onChange={set('nome')} placeholder="Seu nome completo" />
            </FormField>
            <FormField label="E-mail *" compact>
              <Input compact type="email" required value={formData.email} onChange={set('email')} placeholder="seu@email.com" />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Telefone *" compact>
              <Input compact type="tel" required value={formData.telefone} onChange={handleTelefone} placeholder="(00) 00000-0000" maxLength={15} />
            </FormField>
          </div>

          <h2 className="text-base font-bold text-[var(--blue-dark)] mb-3 mt-5">Endereço da Obra</h2>

          <div className="grid grid-cols-3 gap-3">
            <FormField label="CEP *" compact>
              <div className="relative">
                <Input
                  compact
                  type="text"
                  required
                  value={formData.cep}
                  onChange={handleCepChange}
                  placeholder="00000-000"
                  maxLength={9}
                />
                {cepLoading && (
                  <Loader2 className="w-4 h-4 animate-spin text-[var(--blue-main)] absolute right-3 top-1/2 -translate-y-1/2" />
                )}
              </div>
              {cepError && <p className="mt-1 text-xs text-red-600">{cepError}</p>}
            </FormField>
            <div className="col-span-2">
              <FormField label="Rua *" compact>
                <Input
                  compact
                  type="text"
                  required
                  value={formData.rua}
                  onChange={set('rua')}
                  placeholder="Nome da rua"
                  disabled={cepFilled}
                  className={cepFilled ? 'bg-gray-50 cursor-not-allowed' : ''}
                />
              </FormField>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <FormField label="Número *" compact>
              <Input compact type="text" required value={formData.numero} onChange={set('numero')} placeholder="Nº" />
            </FormField>
            <div className="col-span-2">
              <FormField label="Complemento" compact>
                <Input compact type="text" value={formData.complemento} onChange={set('complemento')} placeholder="Apto, bloco, sala..." />
              </FormField>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <FormField label="Bairro *" compact>
              <Input
                compact
                type="text"
                required
                value={formData.bairro}
                onChange={set('bairro')}
                placeholder="Bairro"
                disabled={cepFilled}
                className={cepFilled ? 'bg-gray-50 cursor-not-allowed' : ''}
              />
            </FormField>
            <FormField label="Cidade *" compact>
              <Input
                compact
                type="text"
                required
                value={formData.cidade}
                onChange={set('cidade')}
                placeholder="Cidade"
                disabled={cepFilled}
                className={cepFilled ? 'bg-gray-50 cursor-not-allowed' : ''}
              />
            </FormField>
            <FormField label="Estado *" compact>
              <Input
                compact
                type="text"
                required
                value={formData.estado}
                onChange={set('estado')}
                placeholder="UF"
                maxLength={2}
                disabled={cepFilled}
                className={cepFilled ? 'bg-gray-50 cursor-not-allowed' : ''}
              />
            </FormField>
          </div>

          <h2 className="text-base font-bold text-[var(--blue-dark)] mb-3 mt-5">Sobre o Projeto</h2>
          <FormField label="Mensagem / Descrição do Projeto *" last compact>
            <Textarea compact required value={formData.mensagem} onChange={set('mensagem')} rows={3} placeholder="Descreva seu projeto e necessidades..." />
          </FormField>

          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-800 text-sm">{submitError}</p>
            </div>
          )}
          <Button type="submit" className="w-full flex items-center justify-center gap-2">
            <Send className="w-5 h-5" /> Enviar Solicitação
          </Button>
        </form>
      </div>
    </div>
  );
}
