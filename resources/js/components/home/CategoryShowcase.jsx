import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { ArrowUpRight } from 'lucide-react';

const defaultCategories = [
    {
        id: '1',
        name: 'Maquillage',
        slug: 'maquillage',
        image_url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80',
        description: 'Sublimez votre regard'
    },
    {
        id: '2',
        name: 'Soins Visage',
        slug: 'soins-visage',
        image_url: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=800&q=80',
        description: 'Hydratation & éclat'
    },
    {
        id: '3',
        name: 'Soins Corps',
        slug: 'soins-corps',
        image_url: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&q=80',
        description: 'Douceur au quotidien'
    },
    {
        id: '4',
        name: 'Parfums',
        slug: 'parfums',
        image_url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
        description: 'Signatures olfactives'
    }
];

export default function CategoryShowcase({ categories = [] }) {
    const displayCategories = categories.length > 0 ? categories : defaultCategories;

    return (
        <section className="py-24 bg-stone-50">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-xs tracking-[0.3em] text-stone-400 uppercase">Explorer</span>
                    <h2 className="font-display text-4xl md:text-5xl font-light text-stone-900 mt-3">
                        Nos Catégories
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayCategories.slice(0, 4).map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                to={`${createPageUrl('Catalog')}?category=${category.slug}`}
                                className="group block relative aspect-[3/4] overflow-hidden bg-stone-200"
                            >
                                <img
                                    src={category.image_url || defaultCategories[index % 4].image_url}
                                    alt={category.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent" />

                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                                        <p className="text-xs tracking-widest text-stone-300 mb-2 uppercase">
                                            {category.description || 'Découvrir'}
                                        </p>
                                        <h3 className="text-2xl font-display font-light text-white mb-4">
                                            {category.name}
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-2 text-white opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                        <span className="text-sm tracking-wide">Voir la collection</span>
                                        <ArrowUpRight size={16} />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}