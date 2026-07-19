<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\Promo;
use App\Models\Customer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@pizzahouse.com',
            'password' => bcrypt('password'),
        ]);

        // Menu Items
        $menuItems = [
            ['name' => 'Pepperoni', 'description' => 'Saus tomat, keju mozzarella, pepperoni premium', 'category' => 'pizza', 'price' => 65000, 'old_price' => 80000, 'image' => 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=500&auto=format&fit=crop', 'badge' => 'hot', 'rating' => 4.9, 'reviews' => 128],
            ['name' => 'Cheese Lovers', 'description' => 'Mozzarella, cheddar, parmesan, cream cheese', 'category' => 'pizza', 'price' => 70000, 'old_price' => 0, 'image' => 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=500&auto=format&fit=crop', 'badge' => 'new', 'rating' => 4.8, 'reviews' => 95],
            ['name' => 'Meat Lovers', 'description' => 'Sosis, daging asap, pepperoni, beef, keju mozzarella', 'category' => 'pizza', 'price' => 75000, 'old_price' => 90000, 'image' => 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=500&auto=format&fit=crop', 'badge' => 'best', 'rating' => 5.0, 'reviews' => 210],
            ['name' => 'Hawaiian', 'description' => 'Smoke beef, nanas segar, keju mozzarella', 'category' => 'pizza', 'price' => 65000, 'old_price' => 0, 'image' => 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500&auto=format&fit=crop', 'badge' => '', 'rating' => 4.7, 'reviews' => 74],
            ['name' => 'BBQ Chicken', 'description' => 'Ayam BBQ, paprika, bawang, keju mozzarella', 'category' => 'pizza', 'price' => 65000, 'old_price' => 0, 'image' => 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&auto=format&fit=crop', 'badge' => '', 'rating' => 4.6, 'reviews' => 88],
            ['name' => 'Margherita', 'description' => 'Saus tomat segar, mozzarella, basil, olive oil', 'category' => 'pizza', 'price' => 55000, 'old_price' => 0, 'image' => 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=500&auto=format&fit=crop', 'badge' => '', 'rating' => 4.5, 'reviews' => 62],
            ['name' => 'Es Teh Manis', 'description' => 'Teh segar es batu, manis pas', 'category' => 'minuman', 'price' => 15000, 'old_price' => 0, 'image' => 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=500&auto=format&fit=crop', 'badge' => '', 'rating' => 4.7, 'reviews' => 200],
            ['name' => 'Fresh Orange Juice', 'description' => 'Jus jeruk segar tanpa pemanis buatan', 'category' => 'minuman', 'price' => 25000, 'old_price' => 0, 'image' => 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=500&auto=format&fit=crop', 'badge' => 'new', 'rating' => 4.8, 'reviews' => 85],
            ['name' => 'Iced Latte', 'description' => 'Kopi latte dingin dengan susu segar', 'category' => 'minuman', 'price' => 28000, 'old_price' => 35000, 'image' => 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=500&auto=format&fit=crop', 'badge' => 'hot', 'rating' => 4.9, 'reviews' => 156],
            ['name' => 'French Fries', 'description' => 'Kentang goreng renyah dengan bumbu spesial', 'category' => 'snack', 'price' => 25000, 'old_price' => 0, 'image' => 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=500&auto=format&fit=crop', 'badge' => '', 'rating' => 4.5, 'reviews' => 130],
            ['name' => 'Chicken Wings', 'description' => 'Sayap ayam goreng crispy dengan saus BBQ', 'category' => 'snack', 'price' => 45000, 'old_price' => 55000, 'image' => 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=500&auto=format&fit=crop', 'badge' => 'hot', 'rating' => 4.8, 'reviews' => 178],
            ['name' => 'Onion Rings', 'description' => 'Bawang goreng tepung renyah dengan saus', 'category' => 'snack', 'price' => 22000, 'old_price' => 0, 'image' => 'https://images.unsplash.com/photo-1639024471283-03518883512d?q=80&w=500&auto=format&fit=crop', 'badge' => '', 'rating' => 4.4, 'reviews' => 92],
            ['name' => 'Chocolate Lava Cake', 'description' => 'Kue cokelat leleh dengan ice cream vanilla', 'category' => 'dessert', 'price' => 35000, 'old_price' => 0, 'image' => 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=500&auto=format&fit=crop', 'badge' => 'best', 'rating' => 4.9, 'reviews' => 145],
            ['name' => 'Tiramisu', 'description' => 'Kue tiramisu klasik dengan kopi robusta', 'category' => 'dessert', 'price' => 38000, 'old_price' => 0, 'image' => 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=500&auto=format&fit=crop', 'badge' => 'new', 'rating' => 4.7, 'reviews' => 68],
            ['name' => 'Ice Cream Sundae', 'description' => 'Es krim vanila dengan topping cokelat dan stroberi', 'category' => 'dessert', 'price' => 28000, 'old_price' => 0, 'image' => 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=500&auto=format&fit=crop', 'badge' => '', 'rating' => 4.6, 'reviews' => 102],
        ];

        foreach ($menuItems as $item) {
            MenuItem::create($item);
        }

        // Customers
        $customers = [
            ['name' => 'Budi Santoso', 'email' => 'budi@example.com', 'phone' => '081234567890'],
            ['name' => 'Siti Rahayu', 'email' => 'siti@example.com', 'phone' => '081234567891'],
            ['name' => 'Andi Wijaya', 'email' => 'andi@example.com', 'phone' => '081234567892'],
            ['name' => 'Rina Melati', 'email' => 'rina@example.com', 'phone' => '081234567893'],
            ['name' => 'Dedi Kurniawan', 'email' => 'dedi@example.com', 'phone' => '081234567894'],
            ['name' => 'Maya Putri', 'email' => 'maya@example.com', 'phone' => '081234567895'],
            ['name' => 'Fajar Nugroho', 'email' => 'fajar@example.com', 'phone' => '081234567896'],
            ['name' => 'Diana Sari', 'email' => 'diana@example.com', 'phone' => '081234567897'],
        ];

        foreach ($customers as $customer) {
            Customer::create($customer);
        }

        // Orders
        $orders = [
            ['order_id' => 'ORD-001', 'customer_name' => 'Budi Santoso', 'items' => 'Pepperoni, Cheese Lovers', 'total' => 135000, 'status' => 'delivered', 'platform' => 'GoFood'],
            ['order_id' => 'ORD-002', 'customer_name' => 'Siti Rahayu', 'items' => 'Meat Lovers, BBQ Chicken', 'total' => 140000, 'status' => 'processing', 'platform' => 'GrabFood'],
            ['order_id' => 'ORD-003', 'customer_name' => 'Andi Wijaya', 'items' => 'Hawaiian Pizza', 'total' => 65000, 'status' => 'pending', 'platform' => 'ShopeeFood'],
            ['order_id' => 'ORD-004', 'customer_name' => 'Rina Melati', 'items' => 'Cheese Lovers x2', 'total' => 140000, 'status' => 'delivered', 'platform' => 'GoFood'],
            ['order_id' => 'ORD-005', 'customer_name' => 'Dedi Kurniawan', 'items' => 'Pepperoni, Hawaiian', 'total' => 130000, 'status' => 'delivered', 'platform' => 'GrabFood'],
            ['order_id' => 'ORD-006', 'customer_name' => 'Maya Putri', 'items' => 'Meat Lovers, Iced Latte', 'total' => 103000, 'status' => 'processing', 'platform' => 'ShopeeFood'],
            ['order_id' => 'ORD-007', 'customer_name' => 'Fajar Nugroho', 'items' => 'BBQ Chicken, French Fries', 'total' => 90000, 'status' => 'delivered', 'platform' => 'GoFood'],
            ['order_id' => 'ORD-008', 'customer_name' => 'Diana Sari', 'items' => 'Margherita, Es Teh Manis', 'total' => 70000, 'status' => 'cancelled', 'platform' => 'GrabFood'],
            ['order_id' => 'ORD-009', 'customer_name' => 'Rizky Pratama', 'items' => 'Chicken Wings x2', 'total' => 90000, 'status' => 'delivered', 'platform' => 'ShopeeFood'],
            ['order_id' => 'ORD-010', 'customer_name' => 'Anisa Maharani', 'items' => 'Chocolate Lava Cake, Iced Latte', 'total' => 63000, 'status' => 'delivered', 'platform' => 'GoFood'],
        ];

        foreach ($orders as $order) {
            Order::create($order);
        }

        // Promos
        $promos = [
            ['title' => 'Buy 1 Get 1 Free', 'description' => 'Beli 1 pizza ukuran large, dapat 1 gratis ukuran medium', 'discount' => '50%', 'is_active' => true, 'start_date' => '2026-07-01', 'end_date' => '2026-07-31'],
            ['title' => 'Happy Hour', 'description' => 'Diskon 30% untuk semua minuman setiap hari Jumat jam 15:00-17:00', 'discount' => '30%', 'is_active' => true, 'start_date' => '2026-07-01', 'end_date' => '2026-09-30'],
            ['title' => 'Paket Keluarga', 'description' => 'Paket hemat untuk 4 orang: 2 pizza large + 4 minuman + 2 snack', 'discount' => 'Rp 100.000', 'is_active' => true, 'start_date' => '2026-07-15', 'end_date' => '2026-08-15'],
            ['title' => 'Student Discount', 'description' => 'Diskon 20% untuk pelajar/mahasiswa yang menunjukkan kartu pelajar', 'discount' => '20%', 'is_active' => false, 'start_date' => '2026-06-01', 'end_date' => '2026-06-30'],
            ['title' => 'Weekend Special', 'description' => 'Free dessert untuk setiap pembelian 2 pizza di weekend', 'discount' => 'Free Dessert', 'is_active' => true, 'start_date' => '2026-07-05', 'end_date' => '2026-08-05'],
        ];

        foreach ($promos as $promo) {
            Promo::create($promo);
        }
    }
}
