import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function FeaturedProducts({ products = [], isLoading }) {
    if (isLoading) {
        return (
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-stone-100 rounded-lg h-96 animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <motion.div
                    className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div>
                        <span className="text-xs tracking-[0.3em] text-stone-400 uppercase">Best Sellers</span>
                        <h2 className="font-display text-4xl md:text-5xl font-light text-stone-900 mt-3">
                            Produits Vedettes
                        </h2>
                    </div>
                    <Link
                        to={createPageUrl('Catalog')}
                        className="mt-6 md:mt-0 text-sm tracking-wide text-stone-600 hover:text-stone-900 transition-colors underline underline-offset-4"
                    >
                        Voir tous les produits
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <Link to={`${createPageUrl('ProductDetail')}?id=${product.id}`}>
                                <div className="relative aspect-square overflow-hidden bg-stone-100 mb-4">
                                    <img
                                        src={product.image_url || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800'}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Quick Actions */}
                                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-stone-100 transition-colors">
                                            <Heart size={18} className="text-stone-600" />
                                        </button>
                                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-stone-100 transition-colors">
                                            <ShoppingBag size={18} className="text-stone-600" />
                                        </button>
                                    </div>

                                    {/* Add to Cart Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                        <Button className="w-full bg-stone-900 hover:bg-stone-800 text-white rounded-none py-3 text-sm tracking-wide">
                                            Ajouter au panier
                                        </Button>
                                    </div>
                                </div>
                            </Link>

                            <div className="space-y-2">
                                <p className="text-xs text-stone-400 tracking-wide uppercase">
                                    {product.category_name}
                                </p>
                                <Link to={`${createPageUrl('ProductDetail')}?id=${product.id}`}>
                                    <h3 className="text-stone-900 font-medium group-hover:text-stone-600 transition-colors">
                                        {product.name}
                                    </h3>
                                </Link>
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    <span className="text-xs text-stone-400">(24)</span>
                                </div>
                                <p className="text-lg font-medium text-stone-900">
                                    {Number(product.price || 0).toFixed(2)} €
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}