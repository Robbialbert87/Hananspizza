<?php

namespace App\Http\Controllers;

use App\Models\HeroBanner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class HeroBannerController extends Controller
{
    public function index()
    {
        $banners = HeroBanner::orderBy('sort_order')->latest()->get();

        return Inertia::render('hero-banners', [
            'banners' => $banners,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image'      => 'nullable|string',
            'image_file' => 'nullable|file|image|max:5120',
            'title'      => 'nullable|string|max:255',
            'subtitle'   => 'nullable|string|max:255',
            'button_text'=> 'nullable|string|max:100',
            'button_link'=> 'nullable|string|max:255',
            'is_active'  => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $data = $validator->validated();

        if ($request->hasFile('image_file')) {
            $data['image'] = $request->file('image_file')->store('banners', 'public');
        }

        $data['is_active'] = $request->boolean('is_active', true);
        $data['sort_order'] = (int) ($data['sort_order'] ?? 0);

        HeroBanner::create($data);

        return redirect()->route('hero-banners')->with('success', 'Banner created successfully.');
    }

    public function update(Request $request, HeroBanner $heroBanner)
    {
        $validator = Validator::make($request->all(), [
            'image'      => 'nullable|string',
            'image_file' => 'nullable|file|image|max:5120',
            'title'      => 'nullable|string|max:255',
            'subtitle'   => 'nullable|string|max:255',
            'button_text'=> 'nullable|string|max:100',
            'button_link'=> 'nullable|string|max:255',
            'is_active'  => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $data = $validator->validated();

        if ($request->hasFile('image_file')) {
            if ($heroBanner->image && str_starts_with($heroBanner->image, 'banners/')) {
                Storage::disk('public')->delete($heroBanner->image);
            }
            $data['image'] = $request->file('image_file')->store('banners', 'public');
        }

        unset($data['image_file']);
        $data['is_active'] = $request->boolean('is_active', true);
        $data['sort_order'] = (int) ($data['sort_order'] ?? 0);

        $heroBanner->update($data);

        return redirect()->route('hero-banners')->with('success', 'Banner updated successfully.');
    }

    public function destroy(HeroBanner $heroBanner)
    {
        if ($heroBanner->image && str_starts_with($heroBanner->image, 'banners/')) {
            Storage::disk('public')->delete($heroBanner->image);
        }

        $heroBanner->delete();

        return redirect()->route('hero-banners')->with('success', 'Banner deleted successfully.');
    }
}
