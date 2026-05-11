import { useState } from 'react';
import { CheckCircle, Send, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../components/Button';
import { FormField, Input, Textarea } from '../components/FormField';
import { Modal } from '../components/Modal';
import clienteService from '../services/clienteService';
import orcamentoService from '../services/orcamentoService';

export function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState('');
  const [cepFilled, setCepFilled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State para validação de cliente
  const [clienteValidacao, setClienteValidacao] = useState(null);
  const [mostraDialogClienteDuplicado, setMostraDialogClienteDuplicado] = useState(false);
  const [validacaoLoading, setValidacaoLoading] = useState(false);

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

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setFormData((prev) => ({ ...prev, email }));
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

  // Usar cliente existente
  const usarClienteExistente = async () => {
    if (clienteValidacao?.cliente) {
      setFormData((prev) => ({
        ...prev,
        nome: clienteValidacao.cliente.nome,
        email: clienteValidacao.cliente.email,
        telefone: clienteValidacao.cliente.celular.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2'),
      }));
    }
    setMostraDialogClienteDuplicado(false);
    
    // Aguardar um pouco para o state ser atualizado
    setTimeout(async () => {
      await submeterOrcamento();
    }, 100);
  };

  // Continuar com novo cliente
  const continuarNovoCliente = () => {
    setMostraDialogClienteDuplicado(false);
    submeterOrcamento();
  };

  // Submeter orçamento após resolução do cliente duplicado
  const submeterOrcamento = async () => {
    setSubmitError('');
    setIsSubmitting(true);

    try {
      // Remover máscara do telefone
      const telefoneLimpo = formData.telefone.replace(/\D/g, '');

      // Criar orçamento com cliente (cria novo ou usa existente)
      await orcamentoService.criarComCliente(
        formData.nome,
        formData.email,
        telefoneLimpo,
        formData.mensagem,
        formData.cep,
        parseInt(formData.numero),
        formData.complemento
      );

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData(empty);
        setCepFilled(false);
        setClienteValidacao(null);
        setMostraDialogClienteDuplicado(false);
      }, 4000);
    } catch (error) {
      console.error('Erro ao enviar orçamento:', error);
      const mensagemErro = error?.mensagem || error?.message || 'Não foi possível enviar sua solicitação. Verifique sua conexão e tente novamente.';
      setSubmitError(mensagemErro);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setValidacaoLoading(true);

    try {
      // Validar se cliente já existe
      const telefoneLimpo = formData.telefone.replace(/\D/g, '');
      const resultado = await clienteService.validarClienteDuplicado(formData.email, telefoneLimpo);
      
      setClienteValidacao(resultado);

      if (resultado.clienteEncontrado) {
        // Mostrar modal com opções
        setMostraDialogClienteDuplicado(true);
      } else {
        // Cliente não existe, criar orçamento diretamente
        await submeterOrcamento();
      }
    } catch (error) {
      console.error('Erro ao validar cliente:', error);
      const mensagemErro = error?.mensagem || error?.message || 'Não foi possível validar o cliente. Tente novamente.';
      setSubmitError(mensagemErro);
    } finally {
      setValidacaoLoading(false);
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
    <>
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
                <div className="relative">
                  <Input
                    compact
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleEmailChange}
                    placeholder="seu@email.com"
                  />
                  {validacaoLoading && (
                    <Loader2 className="w-4 h-4 animate-spin text-[var(--blue-main)] absolute right-3 top-1/2 -translate-y-1/2" />
                  )}
                </div>
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
                <FormField label="Logradouro *" compact>
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
            <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={isSubmitting || validacaoLoading}>
              {isSubmitting || validacaoLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> {validacaoLoading ? 'Validando...' : 'Enviando...'}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" /> Enviar Solicitação
                </>
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Modal de cliente duplicado */}
      <Modal
        isOpen={mostraDialogClienteDuplicado}
        onClose={continuarNovoCliente}
        title="Cliente Já Cadastrado"
      >
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            Já existe um cliente cadastrado com o email <strong>{formData.email}</strong> ou telefone <strong>{formData.telefone}</strong>.
          </p>
          {clienteValidacao?.cliente && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                <strong>Nome:</strong> {clienteValidacao.cliente.nome}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Email:</strong> {clienteValidacao.cliente.email}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Telefone:</strong> {clienteValidacao.cliente.celular}
              </p>
            </div>
          )}
          <p className="text-gray-700 mb-6">
            Deseja continuar com o cadastro existente ou criar um novo?
          </p>
          <div className="flex gap-3">
            <Button
              onClick={usarClienteExistente}
              className="flex-1 bg-[var(--blue-main)] text-white hover:bg-[var(--blue-dark)]"
            >
              Usar Cadastro Existente
            </Button>
            <Button
              onClick={continuarNovoCliente}
              className="flex-1 bg-gray-300 text-gray-800 hover:bg-gray-400"
            >
              Criar Novo Cadastro
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
