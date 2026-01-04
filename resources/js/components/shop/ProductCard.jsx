import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export default function ProductCard({ product, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={createPageUrl(`ProductDetail?id=${product.id}`)}
        className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-pink-50 to-rose-100">
          <img
            src={product.image_url || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Stock Badge */}
          {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
            <Badge className="absolute top-3 right-3 bg-orange-500 text-white border-0">
              Stock limité
            </Badge>
          )}
          {product.stock_quantity === 0 && (
            <Badge className="absolute top-3 right-3 bg-gray-500 text-white border-0">
              Épuisé
            </Badge>
          )}
          {product.featured && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white border-0">
              ⭐ Nouveauté
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category */}
          <p className="text-xs font-medium text-rose-500 uppercase tracking-wider mb-2">
            {product.category_name || 'Produit'}
          </p>

          {/* Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-rose-500 transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">{product.price}€</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}