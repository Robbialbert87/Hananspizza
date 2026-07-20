import { Head, useForm, router } from '@inertiajs/react';
import { FolderTree, Plus, Search, Edit, Trash2, X, Save } from 'lucide-react';
import { useState } from 'react';

interface Category { id: number; name: string; slug: string; icon: string | null; }

const emptyForm = { name: '', icon: '' };

export default function Categories({ categories }: { categories: Category[] }) {
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<Category | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm(emptyForm);

    const filtered = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

    const openCreate = () => { setEditingItem(null); reset(); setShowModal(true); };
    const openEdit = (item: Category) => {
        setEditingItem(item);
        setData({ name: item.name, icon: item.icon || '' });
        setShowModal(true);
    };
    const closeModal = () => { setShowModal(false); setEditingItem(null); reset(); };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            put(`/admin/categories/${editingItem.id}`, { onSuccess: () => closeModal() });
        } else {
            post('/admin/categories', { onSuccess: () => closeModal() });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus kategori ini?')) {
            router.delete(`/admin/categories/${id}`);
        }
    };

    return (
        <>
            <Head title="Categories" />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
                <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 font-['Playfair_Display',serif]">Categories</h1>
                            <p className="text-sm text-slate-500 mt-1">Kelola kategori menu Hanan's Pizza</p>
                        </div>
                        <button onClick={openCreate} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm shadow-lg shadow-amber-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                            <Plus className="w-4 h-4" /> Add Category
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100">
                            <div className="relative w-full sm:w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input type="text" placeholder="Search categories..." value={search} onChange={e => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-50">
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Icon</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Slug</th>
                                        <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filtered.map(cat => (
                                        <tr key={cat.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 text-2xl">{cat.icon || '📁'}</td>
                                            <td className="px-6 py-4">
                                                <span className="font-medium text-slate-900">{cat.name}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-500">{cat.slug}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => openEdit(cat)} className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"><Edit className="w-4 h-4" /></button>
                                                    <button onClick={() => handleDelete(cat.id)} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {filtered.length === 0 && (
                            <div className="text-center py-16">
                                <FolderTree className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                <p className="text-slate-500 font-medium">No categories found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={closeModal}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h2 className="text-lg font-bold text-slate-900">{editingItem ? 'Edit Category' : 'Add Category'}</h2>
                            <button onClick={closeModal} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} placeholder="e.g. Pizza, Minuman" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Icon (emoji)</label>
                                <input type="text" value={data.icon} onChange={e => setData('icon', e.target.value)} placeholder="e.g. 🍕, 🥤, 🍟" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                                {errors.icon && <p className="text-red-500 text-xs mt-1">{errors.icon}</p>}
                            </div>
                            <div className="flex items-center gap-3 pt-4">
                                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">Cancel</button>
                                <button type="submit" disabled={processing} className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold shadow-lg shadow-amber-500/25 hover:shadow-xl disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                                    <Save className="w-4 h-4" /> {editingItem ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
