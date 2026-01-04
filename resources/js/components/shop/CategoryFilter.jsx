import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={() => onSelectCategory(null)}
          variant={selectedCategory === null ? 'default' : 'outline'}
          className={`rounded-full transition-all duration-300 ${
            selectedCategory === null
              ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg'
              : 'border-gray-300 text-gray-700 hover:border-rose-300 hover:text-rose-500'
          }`}
        >
          Tous les produits
        </Button>
      </motion.div>

      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Button
            onClick={() => onSelectCategory(category.id)}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            className={`rounded-full transition-all duration-300 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg'
                : 'border-gray-300 text-gray-700 hover:border-rose-300 hover:text-rose-500'
            }`}
          >
            {category.name}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}