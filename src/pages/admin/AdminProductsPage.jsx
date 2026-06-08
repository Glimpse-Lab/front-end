import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, AlertCircle, Pencil, Trash2 } from 'lucide-react';
import { AdminPageHeader } from '../../components/AdminPageHeader';
import { Button } from '../../components/Button';
import { Modal, ModalHeader } from '../../components/Modal';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { FormField, Input, Select, Textarea } from '../../components/FormField';

// Mapeamento auxiliar para converter IDs do Back-end em Textos e vice-versa
const categoriasMapToId = { 'Janelas': 1, 'Portas': 2, 'Sistemas': 3, 'Acessórios': 4 };
const categoriasMapToText = { 1: 'Janelas', 2: 'Portas', 3: 'Sistemas', 4: 'Acessórios' };

export function AdminProductsPage() {
  const { products, addProduct, updateProduct, removeProduct, loadingProducts } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [categorias] = useState([
    { id: 1, nome: 'Janelas' },
    { id: 2, nome: 'Portas' },
    { id: 3, nome: 'Sistemas' },
    { id: 4, nome: 'Acessórios' },
  ]);
  const empty = { name: '', categoryId: '', description: '', specifications: '', image: '', imageFile: null, preco: '', quantidadeEstoque: '' };
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
    setEditingProduct(null);
    setFormData(empty);
    setImagePreview('');
    setFormError('');
    setShowForm(true);
  };

const openEdit = (product) => {
    setEditingProduct(product);
    setFormData({ name: product.name, categoryId: product.categoryId ?? '', description: product.description, specifications: product.specifications, image: product.image, imageFile: null, preco: product.preco ?? '', quantidadeEstoque: product.quantidadeEstoque ?? '' });
    setImagePreview(product.image);
    setFormError('');
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      const payload = {
        nome: formData.name,
        descricao: formData.description,
        preco: formData.preco,
        quantidadeEstoque: formData.quantidadeEstoque,
        especificacaoTecnica: formData.specifications,
        categoriaId: formData.categoryId,
        file: formData.imageFile,
      };
      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
      } else {
        await addProduct(payload);
      }
      setShowForm(false);
    } catch (err) {
      console.error(err);
      setFormError('Não foi possível salvar o produto. Verifique se as categorias estão cadastradas no banco.');
    }
  };

  const handleDelete = async () => {
    try {
      await removeProduct(confirmDelete.id);
      setConfirmDelete(null);
    } catch {
      setFormError('Não foi possível remover o produto. Tente novamente.');
    }
  };

  const handleCloseForm = () => { setShowForm(false); setFormError(''); setImagePreview(''); };

  if (loadingProducts) {
    return (
      <div className="p-8 flex items-center justify-center">
        <p className="text-[var(--blue-dark)]/60">Carregando produtos...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <AdminPageHeader title="Produtos" subtitle="Gerencie o catálogo de produtos" />
        <Button onClick={openAdd} className="flex items-center gap-2">
          <Plus className="w-5 h-5" /> Adicionar Produto
        </Button>
      </div>

      {showForm && (
        <Modal onClose={handleCloseForm}>
          <ModalHeader title={editingProduct ? 'Editar Produto' : 'Novo Produto'} onClose={handleCloseForm} />
          <form onSubmit={handleSubmit} className="p-6">
            {formError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm">{formError}</p>
              </div>
            )}
            <FormField label="Nome do Produto *">
              <Input type="text" required value={formData.name} onChange={set('name')} placeholder="Ex: Janela Maxim-ar" />
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
              <Textarea required value={formData.description} onChange={set('description')} rows={3} placeholder="Descreva o produto..." />
            </FormField>
            <FormField label="Especificações Técnicas *">
              <Textarea required value={formData.specifications} onChange={set('specifications')} rows={3} placeholder="Ex: Dimensões, material, acabamentos disponíveis..." />
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Preço (R$) *">
                <Input type="number" step="0.01" min="0" required value={formData.preco} onChange={set('preco')} placeholder="Ex: 1250.50" />
              </FormField>
              <FormField label="Qtd. em Estoque *">
                <Input type="number" min="0" required value={formData.quantidadeEstoque} onChange={set('quantidadeEstoque')} placeholder="Ex: 15" />
              </FormField>
            </div>
            <FormField label={editingProduct ? 'Imagem (deixe em branco para manter)' : 'Imagem *'} last>
              <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-[var(--border)] rounded-lg cursor-pointer hover:border-[var(--blue-main)] transition-colors bg-gray-50 overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-[var(--blue-dark)]/50">
                    <span className="text-3xl">+</span>
                    <span className="text-sm">Clique para selecionar uma imagem</span>
                  </div>
                )}
                <input type="file" accept="image/*" required={!editingProduct && !formData.image} onChange={handleImage} className="hidden" />
              </label>
            </FormField>
            <div className="flex gap-4">
              <Button type="button" variant="outline" className="flex-1" onClick={handleCloseForm}>Cancelar</Button>
              <Button type="submit" className="flex-1">{editingProduct ? 'Salvar Alterações' : 'Salvar Produto'}</Button>
            </div>
          </form>
        </Modal>
      )}

      {confirmDelete && (
        <ConfirmDialog
          title="Excluir produto?"
          message={`Tem certeza que deseja excluir "${confirmDelete.nome}"? Esta ação não poderá ser desfeita.`}
          confirmLabel="Excluir"
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl overflow-hidden border border-[var(--border)] shadow-sm">
            <div className="h-48 bg-[var(--blue-light)] overflow-hidden">
              <img src={product.image || "https://placehold.co/150x150/EEEEEE/31343C?text=Sem+Foto"} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <div className="text-xs text-[var(--blue-main)] mb-2">{product.category}</div>
              <h3 className="font-bold text-[var(--blue-dark)] mb-2">{product.name}</h3>
              <p className="text-sm text-[var(--blue-dark)]/70 line-clamp-2 mb-3">{product.description}</p>
              <div className="text-xs text-[var(--blue-dark)]/60 line-clamp-2 mb-3">{product.specifications}</div>
              {product.preco != null && (
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-[var(--blue-dark)]">R$ {Number(product.preco).toFixed(2)}</span>
                  <span className="text-xs text-[var(--blue-dark)]/60">{product.quantidadeEstoque} em estoque</span>
                </div>
              )}
              <div className="flex gap-2 pt-3 border-t border-[var(--border)]">
                <button
                  onClick={() => openEdit(product)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-[var(--blue-light)] text-[var(--blue-main)] transition-colors text-sm"
                >
                  <Pencil className="w-4 h-4" /> Editar
                </button>
                <button
                  onClick={() => setConfirmDelete(product)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4" /> Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}