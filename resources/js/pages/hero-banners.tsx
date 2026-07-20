import { Head, useForm, router } from '@inertiajs/react';
import { Image, Plus, Search, Edit, Trash2, X, Save, Upload, Eye, EyeOff } from 'lucide-react';
import { useState, useRef } from 'react';

interface HeroBanner {
    id: number;
    image: string;
    title: string | null;
    subtitle: string | null;
    button_text: string | null;
    button_link: string | null;
    is_active: boolean;
    sort_order: number;
}

const emptyForm = {
    image: '',
    image_file: null as File | null,
    title: '',
    subtitle: '',
    button_text: '',
    button_link: '',
    is_active: true,
    sort_order: 0,
};

const getImageSrc = (banner: HeroBanner) => {
    if (!banner.image) return null;
    if (banner.image.startsWith('http')) return banner.image;
    return `/storage/${banner.image}`;
};

export default function HeroBanners({ banners }: { banners: HeroBanner[] }) {
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<HeroBanner | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm(emptyForm);

    const filtered = banners.filter(b =>
        b.title?.toLowerCase().includes(search.toLowerCase()) ||
        b.subtitle?.toLowerCase().includes(search.toLowerCase())
    );

    const openCreate = () => {
        setEditingItem(null);
        reset();
        setImagePreview(null);
        setShowModal(true);
    };

    const openEdit = (item: HeroBanner) => {
        setEditingItem(item);
        setData({
            image: item.image,
            image_file: null,
            title: item.title || '',
            subtitle: item.subtitle || '',
            button_text: item.button_text || '',
            button_link: item.button_link || '',
            is_active: item.is_active,
            sort_order: item.sort_order,
        });
        setImagePreview(null);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingItem(null);
        reset();
        setImagePreview(null);
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const cb = { onSuccess: () => closeModal() };
        const url = editingItem ? `/admin/hero-banners/${editingItem.id}` : '/admin/hero-banners';

        if (data.image_file instanceof File) {
            const fd = new FormData();
            fd.append('title', data.title);
            fd.append('subtitle', data.subtitle || '');
            fd.append('button_text', data.button_text || '');
            fd.append('button_link', data.button_link || '');
            fd.append('is_active', data.is_active ? '1' : '0');
            fd.append('sort_order', String(data.sort_order));
            fd.append('image', '');
            fd.append('image_file', data.image_file);
            if (editingItem) fd.append('_method', 'put');
            router.post(url, fd, cb);
        } else {
            setData('image_file', null as any);
            if (editingItem) {
                put(`/admin/hero-banners/${editingItem.id}`, cb);
            } else {
                post('/admin/hero-banners', cb);
            }
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus banner ini?')) {
            router.delete(`/admin/hero-banners/${id}`);
        }
    };

    const currentImage = imagePreview || (editingItem ? getImageSrc(editingItem) : null);

    return (
        <>
            <Head title="Hero Banner" />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
                <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 font-['Playfair_Display',serif]">Hero Banner</h1>
                            <p className="text-sm text-slate-500 mt-1">Kelola banner hero untuk halaman utama</p>
                        </div>
                        <button onClick={openCreate} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm shadow-lg shadow-amber-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                            <Plus className="w-4 h-4" /> Add Banner
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100">
                            <div className="relative w-full sm:w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input type="text" placeholder="Search banners..." value={search} onChange={e => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-50">
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Image</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Subtitle</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order</th>
                                        <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filtered.map(banner => (
                                        <tr key={banner.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="w-20 h-14 rounded-lg overflow-hidden bg-slate-100">
                                                    {getImageSrc(banner) ? (
                                                        <img src={getImageSrc(banner)!} alt={banner.title || ''} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-300"><Image className="w-5 h-5" /></div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-medium text-slate-900">{banner.title || '-'}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-500">{banner.subtitle || '-'}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {banner.is_active ? (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                                                        <Eye className="w-3 h-3" /> Active
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-medium">
                                                        <EyeOff className="w-3 h-3" /> Inactive
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-500">{banner.sort_order}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => openEdit(banner)} className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"><Edit className="w-4 h-4" /></button>
                                                    <button onClick={() => handleDelete(banner.id)} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {filtered.length === 0 && (
                            <div className="text-center py-16">
                                <Image className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                <p className="text-slate-500 font-medium">No banners found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={closeModal}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h2 className="text-lg font-bold text-slate-900">{editingItem ? 'Edit Banner' : 'Add Banner'}</h2>
                            <button onClick={closeModal} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Image</label>
                                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                <button type="button" onClick={() => fileInputRef.current?.click()}
                                    className="w-full px-4 py-6 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-100 transition-colors flex flex-col items-center justify-center gap-2">
                                    {currentImage ? (
                                        <img src={currentImage} alt="Preview" className="h-24 w-auto rounded-lg object-cover" />
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 text-slate-400" />
                                            <span className="text-sm text-slate-500 font-medium">Klik untuk upload gambar</span>
                                            <span className="text-xs text-slate-400">JPG, PNG, WebP (Maks 5MB)</span>
                                        </>
                                    )}
                                </button>
                                {errors.image_file && <p className="text-red-500 text-xs mt-1">{errors.image_file}</p>}
                                {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                                <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} placeholder="e.g. Fresh Pizza Every Day" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
                                <input type="text" value={data.subtitle} onChange={e => setData('subtitle', e.target.value)} placeholder="e.g. Fresh from our oven to you" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                                {errors.subtitle && <p className="text-red-500 text-xs mt-1">{errors.subtitle}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Button Text</label>
                                    <input type="text" value={data.button_text} onChange={e => setData('button_text', e.target.value)} placeholder="e.g. Lihat Menu" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                                    {errors.button_text && <p className="text-red-500 text-xs mt-1">{errors.button_text}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Button Link</label>
                                    <input type="text" value={data.button_link} onChange={e => setData('button_link', e.target.value)} placeholder="e.g. /menu" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                                    {errors.button_link && <p className="text-red-500 text-xs mt-1">{errors.button_link}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Sort Order</label>
                                    <input type="number" value={data.sort_order} onChange={e => setData('sort_order', parseInt(e.target.value) || 0)} min="0" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Active</label>
                                    <div className="flex items-center gap-3 mt-2">
                                        <button type="button" onClick={() => setData('is_active', !data.is_active)}
                                            className={`relative w-11 h-6 rounded-full transition-colors ${data.is_active ? 'bg-green-500' : 'bg-slate-300'}`}>
                                            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${data.is_active ? 'translate-x-5' : ''}`} />
                                        </button>
                                        <span className="text-sm text-slate-600">{data.is_active ? 'Active' : 'Inactive'}</span>
                                    </div>
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
