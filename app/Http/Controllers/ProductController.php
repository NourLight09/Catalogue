<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category');

        if ($request->has('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        return $query->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'nullable|integer|min:0',
            'stock' => 'nullable|integer|min:0',
            'ingredients' => 'nullable|array',
            'image_url' => 'nullable|string',
            'image' => 'nullable',
            'featured' => 'nullable|boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']) . '-' . Str::random(6);
        
        // Gérer les deux formats de stock
        if (isset($validated['stock_quantity'])) {
            $validated['stock'] = $validated['stock_quantity'];
            unset($validated['stock_quantity']);
        }
        
        // Gérer les deux formats d'image
        if (isset($validated['image_url'])) {
            $validated['image'] = $validated['image_url'];
            unset($validated['image_url']);
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $product = Product::create($validated);

        return response()->json($product, 201);
    }

    public function show(Product $product)
    {
        return $product->load('category');
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric|min:0',
            'stock_quantity' => 'nullable|integer|min:0',
            'stock' => 'nullable|integer|min:0',
            'ingredients' => 'nullable|array',
            'image_url' => 'nullable|string',
            'image' => 'nullable',
            'is_active' => 'nullable|boolean',
            'featured' => 'nullable|boolean'
        ]);

        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']) . '-' . Str::random(6);
        }

        // Gérer les deux formats de stock
        if (isset($validated['stock_quantity'])) {
            $validated['stock'] = $validated['stock_quantity'];
            unset($validated['stock_quantity']);
        }
        
        // Gérer les deux formats d'image
        if (isset($validated['image_url']) && !$request->hasFile('image')) {
            $validated['image'] = $validated['image_url'];
            unset($validated['image_url']);
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $product->update($validated);

        return $product;
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->noContent();
    }
}
