<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Soins Visage',
                'slug' => 'soins-visage',
                'description' => 'Des produits essentiels pour une peau éclatante et saine.',
                'image' => 'https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?q=80&w=600&auto=format&fit=crop',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Maquillage',
                'slug' => 'maquillage',
                'description' => 'Mettez en valeur votre beauté naturelle.',
                'image' => 'https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?q=80&w=600&auto=format&fit=crop', // Image temporaire, idéalement différente
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Parfums',
                'slug' => 'parfums',
                'description' => 'Des fragrances envoûtantes pour toutes les occasions.',
                'image' => 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Corps & Bain',
                'slug' => 'corps-et-bain',
                'description' => 'Prenez soin de votre corps avec douceur.',
                'image' => 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('categories')->upsert($categories, ['slug'], ['name', 'description', 'image', 'updated_at']);
    }
}
