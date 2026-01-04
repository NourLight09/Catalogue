import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { api } from '../api/client';

import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, Package, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/shop/ProductCard';

export default function ProductDetail() {
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setProductId(params.get('id'));
  }, []);

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => api.entities.Product.list(),
    initialData: [],
  });

  const product = products.find(p => p.id === Number(productId));
  const relatedProducts = products
    .filter(p => p.id !== productId && p.category_id === product?.category_id)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Produit introuvable</h2>
          <Link to={createPageUrl('Catalog')}>
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au catalogue
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to={createPageUrl('Catalog')}
            className="inline-flex items-center text-sm text-gray-600 hover:text-rose-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au catalogue
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-24">
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-pink-50 to-rose-100 shadow-2xl">
                <img
                  src={product.image_url || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Category Badge */}
            <Badge className="bg-rose-100 text-rose-700 border-0 text-sm px-4 py-1">
              {product.category_name || 'Produit'}
            </Badge>

            {/* Name */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-600">(128 avis)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-bold text-gray-900">{product.price}€</span>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.stock_quantity > 0 ? (
                <>
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-green-700 font-medium">
                    En stock ({product.stock_quantity} disponibles)
                  </span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-red-700 font-medium">Rupture de stock</span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description || 'Aucune description disponible.'}
              </p>
            </div>

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">Ingrédients</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="inline-block bg-stone-100 text-stone-600 text-sm px-3 py-1 rounded-full"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-rose-500" />
                Points forts
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 mt-1">✓</span>
                  <span>Formule naturelle et respectueuse de la peau</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 mt-1">✓</span>
                  <span>Non testé sur les animaux</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 mt-1">✓</span>
                  <span>Fabriqué en France</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 mt-1">✓</span>
                  <span>Livraison gratuite dès 50€</span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:shadow-2xl transition-all py-7 text-lg"
              disabled={product.stock_quantity === 0}
            >
              {product.stock_quantity > 0 ? 'Ajouter au panier' : 'Produit indisponible'}
            </Button>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Produits similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

