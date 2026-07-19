import { Head, useForm, router } from '@inertiajs/react';
import { Users, Search, Plus, Mail, Phone, ShoppingBag, DollarSign, Eye, Edit, Trash2, Star, UserPlus, X, Save } from 'lucide-react';
import { useState } from 'react';

const formatPrice = (price: number) => `Rp ${price.toLocaleString('id-ID')}`;

interface Customer { id: number; name: string; email: string; phone: string | null; total_orders: number; total_spent: number; created_at: string; }

const emptyForm = { name: '', email: '', phone: '' };

export default function Customers({ customers }: { customers: Customer[] }) {
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<Customer | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm(emptyForm);

    const filtered = customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

    const totalSpent = customers.reduce((sum, c) => sum + c.total_spent, 0);
    const avgSpent = customers.length ? totalSpent / customers.length : 0;
    const topCustomer = customers.length ? customers.reduce((max, c) => c.total_spent > max.total_spent ? c : max, customers[0]) : null;

    const openCreate = () => { setEditingItem(null); reset(); setShowModal(true); };
    const openEdit = (item: Customer) => {
        setEditingItem(item);
        setData({ name: item.name, email: item.email, phone: item.phone || '' });
        setShowModal(true);
    };
    const closeModal = () => { setShowModal(false); setEditingItem(null); reset(); };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            put(`/admin/customers/${editingItem.id}`, { onSuccess: () => closeModal() });
        } else {
            post('/admin/customers', { onSuccess: () => closeModal() });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus customer ini?')) {
            router.delete(`/admin/customers/${id}`);
        }
    };

    return (
        <>
            <Head title="Customers" />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
                <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 font-['Playfair_Display',serif]">Customers</h1>
                            <p className="text-sm text-slate-500 mt-1">Kelola data pelanggan Hanan's Pizza</p>
                        </div>
                        <button onClick={openCreate} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm shadow-lg shadow-amber-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                            <UserPlus className="w-4 h-4" /> Add Customer
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 mb-8">
                        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20"><Users className="w-6 h-6 text-white" /></div>
                                <div><p className="text-sm text-slate-500">Total Customers</p><p className="text-2xl font-bold text-slate-900 font-['Playfair_Display',serif]">{customers.length}</p></div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20"><DollarSign className="w-6 h-6 text-white" /></div>
                                <div><p className="text-sm text-slate-500">Total Revenue</p><p className="text-2xl font-bold text-slate-900 font-['Playfair_Display',serif]">{formatPrice(totalSpent)}</p></div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20"><Star className="w-6 h-6 text-white" /></div>
                                <div><p className="text-sm text-slate-500">Avg. Spent</p><p className="text-2xl font-bold text-slate-900 font-['Playfair_Display',serif]">{formatPrice(Math.round(avgSpent))}</p></div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20"><Star className="w-6 h-6 text-white" /></div>
                                <div><p className="text-sm text-slate-500">Top Customer</p><p className="text-lg font-bold text-slate-900 font-['Playfair_Display',serif] truncate">{topCustomer?.name || '-'}</p></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="text" placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <div className="col-span-3">Customer</div><div className="col-span-3">Contact</div><div className="col-span-2">Orders</div><div className="col-span-2">Total Spent</div><div className="col-span-1">Joined</div><div className="col-span-1 text-right">Actions</div>
                        </div>
                        {filtered.map(customer => (
                            <div key={customer.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                <div className="col-span-3 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                                        {customer.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">{customer.name}</p>
                                        <p className="text-xs text-slate-400">ID: #{customer.id.toString().padStart(3, '0')}</p>
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <div className="flex items-center gap-1.5 text-sm text-slate-600 mb-0.5"><Mail className="w-3.5 h-3.5 text-slate-400" /> {customer.email}</div>
                                    <div className="flex items-center gap-1.5 text-sm text-slate-600"><Phone className="w-3.5 h-3.5 text-slate-400" /> {customer.phone || '-'}</div>
                                </div>
                                <div className="col-span-2"><div className="flex items-center gap-1.5 text-sm"><ShoppingBag className="w-3.5 h-3.5 text-slate-400" /><span className="font-semibold text-slate-900">{customer.total_orders}</span><span className="text-slate-400">orders</span></div></div>
                                <div className="col-span-2 font-bold text-slate-900">{formatPrice(customer.total_spent)}</div>
                                <div className="col-span-1 text-sm text-slate-500">{new Date(customer.created_at).toLocaleDateString('id-ID')}</div>
                                <div className="col-span-1 flex items-center justify-end gap-1">
                                    <button onClick={() => openEdit(customer)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"><Edit className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete(customer.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {filtered.length === 0 && <div className="text-center py-16"><Users className="w-12 h-12 text-slate-300 mx-auto mb-3" /><p className="text-slate-500 font-medium">No customers found</p></div>}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={closeModal}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h2 className="text-lg font-bold text-slate-900">{editingItem ? 'Edit Customer' : 'Add Customer'}</h2>
                            <button onClick={closeModal} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                                <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                                <input type="text" value={data.phone} onChange={e => setData('phone', e.target.value)} placeholder="081234567890" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
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
