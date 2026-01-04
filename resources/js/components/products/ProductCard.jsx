import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';

export default function ProductCard({ product, index = 0 }) {
    const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= 5;
    const isOutOfStock = product.stock_quantity === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group"
        >
            <Link to={`${createPageUrl('ProductDetail')}?id=${product.id}`}>
                <div className="relative aspect-square overflow-hidden bg-stone-100 mb-4">
                    <img 
                        src={product.image_url || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80'}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.featured && (
                            <Badge className="bg-amber-500 text-white text-xs px-2 py-1">
                                Best Seller
                            </Badge>
                        )}
                        {isLowStock && (
                            <Badge className="bg-orange-500 text-white text-xs px-2 py-1">
                                Stock limité
                            </Badge>
                        )}
                        {isOutOfStock && (
                            <Badge className="bg-stone-500 text-white text-xs px-2 py-1">
                                Rupture
                            </Badge>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-stone-100 transition-colors">
                            <Heart size={18} className="text-stone-600" />
                        </button>
                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-stone-100 transition-colors">
                            <Eye size={18} className="text-stone-600" />
                        </button>
                    </div>

                    {/* Add to Cart Overlay */}
                    {!isOutOfStock && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                            <Button className="w-full bg-stone-900 hover:bg-stone-800 text-white rounded-none py-3 text-sm tracking-wide">
                                <ShoppingBag size={16} className="mr-2" />
                                Ajouter au panier
                            </Button>
                        </div>
                    )}
                </div>
            </Link>

            <div className="space-y-2">
                <p className="text-xs text-stone-400 tracking-wide uppercase">
                    {product.category_name || 'Non catégorisé'}
                </p>
                <Link to={`${createPageUrl('ProductDetail')}?id=${product.id}`}>
                    <h3 className="text-stone-900 font-medium group-hover:text-stone-600 transition-colors line-clamp-2">
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
                    {product.price?.toFixed(2)} €
                </p>
            </div>
        </motion.div>
    );
}