<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class OrdersController extends Controller
{
    public function index()
    {
        $orders = Order::with('customer')->latest()->get();

        return Inertia::render('orders', [
            'orders' => $orders,
            'customers' => Customer::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'customer_name' => 'required|string|max:255',
            'customer_id' => 'nullable|exists:customers,id',
            'items' => 'required|string',
            'total' => 'required|integer|min:0',
            'status' => 'required|string|in:pending,processing,delivered,cancelled',
            'platform' => 'nullable|string|in:GoFood,GrabFood,ShopeeFood',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $data = $validator->validated();
        $data['order_id'] = 'ORD-' . str_pad(Order::max('id') + 1, 3, '0', STR_PAD_LEFT);

        $order = Order::create($data);

        if ($order->customer_id) {
            $customer = Customer::find($order->customer_id);
            if ($customer) {
                $customer->increment('total_orders');
                $customer->increment('total_spent', $order->total);
            }
        }

        return redirect()->route('orders')->with('success', 'Order created successfully.');
    }

    public function update(Request $request, Order $order)
    {
        $validator = Validator::make($request->all(), [
            'customer_name' => 'required|string|max:255',
            'customer_id' => 'nullable|exists:customers,id',
            'items' => 'required|string',
            'total' => 'required|integer|min:0',
            'status' => 'required|string|in:pending,processing,delivered,cancelled',
            'platform' => 'nullable|string|in:GoFood,GrabFood,ShopeeFood',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $order->update($validator->validated());

        return redirect()->route('orders')->with('success', 'Order updated successfully.');
    }

    public function destroy(Order $order)
    {
        if ($order->customer_id) {
            $customer = Customer::find($order->customer_id);
            if ($customer) {
                $customer->decrement('total_orders');
                $customer->decrement('total_spent', $order->total);
            }
        }

        $order->delete();

        return redirect()->route('orders')->with('success', 'Order deleted successfully.');
    }
}
