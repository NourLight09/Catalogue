import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import HeroSection from '../components/home/HeroSection';
import CategoryShowcase from '../components/home/CategoryShowcase';
import FeaturedProducts from '../components/home/FeaturedProducts';
import PromoBanner from '../components/home/PromoBanner';

export default function Home() {
    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: () => api.entities.Category.list(),
    });

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['featured-products'],
        queryFn: async () => {
            const allProducts = await api.entities.Product.list();
            return allProducts.filter(p => !p.featured || p.featured).slice(0, 4); // Debug: show all or active
            // Reverting debug:
            return allProducts.filter(p => p.featured).slice(0, 4);
        },
    });

    return (
        <div>
            <HeroSection />
            <CategoryShowcase categories={categories} />
            <FeaturedProducts products={products} isLoading={isLoading} />
            <PromoBanner />
        </div>
    );
}

