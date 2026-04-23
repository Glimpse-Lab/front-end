import { useState } from 'react';
import './OrcamentoModal.css';

export default function OrcamentoModal({ isOpen, onClose }) {
  const [tipoOrcamento, setTipoOrcamento] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
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
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEnviar = (e) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.telefone) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    // Salvar no localStorage
    const orcamentos = JSON.parse(localStorage.getItem('gpm_orcamentos') || '[]');
    orcamentos.push({
      id: Date.now(),
      tipo: tipoOrcamento,
      status: 'pendente',
      ...formData,
      dataSolicitacao: new Date().toLocaleString('pt-BR'),
      data: new Date().toISOString()
    });
    localStorage.setItem('gpm_orcamentos', JSON.stringify(orcamentos));

    // Feedback e fechamento
    alert('Orçamento enviado com sucesso! Nossa equipe entrará em contato.');
    handleFechar();
  };

  const handleFechar = () => {
    setShowForm(false);
    setTipoOrcamento('');
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      mensagem: ''
    });
    onClose();
  };

  return (
    <>
      {isOpen && <div className="modal-overlay ativo" onClick={handleFechar}></div>}
      <div className={`modal-orcamento ${isOpen ? 'ativo' : ''}`}>
        <button className="modal-close" onClick={handleFechar}>✕</button>
        
        <header className="section-header">
          <h2>Solicite seu orçamento</h2>
        </header>

        {!showForm ? (
          <div className="tipoOrcamento">
            <select 
              name="tipoOrcamento" 
              id="tipoOrcamento"
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
          <div className="orcamento-form">
            <form id="orcamento-form" onSubmit={handleEnviar}>
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input 
                  type="text" 
                  id="nome" 
                  name="nome" 
                  value={formData.nome}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefone">Telefone</label>
                <input 
                  type="tel" 
                  id="telefone" 
                  name="telefone" 
                  value={formData.telefone}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="mensagem">Mensagem</label>
                <textarea 
                  id="mensagem" 
                  name="mensagem" 
                  rows="4"
                  value={formData.mensagem}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="button-group">
                <button type="submit">
                  Enviar solicitação
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)}
                >
                  Voltar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
