<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function index()
    {
        $menuItems = MenuItem::latest()->get();

        return Inertia::render('menu', [
            'menuItems' => $menuItems,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string|in:pizza,minuman,snack,dessert',
            'price' => 'required|integer|min:0',
            'old_price' => 'nullable|integer|min:0',
            'image' => 'nullable|string',
            'image_file' => 'nullable|file|image|max:2048',
            'badge' => 'nullable|string|in:hot,new,best',
            'rating' => 'nullable|numeric|min:0|max:5',
            'reviews' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $validated = $validator->validated();

        if ($request->hasFile('image_file')) {
            $validated['image'] = $request->file('image_file')->store('menu', 'public');
        }

        unset($validated['image_file']);

        MenuItem::create($validated);

        return redirect()->route('menu')->with('success', 'Menu item created successfully.');
    }

    public function update(Request $request, MenuItem $menuItem)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string|in:pizza,minuman,snack,dessert',
            'price' => 'required|integer|min:0',
            'old_price' => 'nullable|integer|min:0',
            'image' => 'nullable|string',
            'image_file' => 'nullable|file|image|max:2048',
            'badge' => 'nullable|string|in:hot,new,best',
            'rating' => 'nullable|numeric|min:0|max:5',
            'reviews' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $validated = $validator->validated();

        if ($request->hasFile('image_file')) {
            if ($menuItem->image && str_starts_with($menuItem->image, 'menu/')) {
                Storage::disk('public')->delete($menuItem->image);
            }
            $validated['image'] = $request->file('image_file')->store('menu', 'public');
        }

        unset($validated['image_file']);

        $menuItem->update($validated);

        return redirect()->route('menu')->with('success', 'Menu item updated successfully.');
    }

    public function destroy(MenuItem $menuItem)
    {
        if ($menuItem->image && str_starts_with($menuItem->image, 'menu/')) {
            Storage::disk('public')->delete($menuItem->image);
        }

        $menuItem->delete();

        return redirect()->route('menu')->with('success', 'Menu item deleted successfully.');
    }
}
