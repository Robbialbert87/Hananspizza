<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use App\Models\Promo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PromosController extends Controller
{
    public function index()
    {
        $promos = Promo::with('menuItem')->latest()->get();
        $menuItems = MenuItem::select('id', 'name', 'category', 'price')->latest()->get();

        return Inertia::render('promos', [
            'promos' => $promos,
            'menuItems' => $menuItems,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'menu_item_id' => 'nullable|exists:menu_items,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'discount' => 'required|string|max:255',
            'is_active' => 'boolean',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        Promo::create($validator->validated());

        return redirect()->route('promos')->with('success', 'Promo created successfully.');
    }

    public function update(Request $request, Promo $promo)
    {
        $validator = Validator::make($request->all(), [
            'menu_item_id' => 'nullable|exists:menu_items,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'discount' => 'required|string|max:255',
            'is_active' => 'boolean',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $promo->update($validator->validated());

        return redirect()->route('promos')->with('success', 'Promo updated successfully.');
    }

    public function destroy(Promo $promo)
    {
        $promo->delete();

        return redirect()->route('promos')->with('success', 'Promo deleted successfully.');
    }
}
