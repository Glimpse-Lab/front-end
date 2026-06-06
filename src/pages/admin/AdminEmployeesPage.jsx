import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { UserPlus, AlertCircle, Trash2, User, Mail, CreditCard, Save } from 'lucide-react';
import { AdminPageHeader } from '../../components/AdminPageHeader';
import { Button } from '../../components/Button';
import { Modal, ModalHeader } from '../../components/Modal';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { FormField, Input, PasswordInput, Select } from '../../components/FormField';

// Badge de Status de Permissão
function PermissionBadge({ role }) {
  if (role === 'ADMIN') {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
        ADMIN
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
      PADRÃO
    </span>
  );
}

export function AdminEmployeesPage() {
  const { employees, addEmployee, removeEmployee, updateEmployee, currentUser } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteError, setDeleteError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const empty = { name: '', email: '', cpf: '', password: '', confirmPassword: '', role: 'PADRÃO' };
  const [formData, setFormData] = useState(empty);
  const [formError, setFormError] = useState('');
  const [editData, setEditData] = useState({ nome: '', email: '', password: '', confirmPassword: '', role: 'PADRÃO' });
  const [editError, setEditError] = useState('');
  const [saving, setSaving] = useState(false);
  const set = (key) => (e) => setFormData({ ...formData, [key]: e.target.value });
  const setEdit = (key) => (e) => setEditData({ ...editData, [key]: e.target.value });

  const isOwn = selected && currentUser && String(selected.id) === String(currentUser.id);

  // Garante que o próprio usuário logado sempre apareça na lista
  const displayEmployees = currentUser
    ? employees.some(e => String(e.id) === String(currentUser.id))
      ? employees
      : [{ id: currentUser.id, nome: currentUser.nome, email: currentUser.email, cpf: currentUser.cpf, role: currentUser.role }, ...employees]
    : employees;

  useEffect(() => {
    if (selected) {
      setEditData({
        nome: selected.nome ?? selected.name ?? '',
        email: selected.email ?? '',
        password: '',
        confirmPassword: '',
        role: selected.role ?? 'PADRÃO'
      });
      setEditError('');
    }
  }, [selected]);

  const handleCpf = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 11);
    const masked = raw
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setFormData((prev) => ({ ...prev, cpf: masked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (formData.password !== formData.confirmPassword) {
      setFormError('As senhas não coincidem. Verifique e tente novamente.');
      return;
    }
    try {
      await addEmployee({
        name: formData.name,
        email: formData.email,
        cpf: formData.cpf,
        password: formData.password,
        role: formData.role
      });
      setFormData(empty);
      setShowForm(false);
    } catch {
      setFormError('Não foi possível cadastrar o funcionário. Tente novamente.');
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    
    // Validar campos obrigatórios
    if (!editData.nome?.trim()) {
      setEditError('Nome completo é obrigatório.');
      return;
    }
    if (!editData.email?.trim()) {
      setEditError('E-mail é obrigatório.');
      return;
    }
    if (editData.password && editData.password !== editData.confirmPassword) {
      setEditError('As senhas não coincidem. Verifique e tente novamente.');
      return;
    }
    
    setSaving(true);
    setEditError('');
    try {
      const payload = {
        name: editData.nome,
        email: editData.email,
      };
      
      if (editData.password) {
        payload.password = editData.password;
      }
      
      // Apenas ADMIN pode enviar role (não é "Meu Perfil")
      if (!isOwn) {
        payload.role = editData.role;
      }
      
      console.log('Enviando payload:', payload);
      await updateEmployee(selected.id, payload);
      setSelected(null);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      const errorMsg = error?.response?.data?.message || error?.response?.data || 'Não foi possível salvar as alterações. Tente novamente.';
      setEditError(typeof errorMsg === 'string' ? errorMsg : 'Não foi possível salvar as alterações. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async () => {
    setDeleting(true);
    setDeleteError('');
    try {
      await removeEmployee(selected.id);
      setSelected(null);
      setConfirmDelete(false);
    } catch {
      setDeleteError('Não foi possível remover o funcionário. Tente novamente.');
    } finally {
      setDeleting(false);
    }
  };

  const handleCloseForm = () => { setShowForm(false); setFormError(''); };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <AdminPageHeader title="Funcionários" subtitle="Gerencie os usuários do sistema" />
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <UserPlus className="w-5 h-5" /> Cadastrar Funcionário
        </Button>
      </div>

      {showForm && (
        <Modal onClose={handleCloseForm}>
          <ModalHeader title="Cadastrar Funcionário" onClose={handleCloseForm} />
          <form onSubmit={handleSubmit} className="p-6">
            {formError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm">{formError}</p>
              </div>
            )}
            <FormField label="Nome Completo *">
              <Input type="text" required value={formData.name} onChange={set('name')} placeholder="Ex: João Silva" />
            </FormField>
            <FormField label="E-mail *">
              <Input type="email" required value={formData.email} onChange={set('email')} placeholder="joao@gpmesquadrias.com.br" />
            </FormField>
            <FormField label="CPF *">
              <Input type="text" required value={formData.cpf} onChange={handleCpf} placeholder="000.000.000-00" maxLength={14} />
            </FormField>
            <FormField label="Permissão *">
              <Select required value={formData.role} onChange={set('role')}>
                <option value="PADRÃO">PADRÃO</option>
                <option value="ADMIN">ADMIN</option>
              </Select>
            </FormField>
            <FormField label="Senha *">
              <PasswordInput required value={formData.password} onChange={set('password')} placeholder="••••••••" minLength={6} />
            </FormField>
            <FormField label="Confirmar Senha *" last>
              <PasswordInput required value={formData.confirmPassword} onChange={set('confirmPassword')} placeholder="••••••••" minLength={6} />
            </FormField>
            <div className="flex gap-4">
              <Button type="button" variant="outline" className="flex-1" onClick={handleCloseForm}>Cancelar</Button>
              <Button type="submit" className="flex-1">Cadastrar Funcionário</Button>
            </div>
          </form>
        </Modal>
      )}

      {selected && (
        <Modal onClose={() => { setSelected(null); setDeleteError(''); setEditError(''); }} maxWidth="max-w-sm">
          <ModalHeader
            title={isOwn ? 'Meu Perfil' : 'Detalhes do Funcionário'}
            onClose={() => { setSelected(null); setDeleteError(''); setEditError(''); }}
          />
          <div className="p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 bg-[var(--blue-light)] rounded-full flex items-center justify-center mb-3">
                <span className="text-[var(--blue-main)] font-bold text-2xl">
                  {(selected.nome ?? selected.name ?? '').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-bold text-[var(--blue-dark)]">{selected.nome ?? selected.name}</h2>
              <div className="mt-2">
                <PermissionBadge role={selected.role ?? 'PADRÃO'} />
              </div>
            </div>

            {isOwn ? (
              <form onSubmit={handleSaveEdit}>
                {editError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-800 text-sm">{editError}</p>
                  </div>
                )}
                <FormField label="Nome Completo *">
                  <Input type="text" required value={editData.nome} onChange={setEdit('nome')} placeholder="Ex: João Silva" />
                </FormField>
                <FormField label="E-mail *">
                  <Input type="email" required value={editData.email} onChange={setEdit('email')} placeholder="joao@gpmesquadrias.com.br" />
                </FormField>
                <FormField label="CPF">
                  <Input
                    type="text"
                    value={selected.cpf ?? '—'}
                    disabled
                    className="bg-gray-100 text-gray-400 cursor-not-allowed"
                  />
                </FormField>
                <FormField label="Permissão">
                  <Select 
                    value={editData.role}
                    disabled
                    className="bg-gray-100 text-gray-400 cursor-not-allowed"
                  >
                    <option value="PADRÃO">PADRÃO</option>
                    <option value="ADMIN">ADMIN</option>
                  </Select>
                </FormField>
                <FormField label="Nova Senha">
                  <PasswordInput value={editData.password} onChange={setEdit('password')} placeholder="Deixe em branco para não alterar" minLength={6} />
                </FormField>
                <FormField label={`Confirmar Nova Senha${editData.password ? ' *' : ''}`} last>
                  <PasswordInput value={editData.confirmPassword} onChange={setEdit('confirmPassword')} placeholder="••••••••" minLength={editData.password ? 6 : undefined} required={!!editData.password} />
                </FormField>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => { setSelected(null); setEditError(''); }}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex-1 flex items-center justify-center gap-2" disabled={saving}>
                    <Save className="w-4 h-4" /> {saving ? 'Salvando...' : 'Salvar'}
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSaveEdit}>
                {editError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-800 text-sm">{editError}</p>
                  </div>
                )}
                <FormField label="Nome Completo">
                  <Input type="text" value={editData.nome} onChange={setEdit('nome')} placeholder="Ex: João Silva" disabled className="bg-gray-100 text-gray-400 cursor-not-allowed" />
                </FormField>
                <FormField label="E-mail">
                  <Input type="email" value={editData.email} onChange={setEdit('email')} placeholder="joao@gpmesquadrias.com.br" disabled className="bg-gray-100 text-gray-400 cursor-not-allowed" />
                </FormField>
                <FormField label="CPF">
                  <Input
                    type="text"
                    value={selected.cpf ?? '—'}
                    disabled
                    className="bg-gray-100 text-gray-400 cursor-not-allowed"
                  />
                </FormField>
                <FormField label="Permissão *">
                  <Select 
                    required
                    value={editData.role}
                    onChange={setEdit('role')}
                  >
                    <option value="PADRÃO">PADRÃO</option>
                    <option value="ADMIN">ADMIN</option>
                  </Select>
                </FormField>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => { setSelected(null); setEditError(''); }}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 flex items-center justify-center gap-2" 
                    disabled={saving}
                  >
                    <Save className="w-4 h-4" /> {saving ? 'Salvando...' : 'Salvar Permissão'}
                  </Button>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full flex items-center justify-center gap-2 !bg-red-50 !text-red-600 hover:!bg-red-100 mt-2"
                  onClick={() => setConfirmDelete(true)}
                >
                  <Trash2 className="w-4 h-4" /> Remover Funcionário
                </Button>
              </form>
            )}
          </div>
        </Modal>
      )}

      {confirmDelete && selected && (
        <ConfirmDialog
          title="Remover funcionário?"
          message={`Tem certeza que deseja remover "${selected.nome ?? selected.name}"? Esta ação não poderá ser desfeita.`}
          confirmLabel="Remover"
          loading={deleting}
          onConfirm={handleRemove}
          onCancel={() => { setConfirmDelete(false); setDeleteError(''); }}
        />
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayEmployees.map((employee) => {
          const nome = employee.nome ?? employee.name ?? '';
          const iniciais = nome.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
          return (
            <div
              key={employee.id}
              onClick={() => { setSelected(employee); setDeleteError(''); }}
              className="bg-white rounded-xl border border-[var(--border)] shadow-sm p-5 cursor-pointer hover:shadow-md hover:border-[var(--blue-main)] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--blue-light)] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--blue-main)] font-bold text-base">{iniciais}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[var(--blue-dark)]">{nome}</h3>
                  <p className="text-sm text-[var(--blue-dark)]/60 break-all">{employee.email}</p>
                  <div className="mt-1">
                    <PermissionBadge role={employee.role ?? 'PADRÃO'} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
