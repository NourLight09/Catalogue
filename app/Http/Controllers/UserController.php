<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Afficher une liste de la ressource.
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Enregistrer une nouvelle ressource dans le stockage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Afficher la ressource spécifiée.
     */
    public function show(User $user)
    {
        return $user;
    }

    /**
     * Mettre à jour la ressource spécifiée dans le stockage.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => 'required|in:admin,user',
        ]);

        $user->update($validated);

        return $user;
    }

    /**
     * Supprimer la ressource spécifiée du stockage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->noContent();
    }
}
