import React, { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';
import CategoryFilter from '@/components/shop/CategoryFilter';
import { motion } from 'framer-motion';

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => api.entities.Product.list('-created_date', 100),
    initialData: [],
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.entities.Category.list(),
    initialData: [],
  });

  // Check URL params for category filter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryId = params.get('category');
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
  }, []);

  // Filter products
  const filteredProducts = products.filter(product => {
    let matchesCategory = !selectedCategory;

    if (selectedCategory) {
      // Check if selectedCategory is an ID or a Slug
      const categoryBySlug = categories.find(c => c.slug === selectedCategory);
      const categoryIdToCheck = categoryBySlug ? categoryBySlug.id : Number(selectedCategory);

      matchesCategory = product.category_id === categoryIdToCheck;
    }

    const matchesSearch = !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50/30 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Notre Catalogue</h1>
            <p className="text-lg text-rose-100">
              Découvrez notre collection complète de produits de beauté
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 rounded-full border-gray-200 focus:border-rose-300 focus:ring-rose-300"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Products Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{filteredProducts.length}</span> produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Products Grid */}
        {productsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-600">
              Essayez de modifier vos filtres ou votre recherche
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

