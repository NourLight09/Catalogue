<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Affiche la liste des catégories.
     */
    public function index()
    {
        return Category::all();
    }

    /**
     * Enregistre une nouvelle catégorie.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable', // Peut être une chaîne (URL) ou un fichier
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('categories', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $category = Category::create($validated);

        return response()->json($category, 201);
    }

    /**
     * Affiche une catégorie spécifique.
     */
    public function show(Category $category)
    {
        return $category;
    }

    /**
     * Met à jour une catégorie spécifique.
     */
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable',
        ]);

        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('categories', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $category->update($validated);

        return $category;
    }

    /**
     * Supprime une catégorie spécifique.
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return response()->noContent();
    }
}
