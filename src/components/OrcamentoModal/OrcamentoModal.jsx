import { useState } from 'react';
import './OrcamentoModal.css';
import { criarOrcamento } from '../../services/orcamentosService';

export default function OrcamentoModal({ isOpen, onClose }) {
  const [tipoOrcamento, setTipoOrcamento] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [semComplemento, setSemComplemento] = useState(false);
  const [enderecoAutomatico, setEnderecoAutomatico] = useState(false);

  const handleSemComplemento = (e) => {
    const isChecked = e.target.checked;
    setSemComplemento(isChecked);

    if (isChecked) {
      setFormData((prev) => ({ ...prev, complemento: '' }));
    }
  };

  const [formData, setFormData] = useState({
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
    mensagem: ''
  });

  const handleProximoPasso = () => {
    if (!tipoOrcamento) {
      alert('Selecione um tipo de orçamento');
      return;
    }
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  async function buscarCep(cepDigitado) {
    const cep = cepDigitado.replace(/\D/g, '');
    if (cep.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setFormData((prev) => ({
          ...prev,
          rua: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          estado: data.uf || ''
        }));

        // 👇 Se achou o endereço, bloqueia os campos
        setEnderecoAutomatico(true);
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  }

  function handleCepChange(e) {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 8) valor = valor.substring(0, 8);
    if (valor.length > 5) valor = valor.replace(/^(\d{5})(\d)/, '$1-$2');

    setFormData((prev) => ({ ...prev, cep: valor }));

    // 👇 Sempre que o usuário mexer no CEP, libera os campos para edição
    setEnderecoAutomatico(false);

   buscarCep(valor);
  }

  const handleEnviar = async (e) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.telefone) {
      alert('Preencha os dados obrigatórios');
      return;
    }

    if (!formData.cep || !formData.numero) {
      alert('Preencha o endereço completo');
      return;
    }

    try {
      setLoading(true);

      await criarOrcamento({
        tipo: tipoOrcamento,
        ...formData
      });

      alert('Orçamento enviado com sucesso!');
      handleFechar();
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar orçamento');
    } finally {
      setLoading(false);
    }
  };

  const handleFechar = () => {
    setShowForm(false);
    setTipoOrcamento('');
    setFormData({
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
      mensagem: ''
    });
    onClose();

    setEnderecoAutomatico(false);
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay ativo" onClick={handleFechar}></div>
      )}

      <div className={`modal-orcamento ${isOpen ? 'ativo' : ''}`}>
        <button className="modal-close" onClick={handleFechar}>✕</button>

        <header className="section-header">
          <h2>Solicite seu orçamento</h2>
        </header>

        {!showForm ? (
          <div className="tipoOrcamento">
            <select
              value={tipoOrcamento}
              onChange={(e) => setTipoOrcamento(e.target.value)}
            >
              <option value="">Selecione o tipo de orçamento</option>
              <option value="manutencao">Manutenção</option>
              <option value="projeto">Projeto</option>
            </select>

            <button onClick={handleProximoPasso} className="btn btn-primary">
              Próximo passo
            </button>
          </div>
        ) : (
          /* A CLASSE FOI PASSADA DIRETO PARA O FORM */
          <form className="orcamento-form" onSubmit={handleEnviar}>
            <div className="form-group">
              <label>Nome</label>
              <input name="nome" value={formData.nome} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label>Telefone</label>
              <input name="telefone" value={formData.telefone} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label>CEP</label>
              <input
                name="cep"
                value={formData.cep}
                onChange={handleCepChange}
                placeholder="00000-000"
                required
              />
            </div>

            {/* CAMPOS AGRUPADOS LADO A LADO */}
            <div className="form-row">
              <div className="form-group flex-2">
                <label>Rua</label>
                <input name="rua" value={formData.rua} onChange={handleInputChange} disabled={enderecoAutomatico} />
              </div>
              <div className="form-group flex-1">
                <label>Número</label>
                <input name="numero" value={formData.numero} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group flex-1">
                <label>Bairro</label>
                <input name="bairro" value={formData.bairro} onChange={handleInputChange} disabled={enderecoAutomatico} />
              </div>
              <div className="form-group flex-1">
                <label>Cidade</label>
                <input name="cidade" value={formData.cidade} onChange={handleInputChange} disabled={enderecoAutomatico} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group flex-1">
                <label>Estado</label>
                <input name="estado" value={formData.estado} onChange={handleInputChange} disabled={enderecoAutomatico} />
              </div>
              <div className="form-group flex-2">
                {/* Nós envolvemos as duas labels (título e checkbox) numa div 
                  para elas ficarem lado a lado 
                */}
                <div className="label-with-check">
                  <label>Complemento</label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={semComplemento}
                      onChange={handleSemComplemento}
                    />
                    Sem Complemento
                  </label>
                </div>
                <input
                  name="complemento"
                  value={formData.complemento}
                  onChange={handleInputChange}
                  disabled={semComplemento} /* 👈 Desabilita se estiver marcado */
                  placeholder={semComplemento ? 'Sem complemento' : ''}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Mensagem</label>
              <textarea name="mensagem" rows="4" value={formData.mensagem} onChange={handleInputChange}></textarea>
            </div>

            <div className="button-group">
              <button type="submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar solicitação'}
              </button>

              <button type="button" onClick={() => setShowForm(false)}>
                Voltar e alterar tipo
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}