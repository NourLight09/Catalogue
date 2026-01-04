import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function ProductFilters({ 
    categories = [], 
    selectedCategory, 
    onCategoryChange,
    priceRange,
    onPriceChange,
    onReset,
    isMobile = false
}) {
    const FilterContent = () => (
        <div className="space-y-6">
            <Accordion type="multiple" defaultValue={["categories", "price"]} className="w-full">
                <AccordionItem value="categories" className="border-none">
                    <AccordionTrigger className="text-sm font-medium tracking-wide uppercase py-4 hover:no-underline">
                        Catégories
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 pt-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <Checkbox 
                                    checked={!selectedCategory}
                                    onCheckedChange={() => onCategoryChange(null)}
                                    className="rounded-none border-stone-300"
                                />
                                <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                                    Toutes les catégories
                                </span>
                            </label>
                            {categories.map((category) => (
                                <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
                                    <Checkbox 
                                        checked={selectedCategory === category.slug}
                                        onCheckedChange={() => onCategoryChange(category.slug)}
                                        className="rounded-none border-stone-300"
                                    />
                                    <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                                        {category.name}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="price" className="border-none">
                    <AccordionTrigger className="text-sm font-medium tracking-wide uppercase py-4 hover:no-underline">
                        Prix
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="pt-4 pb-2">
                            <Slider
                                value={priceRange}
                                onValueChange={onPriceChange}
                                max={200}
                                step={5}
                                className="mb-4"
                            />
                            <div className="flex justify-between text-sm text-stone-600">
                                <span>{priceRange[0]} €</span>
                                <span>{priceRange[1]} €</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="stock" className="border-none">
                    <AccordionTrigger className="text-sm font-medium tracking-wide uppercase py-4 hover:no-underline">
                        Disponibilité
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 pt-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <Checkbox className="rounded-none border-stone-300" />
                                <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                                    En stock
                                </span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <Checkbox className="rounded-none border-stone-300" />
                                <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                                    Bientôt disponible
                                </span>
                            </label>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Button 
                variant="outline" 
                className="w-full rounded-none border-stone-300 text-stone-600"
                onClick={onReset}
            >
                <X size={16} className="mr-2" />
                Réinitialiser les filtres
            </Button>
        </div>
    );

    if (isMobile) {
        return (
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" className="rounded-none border-stone-300">
                        <SlidersHorizontal size={16} className="mr-2" />
                        Filtres
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                    <SheetHeader>
                        <SheetTitle className="text-left font-display text-xl font-light">
                            Filtres
                        </SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                        <FilterContent />
                    </div>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <div className="w-64 flex-shrink-0">
            <h3 className="text-lg font-display font-light mb-6">Filtres</h3>
            <FilterContent />
        </div>
    );
}