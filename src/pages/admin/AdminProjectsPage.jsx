import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, AlertCircle, Pencil, Trash2 } from 'lucide-react';
import { AdminPageHeader } from '../../components/AdminPageHeader';
import { Button } from '../../components/Button';
import { Modal, ModalHeader } from '../../components/Modal';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { FormField, Input, Select, Textarea } from '../../components/FormField';

export function AdminProjectsPage() {
  const { projects, addProject, updateProject, removeProject, loadingProjects } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [categorias] = useState([
    { id: 5, nome: 'Residencial' },
    { id: 6, nome: 'Comercial' },
    { id: 7, nome: 'Corporativo' },
  ]);
  const empty = { name: '', description: '', materials: '', location: '', image: '', imageFile: null, categoryId: '', dataProjeto: '' };
  const [formData, setFormData] = useState(empty);
  const [formError, setFormError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const set = (key) => (e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }));

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setFormData((prev) => ({ ...prev, image: url, imageFile: file }));
  };

  const openAdd = () => {
    setEditingProject(null);
    setFormData(empty);
    setImagePreview('');
    setFormError('');
    setShowForm(true);
  };

  const openEdit = (project) => {
    setEditingProject(project);
    setFormData({ name: project.name, description: project.description, materials: project.materials, location: project.location || '', image: project.image, imageFile: null, categoryId: project.categoryId ?? '', dataProjeto: project.dataProjeto || '' });
    setImagePreview(project.image);
    setFormError('');
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      const payload = {
        titulo: formData.name,
        descricao: formData.description,
        localizacao: formData.location,
        materiaisUtilizados: formData.materials,
        dataProjeto: formData.dataProjeto,
        categoriaId: formData.categoryId,
        file: formData.imageFile,
      };
      if (editingProject) {
        await updateProject(editingProject.id, payload);
      } else {
        await addProject(payload);
      }
      setShowForm(false);
    } catch {
      setFormError('Não foi possível salvar o projeto. Tente novamente.');
    }
  };

  const handleDelete = async () => {
    try {
      await removeProject(confirmDelete.id);
      setConfirmDelete(null);
    } catch {
      setFormError('Não foi possível remover o projeto. Tente novamente.');
    }
  };

  const handleCloseForm = () => { setShowForm(false); setFormError(''); setImagePreview(''); };

  if (loadingProjects) {
    return (
      <div className="p-8 flex items-center justify-center">
        <p className="text-[var(--blue-dark)]/60">Carregando projetos...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <AdminPageHeader title="Projetos" subtitle="Gerencie os projetos do portfólio" />
        <Button onClick={openAdd} className="flex items-center gap-2">
          <Plus className="w-5 h-5" /> Adicionar Projeto
        </Button>
      </div>

      {showForm && (
        <Modal onClose={handleCloseForm}>
          <ModalHeader title={editingProject ? 'Editar Projeto' : 'Novo Projeto'} onClose={handleCloseForm} />
          <form onSubmit={handleSubmit} className="p-6">
            {formError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm">{formError}</p>
              </div>
            )}
            <FormField label="Nome do Projeto *">
              <Input type="text" required value={formData.name} onChange={set('name')} placeholder="Ex: Residência Alphaville" />
            </FormField>
            <FormField label="Categoria *">
              <Select required value={formData.categoryId} onChange={set('categoryId')}>
                <option value="">Selecione uma categoria</option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </Select>
            </FormField>
            <FormField label="Descrição *">
              <Textarea required value={formData.description} onChange={set('description')} rows={4} placeholder="Descreva o projeto..." />
            </FormField>
            <FormField label="Materiais Utilizados *">
              <Input type="text" required value={formData.materials} onChange={set('materials')} placeholder="Ex: Alumínio anodizado, vidro temperado 8mm" />
            </FormField>
            <FormField label="Localização *">
              <Input type="text" required value={formData.location} onChange={set('location')} placeholder="Ex: São Paulo, SP" />
            </FormField>
            <FormField label="Data do Projeto *">
              <Input type="datetime-local" required value={formData.dataProjeto} onChange={set('dataProjeto')} />
            </FormField>
            <FormField label={editingProject ? 'Imagem (deixe em branco para manter)' : 'Imagem *'} last>
              <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-[var(--border)] rounded-lg cursor-pointer hover:border-[var(--blue-main)] transition-colors bg-gray-50 overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-[var(--blue-dark)]/50">
                    <span className="text-3xl">+</span>
                    <span className="text-sm">Clique para selecionar uma imagem</span>
                  </div>
                )}
                <input type="file" accept="image/*" required={!editingProject && !formData.image} onChange={handleImage} className="hidden" />
              </label>
            </FormField>
            <div className="flex gap-4">
              <Button type="button" variant="outline" className="flex-1" onClick={handleCloseForm}>Cancelar</Button>
              <Button type="submit" className="flex-1">{editingProject ? 'Salvar Alterações' : 'Salvar Projeto'}</Button>
            </div>
          </form>
        </Modal>
      )}

      {confirmDelete && (
        <ConfirmDialog
          title="Excluir projeto?"
          message={`Tem certeza que deseja excluir "${confirmDelete.name}"? Esta ação não poderá ser desfeita.`}
          confirmLabel="Excluir"
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      <div className="bg-white rounded-xl border border-[var(--border)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--blue-light)] border-b border-[var(--border)]">
              <tr>
                {['Projeto', 'Categoria', 'Localização', 'Materiais', 'Ações'].map((h) => (
                  <th key={h} className="text-left px-6 py-4 text-[var(--blue-dark)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={project.image} alt={project.name} className="w-12 h-12 object-cover rounded-lg" />
                      <span className="font-medium text-[var(--blue-dark)]">{project.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[var(--blue-dark)]/70">{project.category}</td>
                  <td className="px-6 py-4 text-[var(--blue-dark)]/70">{project.location || '-'}</td>
                  <td className="px-6 py-4 text-[var(--blue-dark)]/70 text-sm max-w-xs truncate">{project.materials}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(project)}
                        className="p-2 rounded-lg hover:bg-[var(--blue-light)] text-[var(--blue-main)] transition-colors"
                        title="Editar"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setConfirmDelete(project)}
                        className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
