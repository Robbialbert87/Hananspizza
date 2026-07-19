import { Head, useForm, router } from '@inertiajs/react';
import { ClipboardList, Search, Plus, Eye, Edit, Trash2, Clock, CheckCircle, XCircle, Truck, DollarSign, Package, X, Save } from 'lucide-react';
import { useState } from 'react';

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
    delivered: { label: 'Delivered', color: 'bg-emerald-50 text-emerald-700 border border-emerald-200', icon: CheckCircle },
    processing: { label: 'Processing', color: 'bg-blue-50 text-blue-700 border border-blue-200', icon: Truck },
    pending: { label: 'Pending', color: 'bg-amber-50 text-amber-700 border border-amber-200', icon: Clock },
    cancelled: { label: 'Cancelled', color: 'bg-red-50 text-red-700 border border-red-200', icon: XCircle },
};

const platformColors: Record<string, string> = { GoFood: 'bg-emerald-500', GrabFood: 'bg-green-500', ShopeeFood: 'bg-orange-500' };
const formatPrice = (price: number) => `Rp ${price.toLocaleString('id-ID')}`;

interface Order { id: number; order_id: string; customer_name: string; items: string; total: number; status: string; platform: string | null; created_at: string; }
interface Customer { id: number; name: string; }

const emptyForm = { customer_name: '', customer_id: '', items: '', total: 0, status: 'pending', platform: 'GoFood' };

