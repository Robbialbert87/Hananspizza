import { Head, useForm, router } from '@inertiajs/react';
import { Pizza, Plus, Search, Edit, Trash2, Grid, List, X, Save, Upload, LinkIcon } from 'lucide-react';
import { useState, useRef } from 'react';

const categoryColors: Record<string, string> = {
    pizza: 'bg-amber-50 text-amber-700 border border-amber-200',
    minuman: 'bg-blue-50 text-blue-700 border border-blue-200',
    snack: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    dessert: 'bg-purple-50 text-purple-700 border border-purple-200',
};

const formatPrice = (price: number) => `Rp ${price.toLocaleString('id-ID')}`;

interface MenuItem {
    id: number;
    name: string;
    description: string | null;
    category: string;
    price: number;
    old_price: number;
    image: string | null;
    badge: string | null;
    rating: number;
    reviews: number;
    is_active: boolean;
}

const emptyForm = { name: '', description: '', category: 'pizza', price: 0, old_price: 0, image: '', badge: '', is_active: true, image_file: null as any, gofood_link: '', grabfood_link: '', shopeefood_link: '', whatsapp_link: '' };

export default function Menu({ menuItems }: { menuItems: MenuItem[] }) {
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [imageMode, setImageMode] = useState<'url' | 'upload'>('url');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm(emptyForm);

    const filters = [
        { key: 'all', label: 'All Items', count: menuItems.length },
        { key: 'pizza', label: 'Pizza', count: menuItems.filter(i => i.category === 'pizza').length },
        { key: 'minuman', label: 'Minuman', count: menuItems.filter(i => i.category === 'minuman').length },
        { key: 'snack', label: 'Snack', count: menuItems.filter(i => i.category === 'snack').length },
        { key: 'dessert', label: 'Dessert', count: menuItems.filter(i => i.category === 'dessert').length },
    ];

    const filtered = menuItems
        .filter(i => activeFilter === 'all' || i.category === activeFilter)
        .filter(i => i.name.toLowerCase().includes(search.toLowerCase()));

    const openCreate = () => {
        setEditingItem(null);
        reset();
        setImageMode('url');
        setImagePreview(null);
        setSubmitError(null);
        setShowModal(true);
    };

    const normalizeWa = (link: string) => {
        if (!link) return '';
        const match = link.match(/wa\.me\/(\d+)/);
        return match ? match[1] : link;
    };

    const openEdit = (item: MenuItem) => {
        setEditingItem(item);
        setSubmitError(null);
        setData({
            name: item.name,
            description: item.description || '',
            category: item.category,
            price: item.price,
            old_price: item.old_price || 0,
            image: item.image || '',
            badge: item.badge || '',
            is_active: item.is_active,
            gofood_link: (item as any).gofood_link || '',
            grabfood_link: (item as any).grabfood_link || '',
            shopeefood_link: (item as any).shopeefood_link || '',
            whatsapp_link: normalizeWa((item as any).whatsapp_link || ''),
        });
        const isUpload = item.image && !item.image.startsWith('http');
        setImageMode(isUpload ? 'upload' : 'url');
        setImagePreview(item.image ? (isUpload ? `/storage/${item.image}` : item.image) : null);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingItem(null);
        setImagePreview(null);
        setSubmitError(null);
        reset();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image_file', file as any);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleUrlChange = (url: string) => {
        setData('image', url);
        setImagePreview(url || null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);
        const url = editingItem ? `/admin/menu/${editingItem.id}` : '/admin/menu';
        const cb = {
            onSuccess: () => closeModal(),
            onError: (errs: Record<string, string>) => {
                const msgs = Object.values(errs).filter(Boolean).join(', ');
                setSubmitError(msgs || 'Validation failed');
            },
        };
        const waLink = data.whatsapp_link
            ? (data.whatsapp_link.startsWith('http') ? data.whatsapp_link : `https://wa.me/${data.whatsapp_link.replace(/[^0-9]/g, '')}`)
            : '';

        const payload = { ...data, whatsapp_link: waLink };

        if (imageMode === 'upload' && data.image_file instanceof File) {
            const fd = new FormData();
            fd.append('name', payload.name);
            fd.append('description', payload.description || '');
            fd.append('category', payload.category);
            fd.append('price', String(payload.price));
            fd.append('old_price', String(payload.old_price));
            if (payload.badge) fd.append('badge', payload.badge);
            fd.append('is_active', payload.is_active ? '1' : '0');
            fd.append('gofood_link', payload.gofood_link || '');
            fd.append('grabfood_link', payload.grabfood_link || '');
            fd.append('shopeefood_link', payload.shopeefood_link || '');
            fd.append('whatsapp_link', payload.whatsapp_link);
            fd.append('image', '');
            fd.append('image_file', data.image_file);
            if (editingItem) fd.append('_method', 'put');
            router.post(url, fd, cb);
        } else {
            setData('image_file', null as any);
            if (editingItem) {
                put(`/admin/menu/${editingItem.id}`, { ...payload, whatsapp_link: waLink, _method: undefined }, cb);
            } else {
                post('/admin/menu', { ...payload, whatsapp_link: waLink }, cb);
            }
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus menu ini?')) {
            router.delete(`/admin/menu/${id}`);
        }
    };

    const getImageSrc = (item: MenuItem) => {
        if (!item.image) return null;
        if (item.image.startsWith('http')) return item.image;
        return `/storage/${item.image}`;
    };

    return (
        <>
            <Head title="Menu Items" />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
                <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 font-['Playfair_Display',serif]">Menu Items</h1>
                            <p className="text-sm text-slate-500 mt-1">Kelola semua menu Hanan's Pizza</p>
                        </div>
                        <button onClick={openCreate} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm shadow-lg shadow-amber-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                            <Plus className="w-4 h-4" /> Add Menu Item
                        </button>
                    </div>

                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
                            {filters.map(f => (
                                <button key={f.key} onClick={() => setActiveFilter(f.key)}
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeFilter === f.key ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'}`}>
                                    {f.label}
                                    <span className={`px-1.5 py-0.5 rounded-md text-xs font-semibold ${activeFilter === f.key ? 'bg-white/20' : 'bg-slate-100'}`}>{f.count}</span>
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            <div className="relative flex-1 lg:w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input type="text" placeholder="Search menu..." value={search} onChange={e => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                            </div>
                            <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden">
                                <button onClick={() => setViewMode('grid')} className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-slate-900 text-white' : 'text-slate-400'}`}><Grid className="w-4 h-4" /></button>
                                <button onClick={() => setViewMode('list')} className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-slate-900 text-white' : 'text-slate-400'}`}><List className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </div>

                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {filtered.map(item => (
                                <div key={item.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="relative h-48 overflow-hidden bg-slate-100">
                                        {getImageSrc(item) ? <img src={getImageSrc(item)!} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /> : <div className="w-full h-full flex items-center justify-center"><Pizza className="w-12 h-12 text-slate-300" /></div>}
                                        <div className="absolute top-3 left-3"><span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${categoryColors[item.category] || ''}`}>{item.category}</span></div>
                                        <div className="absolute top-3 right-3"><span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${item.is_active ? 'bg-emerald-500 text-white' : 'bg-slate-400 text-white'}`}>{item.is_active ? 'Active' : 'Inactive'}</span></div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-semibold text-slate-900 text-lg mb-1">{item.name}</h3>
                                        <p className="text-amber-600 font-bold text-xl font-['Playfair_Display',serif]">{formatPrice(item.price)}</p>
                                        <div className="flex items-center gap-2 mt-4">
                                            <button onClick={() => openEdit(item)} className="flex-1 px-3 py-2 rounded-lg bg-slate-50 text-slate-600 text-sm font-medium hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5"><Edit className="w-3.5 h-3.5" /> Edit</button>
                                            <button onClick={() => handleDelete(item.id)} className="px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <div className="col-span-5">Item</div><div className="col-span-2">Category</div><div className="col-span-2">Price</div><div className="col-span-1">Status</div><div className="col-span-2 text-right">Actions</div>
                            </div>
                            {filtered.map(item => (
                                <div key={item.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                    <div className="col-span-5 flex items-center gap-3">
                                        {getImageSrc(item) ? <img src={getImageSrc(item)!} alt={item.name} className="w-10 h-10 rounded-lg object-cover" /> : <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center"><Pizza className="w-5 h-5 text-slate-400" /></div>}
                                        <span className="font-medium text-slate-900">{item.name}</span>
                                    </div>
                                    <div className="col-span-2"><span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${categoryColors[item.category] || ''}`}>{item.category}</span></div>
                                    <div className="col-span-2 font-semibold text-slate-900">{formatPrice(item.price)}</div>
                                    <div className="col-span-1"><span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${item.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{item.is_active ? 'Active' : 'Inactive'}</span></div>
                                    <div className="col-span-2 flex items-center justify-end gap-1">
                                        <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"><Edit className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {filtered.length === 0 && <div className="text-center py-16"><Pizza className="w-12 h-12 text-slate-300 mx-auto mb-3" /><p className="text-slate-500 font-medium">No menu items found</p></div>}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={closeModal}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h2 className="text-lg font-bold text-slate-900">{editingItem ? 'Edit Menu Item' : 'Add Menu Item'}</h2>
                            <button onClick={closeModal} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {submitError && (
                                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2">
                                    <X className="w-4 h-4 mt-0.5 shrink-0" />
                                    <span>{submitError}</span>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
                                    <select value={data.category} onChange={e => setData('category', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400">
                                        <option value="pizza">Pizza</option><option value="minuman">Minuman</option><option value="snack">Snack</option><option value="dessert">Dessert</option>
                                    </select>
                                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Badge</label>
                                    <select value={data.badge} onChange={e => setData('badge', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400">
                                        <option value="">None</option><option value="hot">Hot</option><option value="new">New</option><option value="best">Best Seller</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Price (Rp) *</label>
                                    <input type="number" value={data.price || ''} onChange={e => setData('price', e.target.value === '' ? 0 : parseInt(e.target.value) || 0)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Old Price (Rp)</label>
                                    <input type="number" value={data.old_price || ''} onChange={e => setData('old_price', e.target.value === '' ? 0 : parseInt(e.target.value) || 0)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Image</label>
                                <div className="flex items-center bg-slate-100 rounded-xl p-1 mb-3">
                                    <button type="button" onClick={() => { setImageMode('url'); setData('image', ''); setImagePreview(null); }}
                                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${imageMode === 'url' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                                        <LinkIcon className="w-4 h-4" /> URL
                                    </button>
                                    <button type="button" onClick={() => { setImageMode('upload'); setData('image', ''); setImagePreview(null); }}
                                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${imageMode === 'upload' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                                        <Upload className="w-4 h-4" /> Upload File
                                    </button>
                                </div>
                                {imageMode === 'url' ? (
                                    <input type="url" value={data.image} onChange={e => handleUrlChange(e.target.value)} placeholder="https://example.com/image.jpg" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                                ) : (
                                    <div className="relative">
                                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                        <button type="button" onClick={() => fileInputRef.current?.click()}
                                            className="w-full px-4 py-8 rounded-xl border-2 border-dashed border-slate-200 bg-white text-sm hover:border-amber-400 hover:bg-amber-50/30 transition-all flex flex-col items-center justify-center gap-2 min-h-[140px]">
                                            {imagePreview ? (
                                                <>
                                                    <img src={imagePreview} alt="Preview" className="h-20 w-auto rounded-lg object-cover border border-slate-200" />
                                                    <span className="text-slate-500 text-xs">Klik untuk ganti gambar</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="w-8 h-8 text-slate-400" />
                                                    <span className="text-slate-600 font-medium">Klik untuk upload gambar</span>
                                                    <span className="text-slate-400 text-xs">JPG, PNG, WebP (Maks 2MB)</span>
                                                </>
                                            )}
                                        </button>
                                        {imagePreview && (
                                            <button type="button" onClick={() => { setImagePreview(null); setData('image', ''); setData('image_file', null as any); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                                                className="absolute -top-2.5 -right-2.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 text-xs">
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="border-t border-slate-100 pt-4">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Order Links</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">🍔 GoFood Link</label>
                                        <input type="url" value={data.gofood_link} onChange={e => setData('gofood_link', e.target.value)} placeholder="https://gofood.co.id/..." className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">🛵 GrabFood Link</label>
                                        <input type="url" value={data.grabfood_link} onChange={e => setData('grabfood_link', e.target.value)} placeholder="https://food.grab.com/..." className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">🛍️ ShopeeFood Link</label>
                                        <input type="url" value={data.shopeefood_link} onChange={e => setData('shopeefood_link', e.target.value)} placeholder="https://shopeefood.co.id/..." className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">💬 WhatsApp</label>
                                        <input type="tel" value={data.whatsapp_link} onChange={e => setData('whatsapp_link', e.target.value)} placeholder="6281234567890" className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500" />
                                <label className="text-sm font-medium text-slate-700">Active</label>
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
