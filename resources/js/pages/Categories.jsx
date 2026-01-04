import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';

import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const defaultImages = [
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80',
    'https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=800&q=80',
    'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80',
    'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
];

export default function Categories() {
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => api.entities.Category.list(),
    });

    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: () => api.entities.Product.list(),
    });

    const getCategoryProductCount = (categoryId) => {
        return products.filter(p => p.category_id === categoryId).length;
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <div className="relative h-64 md:h-80 bg-stone-100 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1920&q=80"
                    alt="Catégories"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-900/40 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-6">
                        <span className="text-xs tracking-[0.3em] text-stone-300 uppercase">
                            Explorer
                        </span>
                        <h1 className="font-display text-4xl md:text-5xl font-light text-white mt-2">
                            Nos Catégories
                        </h1>
                        <p className="text-stone-200 mt-4 max-w-md">
                            Parcourez nos différentes gammes de produits
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16">
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-stone-400" />
                    </div>
                ) : categories.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ArrowUpRight size={32} className="text-stone-400" />
                        </div>
                        <h3 className="text-xl font-medium text-stone-900 mb-2">
                            Aucune catégorie disponible
                        </h3>
                        <p className="text-stone-500">
                            Les catégories seront bientôt ajoutées
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((category, index) => (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    to={`${createPageUrl('Catalog')}?category=${category.slug}`}
                                    className="group block"
                                >
                                    <div className="relative aspect-[4/5] overflow-hidden bg-stone-200 mb-4">
                                        <img
                                            src={category.image_url || defaultImages[index % defaultImages.length]}
                                            alt={category.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <div className="absolute bottom-6 left-6 right-6 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                            <div className="flex items-center gap-2 text-white">
                                                <span className="text-sm tracking-wide">Découvrir</span>
                                                <ArrowUpRight size={16} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-xl font-display font-light text-stone-900 group-hover:text-stone-600 transition-colors">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-stone-500">
                                            {getCategoryProductCount(category.id)} produits
                                        </p>
                                        {category.description && (
                                            <p className="text-sm text-stone-600 line-clamp-2">
                                                {category.description}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

