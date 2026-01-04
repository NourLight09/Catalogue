<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Peupler la base de données de l'application.
     */
    public function run(): void
    {
        // Utilisateur Administrateur
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@glow.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Utilisateur Standard
        User::create([
            'name' => 'Sophie Martin',
            'email' => 'sophie@example.com',
            'password' => Hash::make('password'),
            'role' => 'user',
            'email_verified_at' => now(),
        ]);

        // Un autre utilisateur standard
        User::create([
            'name' => 'Thomas Dubois',
            'email' => 'thomas@example.com',
            'password' => Hash::make('password'),
            'role' => 'user',
            'email_verified_at' => now(),
        ]);
        
        // Créer des utilisateurs aléatoires
        User::factory(10)->create();

        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
        ]);
    }
}
