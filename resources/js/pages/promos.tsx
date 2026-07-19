import { Head, useForm, router } from '@inertiajs/react';
import { Tag, Plus, Search, Edit, Trash2, Calendar, X, Save } from 'lucide-react';
import { useState } from 'react';

const formatPrice = (price: string) => price;

interface Promo { id: number; title: string; description: string | null; discount: string; is_active: boolean; start_date: string; end_date: string; }

const emptyForm = { title: '', description: '', discount: '', is_active: true, start_date: '', end_date: '' };

export default function Promos({ promos }: { promos: Promo[] }) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<Promo | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm(emptyForm);

    const filters = [
        { key: 'all', label: 'All Promos', count: promos.length },
        { key: 'active', label: 'Active', count: promos.filter(p => p.is_active).length },
        { key: 'inactive', label: 'Inactive', count: promos.filter(p => !p.is_active).length },
    ];

    const filtered = promos
        .filter(p => statusFilter === 'all' || (statusFilter === 'active' ? p.is_active : !p.is_active))
        .filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

    const openCreate = () => { setEditingItem(null); reset(); setShowModal(true); };
    const openEdit = (item: Promo) => {
        setEditingItem(item);
        setData({ title: item.title, description: item.description || '', discount: item.discount, is_active: item.is_active, start_date: item.start_date?.split('T')[0] || '', end_date: item.end_date?.split('T')[0] || '' });
        setShowModal(true);
    };
    const closeModal = () => { setShowModal(false); setEditingItem(null); reset(); };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            put(`/admin/promos/${editingItem.id}`, { onSuccess: () => closeModal() });
        } else {
            post('/admin/promos', { onSuccess: () => closeModal() });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus promo ini?')) {
            router.delete(`/admin/promos/${id}`);
        }
    };

    return (
        <>
            <Head title="Promotions" />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
                <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 font-['Playfair_Display',serif]">Promotions</h1>
                            <p className="text-sm text-slate-500 mt-1">Kelola promo dan diskon Hanan's Pizza</p>
                        </div>
                        <button onClick={openCreate} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm shadow-lg shadow-amber-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                            <Plus className="w-4 h-4" /> Create Promo
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-lg shadow-red-500/20"><Tag className="w-6 h-6 text-white" /></div>
                                <div><p className="text-sm text-slate-500">Active Promos</p><p className="text-2xl font-bold text-slate-900 font-['Playfair_Display',serif]">{promos.filter(p => p.is_active).length}</p></div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20"><Calendar className="w-6 h-6 text-white" /></div>
                                <div><p className="text-sm text-slate-500">Expiring Soon</p><p className="text-2xl font-bold text-slate-900 font-['Playfair_Display',serif]">{promos.filter(p => new Date(p.end_date) < new Date(Date.now() + 7 * 86400000)).length}</p></div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20"><Tag className="w-6 h-6 text-white" /></div>
                                <div><p className="text-sm text-slate-500">Total Promos</p><p className="text-2xl font-bold text-slate-900 font-['Playfair_Display',serif]">{promos.length}</p></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            {filters.map(f => (
                                <button key={f.key} onClick={() => setStatusFilter(f.key)}
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${statusFilter === f.key ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'}`}>
                                    {f.label} <span className={`px-1.5 py-0.5 rounded-md text-xs font-semibold ${statusFilter === f.key ? 'bg-white/20' : 'bg-slate-100'}`}>{f.count}</span>
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full lg:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="text" placeholder="Search promos..." value={search} onChange={e => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {filtered.map(promo => (
                            <div key={promo.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="relative h-32 bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-center overflow-hidden">
                                    <div className="relative z-10 text-center">
                                        <p className="text-3xl font-bold text-amber-400 font-['Playfair_Display',serif]">{promo.discount}</p>
                                        <p className="text-white/60 text-sm">Discount</p>
                                    </div>
                                    <div className="absolute top-3 right-3"><span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${promo.is_active ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'}`}>{promo.is_active ? 'Active' : 'Inactive'}</span></div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-slate-900 text-lg mb-2">{promo.title}</h3>
                                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">{promo.description}</p>
                                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                                        <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /><span>{promo.start_date?.split('T')[0]}</span></div>
                                        <span>-</span>
                                        <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /><span>{promo.end_date?.split('T')[0]}</span></div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => openEdit(promo)} className="flex-1 px-3 py-2 rounded-lg bg-slate-50 text-slate-600 text-sm font-medium hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5"><Edit className="w-3.5 h-3.5" /> Edit</button>
                                        <button onClick={() => handleDelete(promo.id)} className="px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {filtered.length === 0 && <div className="text-center py-16"><Tag className="w-12 h-12 text-slate-300 mx-auto mb-3" /><p className="text-slate-500 font-medium">No promos found</p></div>}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={closeModal}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h2 className="text-lg font-bold text-slate-900">{editingItem ? 'Edit Promo' : 'Create Promo'}</h2>
                            <button onClick={closeModal} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                                <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Discount *</label>
                                    <input type="text" value={data.discount} onChange={e => setData('discount', e.target.value)} placeholder="e.g. 50%, Rp 100.000" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                                    {errors.discount && <p className="text-red-500 text-xs mt-1">{errors.discount}</p>}
                                </div>
                                <div className="flex items-center gap-2 pt-6">
                                    <input type="checkbox" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500" />
                                    <label className="text-sm font-medium text-slate-700">Active</label>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Start Date *</label>
                                    <input type="date" value={data.start_date} onChange={e => setData('start_date', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                                    {errors.start_date && <p className="text-red-500 text-xs mt-1">{errors.start_date}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">End Date *</label>
                                    <input type="date" value={data.end_date} onChange={e => setData('end_date', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                                    {errors.end_date && <p className="text-red-500 text-xs mt-1">{errors.end_date}</p>}
                                </div>
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
