<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Récupérer les IDs des catégories
        $skincareId = DB::table('categories')->where('slug', 'soins-visage')->value('id');
        $makeupId = DB::table('categories')->where('slug', 'maquillage')->value('id');
        $perfumeId = DB::table('categories')->where('slug', 'parfums')->value('id');
        $bodyId = DB::table('categories')->where('slug', 'corps-et-bain')->value('id');

        if (!$skincareId || !$makeupId || !$perfumeId || !$bodyId) {
            throw new \Exception('Une ou plusieurs catégories sont introuvables. IDs: ' . json_encode([$skincareId, $makeupId, $perfumeId, $bodyId]));
        }

        $products = [
            // Soins Visage
            [
                'name' => 'Sérum Éclat Vitamine C',
                'description' => 'Un sérum puissant pour illuminer votre teint et réduire les taches pigmentaires.',
                'price' => 45.00,
                'stock' => 100,
                'category_id' => $skincareId,
                'image' => 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
                'featured' => true,
                'ingredients' => json_encode(['Vitamin C', 'Hyaluronic Acid', 'Vitamin E', 'Ferulic Acid']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Crème Hydratante Intense',
                'description' => 'Hydratation profonde de 24h pour les peaux sèches et sensibles.',
                'price' => 32.50,
                'stock' => 50,
                'category_id' => $skincareId,
                'image' => 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=600&auto=format&fit=crop',
                'featured' => false,
                'ingredients' => json_encode(['Water', 'Glycerin', 'Ceramides', 'Shea Butter']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Maquillage
            [
                'name' => 'Rouge à Lèvres Velours',
                'description' => 'Fini mat confortable et longue tenue.',
                'price' => 28.00,
                'stock' => 200,
                'category_id' => $makeupId,
                'image' => 'https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?q=80&w=600&auto=format&fit=crop',
                'featured' => true,
                'ingredients' => json_encode(['Dimethicone', 'Pigments', 'Jojoba Oil']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mascara Volume Extrême',
                'description' => 'Pour des cils démultipliés et un regard intense.',
                'price' => 24.00,
                'stock' => 150,
                'category_id' => $makeupId,
                'image' => 'https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?q=80&w=600&auto=format&fit=crop',
                'featured' => false,
                'ingredients' => json_encode(['Beeswax', 'Carnauba Wax', 'Pigments']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Parfums
            [
                'name' => 'Eau de Parfum "Jardin Secret"',
                'description' => 'Notes florales et boisées pour une élégance intemporelle.',
                'price' => 85.00,
                'stock' => 30,
                'category_id' => $perfumeId,
                'image' => 'https://images.unsplash.com/photo-1594035910387-fea4779426e9?q=80&w=600&auto=format&fit=crop',
                'featured' => true,
                'ingredients' => json_encode(['Alcohol', 'Parfum', 'Water']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Corps et Bain
            [
                'name' => 'Gommage Corps Sucre & Miel',
                'description' => 'Exfolie en douceur pour une peau soyeuse.',
                'price' => 18.00,
                'stock' => 80,
                'category_id' => $bodyId,
                'image' => 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop',
                'featured' => false,
                'ingredients' => json_encode(['Sugar', 'Honey', 'Almond Oil']),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        // Ajouter les slugs
        foreach ($products as &$product) {
            $product['slug'] = Str::slug($product['name']);
        }

        DB::table('products')->upsert($products, ['slug'], ['name', 'description', 'price', 'stock', 'category_id', 'image', 'featured', 'ingredients', 'updated_at']);
    }
}
