import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';

import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
import { ChevronDown, Grid3X3, LayoutGrid, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Products() {
    const urlParams = new URLSearchParams(window.location.search);
    const initialCategory = urlParams.get('category');

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [priceRange, setPriceRange] = useState([0, 200]);
    const [sortBy, setSortBy] = useState('newest');
    const [viewMode, setViewMode] = useState('grid');

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: () => api.entities.Category.list(),
    });

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => api.entities.Product.list(),
    });

    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Filter by category
        if (selectedCategory) {
            const category = categories.find(c => c.slug === selectedCategory);
            if (category) {
                result = result.filter(p => p.category_id === category.id);
            }
        }

        // Filter by price
        result = result.filter(p => 
            (p.price || 0) >= priceRange[0] && (p.price || 0) <= priceRange[1]
        );

        // Sort
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => (a.price || 0) - (b.price || 0));
                break;
            case 'price-desc':
                result.sort((a, b) => (b.price || 0) - (a.price || 0));
                break;
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                // newest - keep original order
                break;
        }

        return result;
    }, [products, categories, selectedCategory, priceRange, sortBy]);

    const handleReset = () => {
        setSelectedCategory(null);
        setPriceRange([0, 200]);
        setSortBy('newest');
    };

    const selectedCategoryName = categories.find(c => c.slug === selectedCategory)?.name;

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Banner */}
            <div className="relative h-64 md:h-80 bg-stone-100 overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1920&q=80"
                    alt="Boutique"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-900/40 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-6">
                        <span className="text-xs tracking-[0.3em] text-stone-300 uppercase">
                            Notre Collection
                        </span>
                        <h1 className="font-display text-4xl md:text-5xl font-light text-white mt-2">
                            {selectedCategoryName || 'Tous nos produits'}
                        </h1>
                        <p className="text-stone-200 mt-4 max-w-md">
                            Découvrez notre sélection de produits de beauté soigneusement choisis
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="flex gap-12">
                    {/* Desktop Filters */}
                    <div className="hidden lg:block">
                        <ProductFilters 
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                            priceRange={priceRange}
                            onPriceChange={setPriceRange}
                            onReset={handleReset}
                        />
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-100">
                            <div className="flex items-center gap-4">
                                {/* Mobile Filters */}
                                <div className="lg:hidden">
                                    <ProductFilters 
                                        categories={categories}
                                        selectedCategory={selectedCategory}
                                        onCategoryChange={setSelectedCategory}
                                        priceRange={priceRange}
                                        onPriceChange={setPriceRange}
                                        onReset={handleReset}
                                        isMobile
                                    />
                                </div>
                                <p className="text-sm text-stone-500">
                                    <span className="font-medium text-stone-900">{filteredProducts.length}</span> produits
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-48 rounded-none border-stone-200">
                                        <SelectValue placeholder="Trier par" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="newest">Plus récents</SelectItem>
                                        <SelectItem value="price-asc">Prix croissant</SelectItem>
                                        <SelectItem value="price-desc">Prix décroissant</SelectItem>
                                        <SelectItem value="name">Alphabétique</SelectItem>
                                    </SelectContent>
                                </Select>

                                <div className="hidden md:flex border border-stone-200">
                                    <button 
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 ${viewMode === 'grid' ? 'bg-stone-100' : 'hover:bg-stone-50'}`}
                                    >
                                        <Grid3X3 size={18} className="text-stone-600" />
                                    </button>
                                    <button 
                                        onClick={() => setViewMode('large')}
                                        className={`p-2 ${viewMode === 'large' ? 'bg-stone-100' : 'hover:bg-stone-50'}`}
                                    >
                                        <LayoutGrid size={18} className="text-stone-600" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Products */}
                        {isLoading ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="w-8 h-8 animate-spin text-stone-400" />
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Grid3X3 size={32} className="text-stone-400" />
                                </div>
                                <h3 className="text-xl font-medium text-stone-900 mb-2">
                                    Aucun produit trouvé
                                </h3>
                                <p className="text-stone-500 mb-6">
                                    Essayez de modifier vos filtres
                                </p>
                                <Button onClick={handleReset} variant="outline" className="rounded-none">
                                    Réinitialiser les filtres
                                </Button>
                            </div>
                        ) : (
                            <div className={`grid gap-6 md:gap-8 ${
                                viewMode === 'large' 
                                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                                    : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                            }`}>
                                {filteredProducts.map((product, index) => (
                                    <ProductCard key={product.id} product={product} index={index} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

