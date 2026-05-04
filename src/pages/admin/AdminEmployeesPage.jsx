import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { UserPlus, AlertCircle, Trash2, User, Mail, CreditCard, Save } from 'lucide-react';
import { AdminPageHeader } from '../../components/AdminPageHeader';
import { Button } from '../../components/Button';
import { Modal, ModalHeader } from '../../components/Modal';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { FormField, Input, PasswordInput } from '../../components/FormField';

export function AdminEmployeesPage() {
  const { employees, addEmployee, removeEmployee, updateEmployee, currentUser } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteError, setDeleteError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const empty = { name: '', email: '', cpf: '', password: '', confirmPassword: '' };
  const [formData, setFormData] = useState(empty);
  const [formError, setFormError] = useState('');
  const [editData, setEditData] = useState({ nome: '', email: '', password: '', confirmPassword: '' });
  const [editError, setEditError] = useState('');
  const [saving, setSaving] = useState(false);
  const set = (key) => (e) => setFormData({ ...formData, [key]: e.target.value });
  const setEdit = (key) => (e) => setEditData({ ...editData, [key]: e.target.value });

  const isOwn = selected && currentUser && selected.id === currentUser.id;

  useEffect(() => {
    if (selected) {
      setEditData({ nome: selected.nome ?? selected.name ?? '', email: selected.email ?? '', password: '', confirmPassword: '' });
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
      await addEmployee({ name: formData.name, email: formData.email, cpf: formData.cpf, password: formData.password });
      setFormData(empty);
      setShowForm(false);
    } catch {
      setFormError('Não foi possível cadastrar o funcionário. Tente novamente.');
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (editData.password && editData.password !== editData.confirmPassword) {
      setEditError('As senhas não coincidem. Verifique e tente novamente.');
      return;
    }
    setSaving(true);
    setEditError('');
    try {
      await updateEmployee(selected.id, { name: editData.nome, email: editData.email, password: editData.password || undefined });
      setSelected(null);
    } catch {
      setEditError('Não foi possível salvar as alterações. Tente novamente.');
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
              <>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-[var(--blue-main)] flex-shrink-0" />
                    <div>
                      <p className="text-xs text-[var(--blue-dark)]/50">Nome</p>
                      <p className="text-sm font-medium text-[var(--blue-dark)]">{selected.nome ?? selected.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-[var(--blue-main)] flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-[var(--blue-dark)]/50">E-mail</p>
                      <p className="text-sm font-medium text-[var(--blue-dark)] break-all">{selected.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <CreditCard className="w-5 h-5 text-[var(--blue-main)] flex-shrink-0" />
                    <div>
                      <p className="text-xs text-[var(--blue-dark)]/50">CPF</p>
                      <p className="text-sm font-medium text-[var(--blue-dark)]">{selected.cpf ?? '—'}</p>
                    </div>
                  </div>
                </div>
                {deleteError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-800 text-sm">{deleteError}</p>
                  </div>
                )}
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-center gap-2 !bg-red-50 !text-red-600 hover:!bg-red-100"
                  onClick={() => setConfirmDelete(true)}
                >
                  <Trash2 className="w-4 h-4" /> Remover Funcionário
                </Button>
              </>
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
        {employees.map((employee) => {
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
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
