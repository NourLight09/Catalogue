import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function PromoBanner() {
    return (
        <section className="py-24 bg-gradient-to-br from-rose-50 via-amber-50/50 to-stone-50">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -top-8 -left-8 w-64 h-64 bg-rose-200/30 rounded-full blur-3xl" />
                        <div className="relative aspect-[4/5] overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80"
                                alt="Routine Beauté"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-white shadow-2xl p-6 flex flex-col justify-center">
                            <p className="text-4xl font-display font-light text-stone-900">-20%</p>
                            <p className="text-sm text-stone-500 mt-1">sur votre première commande</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:pl-12"
                    >
                        <span className="text-xs tracking-[0.3em] text-rose-400 uppercase">Offre Exclusive</span>
                        <h2 className="font-display text-4xl md:text-5xl font-light text-stone-900 mt-4 leading-tight">
                            Créez votre routine
                            <span className="block italic text-stone-600">sur mesure</span>
                        </h2>
                        <p className="text-stone-600 text-lg leading-relaxed mt-6 mb-8">
                            Découvrez nos coffrets personnalisés et bénéficiez de conseils
                            d'experts pour une routine adaptée à votre type de peau.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to={createPageUrl('Catalog')}>
                                <Button
                                    size="lg"
                                    className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-6 text-sm tracking-wide rounded-none"
                                >
                                    JE DÉCOUVRE
                                    <ArrowRight className="ml-2" size={18} />
                                </Button>
                            </Link>
                        </div>

                        <div className="mt-12 pt-8 border-t border-stone-200">
                            <div className="grid grid-cols-3 gap-8">
                                <div>
                                    <p className="text-3xl font-display font-light text-stone-900">98%</p>
                                    <p className="text-sm text-stone-500 mt-1">Ingrédients naturels</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-display font-light text-stone-900">15K+</p>
                                    <p className="text-sm text-stone-500 mt-1">Clientes satisfaites</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-display font-light text-stone-900">100%</p>
                                    <p className="text-sm text-stone-500 mt-1">Cruelty free</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}