import { Head, router } from '@inertiajs/react';
import { Pizza, ShoppingBag, DollarSign, Users, TrendingUp, Star, ArrowUpRight, Clock, ChefHat, TrendingDown, ClipboardList, Tag, Globe, Settings, Megaphone, MegaphoneOff } from 'lucide-react';

const formatPrice = (price: number) => `Rp ${price.toLocaleString('id-ID')}`;

const statusColors: Record<string, string> = {
    delivered: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    processing: 'bg-blue-50 text-blue-700 border border-blue-200',
    pending: 'bg-amber-50 text-amber-700 border border-amber-200',
    cancelled: 'bg-red-50 text-red-700 border border-red-200',
};

interface DashboardProps {
    stats: {
        total_orders: number;
        total_revenue: number;
        total_menu_items: number;
        total_customers: number;
        active_promos: number;
    };
    recentOrders: Array<{
        id: number;
        order_id: string;
        customer_name: string;
        items: string;
        total: number;
        status: string;
        platform: string | null;
        created_at: string;
    }>;
    popularItems: Array<{
        id: number;
        name: string;
        category: string;
        price: number;
        image: string | null;
        rating: number;
        reviews: number;
    }>;
    promoMode: boolean;
}

export default function Dashboard({ stats, recentOrders, popularItems, promoMode }: DashboardProps) {
    const statCards = [
        { title: 'Total Orders', value: stats.total_orders.toLocaleString(), icon: ShoppingBag, bgColor: 'from-blue-500 to-blue-600', change: '+12.5%', trend: 'up' as const },
        { title: 'Revenue', value: formatPrice(stats.total_revenue), icon: DollarSign, bgColor: 'from-emerald-500 to-emerald-600', change: '+8.2%', trend: 'up' as const },
        { title: 'Menu Items', value: stats.total_menu_items.toString(), icon: Pizza, bgColor: 'from-orange-500 to-orange-600', change: `${stats.total_menu_items} items`, trend: 'up' as const },
        { title: 'Customers', value: stats.total_customers.toLocaleString(), icon: Users, bgColor: 'from-purple-500 to-purple-600', change: `${stats.total_customers} users`, trend: 'up' as const },
    ];

    return (
        <>
            <Head title="Dashboard" />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
                <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
                    {/* Welcome Banner */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 mb-8 shadow-xl shadow-slate-900/10">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-tr from-amber-400/10 to-orange-500/10 rounded-full blur-2xl"></div>
                        <div className="relative z-10 flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
                                <Pizza className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-white font-['Playfair_Display',serif]">
                                    Selamat Datang, <span className="text-amber-400">Admin</span>
                                </h1>
                                <p className="text-slate-400 text-sm">Kelola menu, pesanan, dan bisnis Hanan's Pizza Anda dari satu tempat.</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                        {statCards.map((stat) => (
                            <div key={stat.title} className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 border border-slate-100 hover:border-slate-200 hover:-translate-y-1">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                                        <p className="text-3xl font-bold text-slate-900 font-['Playfair_Display',serif]">{stat.value}</p>
                                        <div className="flex items-center gap-1.5 mt-2">
                                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                                            <span className="text-sm font-semibold text-emerald-600">{stat.change}</span>
                                        </div>
                                    </div>
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.bgColor} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <stat.icon className="w-7 h-7 text-white" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Promo Mode Toggle */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${promoMode ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/25' : 'bg-slate-100'}`}>
                                    {promoMode ? <Megaphone className="w-6 h-6 text-white" /> : <MegaphoneOff className="w-6 h-6 text-slate-400" />}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Promo Mode</h3>
                                    <p className="text-sm text-slate-500">{promoMode ? 'Promo sedang aktif di website' : 'Promo sedang tidak ditampilkan'}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => router.post('/dashboard/toggle-promo')}
                                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${promoMode ? 'bg-amber-500' : 'bg-slate-300'}`}
                            >
                                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${promoMode ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        {/* Recent Orders */}
                        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="px-6 py-5 border-b border-slate-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                                            <ClipboardList className="w-5 h-5 text-slate-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-slate-900 font-['Playfair_Display',serif]">Recent Orders</h2>
                                            <p className="text-xs text-slate-500">Latest customer transactions</p>
                                        </div>
                                    </div>
                                    <a href="/orders" className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors">
                                        View All <ArrowUpRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                            <div className="p-6">
                                {recentOrders.length === 0 ? (
                                    <div className="text-center py-8">
                                        <ClipboardList className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                                        <p className="text-slate-400 text-sm">Belum ada pesanan</p>
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        {recentOrders.map((order) => (
                                            <div key={order.id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center border border-slate-200 group-hover:border-amber-200 group-hover:bg-amber-50 transition-colors">
                                                    <ShoppingBag className="w-5 h-5 text-slate-500 group-hover:text-amber-600 transition-colors" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-0.5">
                                                        <span className="font-semibold text-slate-900">{order.order_id}</span>
                                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status] || ''}`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-slate-600 truncate">{order.customer_name}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold text-slate-900">{formatPrice(order.total)}</p>
                                                    <p className="text-xs text-slate-400 flex items-center gap-1 justify-end">
                                                        <Clock className="w-3 h-3" />
                                                        {new Date(order.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Popular Items */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                                <div className="px-6 py-5 border-b border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                                            <Star className="w-5 h-5 text-amber-500" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-slate-900 font-['Playfair_Display',serif]">Popular Items</h2>
                                            <p className="text-xs text-slate-500">Top selling menu items</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    {popularItems.length === 0 ? (
                                        <div className="text-center py-6">
                                            <Star className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                            <p className="text-slate-400 text-sm">Belum ada menu</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {popularItems.map((item, index) => (
                                                <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                                                    <div className="relative">
                                                        {item.image ? (
                                                            <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                                                        ) : (
                                                            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                                                                <Pizza className="w-5 h-5 text-slate-400" />
                                                            </div>
                                                        )}
                                                        <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                                                            {index + 1}
                                                        </span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-semibold text-slate-900 text-sm">{item.name}</p>
                                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                                            <span>{item.reviews} reviews</span>
                                                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                            <span className="flex items-center gap-0.5 text-amber-500">
                                                                <Star className="w-3 h-3 fill-current" /> {item.rating}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <span className="font-bold text-slate-900 text-sm">{formatPrice(item.price)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                                <div className="px-6 py-5 border-b border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                                            <ChefHat className="w-5 h-5 text-slate-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-slate-900 font-['Playfair_Display',serif]">Quick Actions</h2>
                                            <p className="text-xs text-slate-500">Common tasks</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <a href="/menu" className="flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 transition-all group">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                                                <Pizza className="w-6 h-6 text-white" />
                                            </div>
                                            <span className="text-sm font-semibold text-slate-700 group-hover:text-amber-700 transition-colors">Add Menu</span>
                                        </a>
                                        <a href="/orders" className="flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 transition-all group">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                                                <ShoppingBag className="w-6 h-6 text-white" />
                                            </div>
                                            <span className="text-sm font-semibold text-slate-700 group-hover:text-amber-700 transition-colors">View Orders</span>
                                        </a>
                                        <a href="/" className="flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 transition-all group">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                                                <Globe className="w-6 h-6 text-white" />
                                            </div>
                                            <span className="text-sm font-semibold text-slate-700 group-hover:text-amber-700 transition-colors">Website</span>
                                        </a>
                                        <a href="/settings/profile" className="flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 transition-all group">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center shadow-lg shadow-slate-500/20 group-hover:scale-110 transition-transform">
                                                <Settings className="w-6 h-6 text-white" />
                                            </div>
                                            <span className="text-sm font-semibold text-slate-700 group-hover:text-amber-700 transition-colors">Settings</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