export default function Orders({ orders, customers }: { orders: Order[]; customers: Customer[] }) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [platformFilter, setPlatformFilter] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<Order | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm(emptyForm);

    const filters = [
        { key: 'all', label: 'All', count: orders.length },
        { key: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
        { key: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length },
        { key: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
        { key: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length },
    ];

    const filtered = orders
        .filter(o => statusFilter === 'all' || o.status === statusFilter)
        .filter(o => platformFilter === 'all' || o.platform === platformFilter)
        .filter(o => o.customer_name.toLowerCase().includes(search.toLowerCase()) || o.order_id.toLowerCase().includes(search.toLowerCase()));

    const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.total, 0);
    const avgOrder = orders.filter(o => o.status !== 'cancelled').length ? totalRevenue / orders.filter(o => o.status !== 'cancelled').length : 0;

    const openCreate = () => { setEditingItem(null); reset(); setShowModal(true); };
    const openEdit = (item: Order) => {
        setEditingItem(item);
        setData({ customer_name: item.customer_name, customer_id: '', items: item.items, total: item.total, status: item.status, platform: item.platform || 'GoFood' });
        setShowModal(true);
    };
    const closeModal = () => { setShowModal(false); setEditingItem(null); reset(); };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            put(`/admin/orders/${editingItem.id}`, { onSuccess: () => closeModal() });
        } else {
            post('/admin/orders', { onSuccess: () => closeModal() });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus order ini?')) {
            router.delete(`/admin/orders/${id}`);
        }
    };

    return (
        <>
            <Head title="Orders" />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
                <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 font-['Playfair_Display',serif]">Orders</h1>
                            <p className="text-sm text-slate-500 mt-1">Kelola pesanan dari semua platform</p>
                        </div>
                        <button onClick={openCreate} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm shadow-lg shadow-amber-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                            <Plus className="w-4 h-4" /> New Order
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20"><Package className="w-6 h-6 text-white" /></div>
                                <div><p className="text-sm text-slate-500">Total Orders</p><p className="text-2xl font-bold text-slate-900 font-['Playfair_Display',serif]">{orders.length}</p></div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20"><DollarSign className="w-6 h-6 text-white" /></div>
                                <div><p className="text-sm text-slate-500">Revenue</p><p className="text-2xl font-bold text-slate-900 font-['Playfair_Display',serif]">{formatPrice(totalRevenue)}</p></div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20"><Truck className="w-6 h-6 text-white" /></div>
                                <div><p className="text-sm text-slate-500">Avg. Order</p><p className="text-2xl font-bold text-slate-900 font-['Playfair_Display',serif]">{formatPrice(Math.round(avgOrder))}</p></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
                            {filters.map(f => (
                                <button key={f.key} onClick={() => setStatusFilter(f.key)}
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${statusFilter === f.key ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'}`}>
                                    {f.label} <span className={`px-1.5 py-0.5 rounded-md text-xs font-semibold ${statusFilter === f.key ? 'bg-white/20' : 'bg-slate-100'}`}>{f.count}</span>
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            <div className="relative flex-1 lg:w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input type="text" placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                            </div>
                            <select value={platformFilter} onChange={e => setPlatformFilter(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20">
                                <option value="all">All Platforms</option><option value="GoFood">GoFood</option><option value="GrabFood">GrabFood</option><option value="ShopeeFood">ShopeeFood</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <div className="col-span-2">Order ID</div><div className="col-span-2">Customer</div><div className="col-span-3">Items</div><div className="col-span-1">Total</div><div className="col-span-1">Platform</div><div className="col-span-1">Status</div><div className="col-span-1">Date</div><div className="col-span-1 text-right">Action</div>
                        </div>
                        {filtered.map(order => {
                            const status = statusConfig[order.status] || statusConfig.pending;
                            const StatusIcon = status.icon;
                            return (
                                <div key={order.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                    <div className="col-span-2 font-semibold text-slate-900">{order.order_id}</div>
                                    <div className="col-span-2 font-medium text-slate-900">{order.customer_name}</div>
                                    <div className="col-span-3 text-sm text-slate-600 truncate">{order.items}</div>
                                    <div className="col-span-1 font-bold text-slate-900">{formatPrice(order.total)}</div>
                                    <div className="col-span-1"><div className="flex items-center gap-1.5"><div className={`w-2 h-2 rounded-full ${platformColors[order.platform || ''] || 'bg-slate-400'}`}></div><span className="text-sm text-slate-600">{order.platform}</span></div></div>
                                    <div className="col-span-1"><span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${status.color}`}><StatusIcon className="w-3 h-3" />{status.label}</span></div>
                                    <div className="col-span-1 text-sm text-slate-400">{new Date(order.created_at).toLocaleDateString('id-ID')}</div>
                                    <div className="col-span-1 flex items-center justify-end gap-1">
                                        <button onClick={() => openEdit(order)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"><Edit className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete(order.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {filtered.length === 0 && <div className="text-center py-16"><ClipboardList className="w-12 h-12 text-slate-300 mx-auto mb-3" /><p className="text-slate-500 font-medium">No orders found</p></div>}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={closeModal}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h2 className="text-lg font-bold text-slate-900">{editingItem ? 'Edit Order' : 'New Order'}</h2>
                            <button onClick={closeModal} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Customer Name *</label>
                                <input type="text" value={data.customer_name} onChange={e => setData('customer_name', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                                {errors.customer_name && <p className="text-red-500 text-xs mt-1">{errors.customer_name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Items *</label>
                                <input type="text" value={data.items} onChange={e => setData('items', e.target.value)} placeholder="e.g. Pepperoni, Cheese Lovers" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                                {errors.items && <p className="text-red-500 text-xs mt-1">{errors.items}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Total (Rp) *</label>
                                    <input type="number" value={data.total} onChange={e => setData('total', parseInt(e.target.value) || 0)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                                    {errors.total && <p className="text-red-500 text-xs mt-1">{errors.total}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Status *</label>
                                    <select value={data.status} onChange={e => setData('status', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400">
                                        <option value="pending">Pending</option><option value="processing">Processing</option><option value="delivered">Delivered</option><option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Platform</label>
                                <select value={data.platform} onChange={e => setData('platform', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400">
                                    <option value="GoFood">GoFood</option><option value="GrabFood">GrabFood</option><option value="ShopeeFood">ShopeeFood</option>
                                </select>
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
