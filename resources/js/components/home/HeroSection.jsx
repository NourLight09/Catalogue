import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-stone-100/95 via-stone-100/80 to-transparent z-10" />
                <img
                    src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920&q=80"
                    alt="Beauty Products"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-rose-200/20 blur-3xl" />
            <div className="absolute bottom-20 left-40 w-96 h-96 rounded-full bg-amber-100/30 blur-3xl" />

            {/* Content */}
            <div className="container mx-auto px-6 relative z-20">
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block text-xs tracking-[0.3em] text-stone-500 mb-6 uppercase">
                            Nouvelle Collection
                        </span>

                        <h1 className="font-display text-5xl md:text-7xl font-light text-stone-900 leading-tight mb-6">
                            Révélez votre
                            <span className="block font-normal italic text-stone-700">
                                éclat naturel
                            </span>
                        </h1>

                        <p className="text-stone-600 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
                            Des formules innovantes aux ingrédients naturels pour sublimer
                            votre beauté au quotidien.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to={createPageUrl('Catalog')}>
                                <Button
                                    size="lg"
                                    className="bg-stone-900 hover:bg-stone-800 text-white px-10 py-6 text-sm tracking-wide rounded-none"
                                >
                                    DÉCOUVRIR LA COLLECTION
                                    <ArrowRight className="ml-3" size={18} />
                                </Button>
                            </Link>
                            <Link to={createPageUrl('Categories')}>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white px-10 py-6 text-sm tracking-wide rounded-none"
                                >
                                    NOS CATÉGORIES
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span className="text-xs tracking-widest text-stone-400">SCROLL</span>
                <div className="w-px h-12 bg-gradient-to-b from-stone-400 to-transparent" />
            </motion.div>
        </section>
    );
}