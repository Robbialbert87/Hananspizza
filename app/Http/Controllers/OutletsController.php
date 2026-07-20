<?php

namespace App\Http\Controllers;

use App\Models\Outlet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class OutletsController extends Controller
{
    public function index()
    {
        $outlets = Outlet::latest()->get();

        return Inertia::render('outlets', [
            'outlets' => $outlets,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'required|string|max:50',
            'hours' => 'required|string|max:255',
            'map_link' => 'nullable|string|max:500',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        Outlet::create($validator->validated());

        return redirect()->route('outlets')->with('success', 'Outlet created successfully.');
    }

    public function update(Request $request, Outlet $outlet)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'required|string|max:50',
            'hours' => 'required|string|max:255',
            'map_link' => 'nullable|string|max:500',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $outlet->update($validator->validated());

        return redirect()->route('outlets')->with('success', 'Outlet updated successfully.');
    }

    public function destroy(Outlet $outlet)
    {
        $outlet->delete();

        return redirect()->route('outlets')->with('success', 'Outlet deleted successfully.');
    }
}
