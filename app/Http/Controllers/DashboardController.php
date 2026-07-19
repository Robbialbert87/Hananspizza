<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use App\Models\Order;
use App\Models\Customer;
use App\Models\Promo;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalOrders = Order::count();
        $totalRevenue = Order::where('status', '!=', 'cancelled')->sum('total');
        $totalMenuItems = MenuItem::count();
        $totalCustomers = Customer::count();
        $activePromos = Promo::where('is_active', true)->count();

        $recentOrders = Order::latest()->take(5)->get();

        $popularItems = MenuItem::orderByDesc('reviews')->take(4)->get();

        $monthlyRevenue = Order::where('status', '!=', 'cancelled')
            ->selectRaw("DATE_FORMAT(created_at, '%Y-%m') as month, SUM(total) as revenue")
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'total_orders' => $totalOrders,
                'total_revenue' => $totalRevenue,
                'total_menu_items' => $totalMenuItems,
                'total_customers' => $totalCustomers,
                'active_promos' => $activePromos,
            ],
            'recentOrders' => $recentOrders,
            'popularItems' => $popularItems,
            'monthlyRevenue' => $monthlyRevenue,
        ]);
    }
}
