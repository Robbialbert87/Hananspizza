<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\PromosController;
use App\Http\Controllers\CustomersController;
use App\Models\MenuItem;
use App\Models\Promo;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $menuItems = MenuItem::where('is_active', true)->latest()->get();
    $promos = Promo::where('is_active', true)->latest()->get();

    return Inertia::render('welcome', [
        'menuItems' => $menuItems,
        'promos' => $promos,
    ]);
})->name('home');

Route::get('menu', function () {
    $menuItems = MenuItem::where('is_active', true)->latest()->get();

    return Inertia::render('public-menu', [
        'menuItems' => $menuItems,
    ]);
})->name('public.menu');

Route::get('promo', function () {
    $promos = Promo::where('is_active', true)->latest()->get();

    return Inertia::render('public-promo', [
        'promos' => $promos,
    ]);
})->name('public.promo');

Route::get('about', function () {
    return Inertia::render('public-about');
})->name('public.about');

Route::get('outlet', function () {
    return Inertia::render('public-outlet');
})->name('public.outlet');

Route::get('reviews', function () {
    return Inertia::render('public-reviews');
})->name('public.reviews');

Route::get('menu/{id}', function ($id) {
    $menuItem = MenuItem::findOrFail($id);

    return Inertia::render('public-menu-detail', [
        'menuItem' => $menuItem,
    ]);
})->name('public.menu.detail');

Route::get('faq', function () {
    return Inertia::render('public-faq');
})->name('public.faq');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('admin/menu', [MenuController::class, 'index'])->name('menu');
    Route::post('admin/menu', [MenuController::class, 'store'])->name('menu.store');
    Route::put('admin/menu/{menuItem}', [MenuController::class, 'update'])->name('menu.update');
    Route::delete('admin/menu/{menuItem}', [MenuController::class, 'destroy'])->name('menu.destroy');

    Route::get('admin/orders', [OrdersController::class, 'index'])->name('orders');
    Route::post('admin/orders', [OrdersController::class, 'store'])->name('orders.store');
    Route::put('admin/orders/{order}', [OrdersController::class, 'update'])->name('orders.update');
    Route::delete('admin/orders/{order}', [OrdersController::class, 'destroy'])->name('orders.destroy');

    Route::get('admin/promos', [PromosController::class, 'index'])->name('promos');
    Route::post('admin/promos', [PromosController::class, 'store'])->name('promos.store');
    Route::put('admin/promos/{promo}', [PromosController::class, 'update'])->name('promos.update');
    Route::delete('admin/promos/{promo}', [PromosController::class, 'destroy'])->name('promos.destroy');

    Route::get('admin/customers', [CustomersController::class, 'index'])->name('customers');
    Route::post('admin/customers', [CustomersController::class, 'store'])->name('customers.store');
    Route::put('admin/customers/{customer}', [CustomersController::class, 'update'])->name('customers.update');
    Route::delete('admin/customers/{customer}', [CustomersController::class, 'destroy'])->name('customers.destroy');
});

require __DIR__.'/settings.php';
