import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client';

import AdminHeader from '../components/admin/AdminHeader';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Image as ImageIcon,
    Loader2,
    Eye
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function AdminProducts() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category_id: '',
        category_name: '',
        image_url: '',
        featured: false,
        ingredients: []
    });

    const queryClient = useQueryClient();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => api.entities.Product.list(),
    });

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: () => api.entities.Category.list(),
    });

    const createMutation = useMutation({
        mutationFn: (data) => api.entities.Product.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Produit créé avec succès');
            handleCloseDialog();
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => api.entities.Product.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Produit mis à jour');
            handleCloseDialog();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => api.entities.Product.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Produit supprimé');
            setIsDeleteDialogOpen(false);
            setSelectedProduct(null);
        },
    });

    const handleOpenCreate = () => {
        setSelectedProduct(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            stock: '',
            category_id: '',
            category_name: '',
            image_url: '',
            featured: false,
            ingredients: []
        });
        setIsDialogOpen(true);
    };

    const handleOpenView = (product) => {
        setSelectedProduct(product);
        setIsViewDialogOpen(true);
    };

    const handleOpenEdit = (product) => {
        setSelectedProduct(product);
        setFormData({
            name: product.name || '',
            description: product.description || '',
            price: product.price?.toString() || '',
            stock: product.stock?.toString() || '',
            category_id: product.category_id || '',
            category_name: product.category_name || '',
            image_url: product.image_url || '',
            featured: product.featured || false,
            ingredients: product.ingredients || []
        });
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedProduct(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            stock: '',
            category_id: '',
            category_name: '',
            image_url: '',
            featured: false,
            ingredients: []
        });
    };

    const handleSubmit = () => {
        const category = categories.find(c => c.id === formData.category_id);
        const data = {
            ...formData,
            price: parseFloat(formData.price) || 0,
            stock: parseInt(formData.stock) || 0,
            category_name: category?.name || ''
        };

        if (selectedProduct) {
            updateMutation.mutate({ id: selectedProduct.id, data });
        } else {
            createMutation.mutate(data);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex-1">
            <AdminHeader
                title="Gestion des Produits"
                subtitle={`${products.length} produits au total`}
            />

            <main className="p-8">
                {/* Barre d'outils */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
                    <div className="relative flex-1 max-w-md">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                        <Input
                            placeholder="Rechercher un produit..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Button onClick={handleOpenCreate} className="bg-stone-900 hover:bg-stone-800">
                        <Plus size={18} className="mr-2" />
                        Ajouter un produit
                    </Button>
                </div>

                {/* Tableau */}
                <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-stone-50">
                                <TableHead className="w-12"></TableHead>
                                <TableHead>Produit</TableHead>
                                <TableHead>Catégorie</TableHead>
                                <TableHead>Prix</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead className="w-12"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8">
                                        <Loader2 className="w-6 h-6 animate-spin mx-auto text-stone-400" />
                                    </TableCell>
                                </TableRow>
                            ) : filteredProducts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8 text-stone-500">
                                        Aucun produit trouvé
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredProducts.map((product) => (
                                    <TableRow key={product.id} className="hover:bg-stone-50">
                                        <TableCell>
                                            <div className="w-12 h-12 bg-stone-100 rounded-lg overflow-hidden">
                                                {product.image_url ? (
                                                    <img
                                                        src={product.image_url}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <ImageIcon size={20} className="text-stone-400" />
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium text-stone-900">{product.name}</p>
                                                {product.featured && (
                                                    <Badge className="mt-1 bg-amber-100 text-amber-700">Featured</Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-stone-600">
                                                {product.category_name || 'Non catégorisé'}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-medium">{Number(product.price || 0).toFixed(2)} €</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className={product.stock <= 5 ? 'text-red-600 font-medium' : ''}>
                                                {product.stock || 0}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {product.stock === 0 ? (
                                                <Badge className="bg-red-600 text-white hover:bg-red-700">Rupture</Badge>
                                            ) : product.stock <= 5 ? (
                                                <Badge className="bg-orange-500 text-white hover:bg-orange-600">Stock faible</Badge>
                                            ) : (
                                                <Badge className="bg-green-600 text-white hover:bg-green-700">En stock</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center justify-end gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-stone-500 hover:text-stone-900"
                                                    onClick={() => handleOpenView(product)}
                                                >
                                                    <Eye size={16} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-stone-500 hover:text-stone-900"
                                                    onClick={() => handleOpenEdit(product)}
                                                >
                                                    <Edit size={16} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => {
                                                        setSelectedProduct(product);
                                                        setIsDeleteDialogOpen(true);
                                                    }}
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </main>

            {/* Dialogue de Création/Édition */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="font-display font-light text-xl">
                            {selectedProduct ? 'Modifier le produit' : 'Nouveau produit'}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-6 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Nom du produit *</Label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Ex: Sérum Vitamine C"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Catégorie</Label>
                                <Select
                                    value={formData.category_id || ''}
                                    onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Description du produit..."
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Prix (€) *</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="0.00"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Quantité en stock</Label>
                                <Input
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>URL de l'image</Label>
                            <Input
                                value={formData.image_url}
                                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                placeholder="https://..."
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <Checkbox
                                id="featured"
                                checked={!!formData.featured}
                                onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
                            />
                            <Label htmlFor="featured" className="cursor-pointer">
                                Produit vedette (affiché sur la page d'accueil)
                            </Label>
                        </div>

                        <div className="space-y-2">
                            <Label>Ingrédients</Label>
                            <p className="text-xs text-stone-500 mb-1">Entrez chaque ingrédient sur une nouvelle ligne</p>
                            <Textarea
                                value={Array.isArray(formData.ingredients) ? formData.ingredients.join('\n') : formData.ingredients}
                                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value.split('\n') })}
                                placeholder="Aqua&#10;Glycerin&#10;Vitamin C"
                                rows={5}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={handleCloseDialog}>
                            Annuler
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="bg-stone-900 hover:bg-stone-800"
                            disabled={!formData.name || !formData.price}
                        >
                            {createMutation.isPending || updateMutation.isPending ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : null}
                            {selectedProduct ? 'Mettre à jour' : 'Créer'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Dialogue de Visualisation */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="font-display font-light text-xl">
                            Détails du produit
                        </DialogTitle>
                    </DialogHeader>

                    {selectedProduct && (
                        <div className="grid gap-4 py-4">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 bg-stone-100 rounded-lg flex items-center justify-center overflow-hidden">
                                    {selectedProduct.image_url ? (
                                        <img
                                            src={selectedProduct.image_url}
                                            alt={selectedProduct.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <ImageIcon size={32} className="text-stone-400" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-medium text-lg">{selectedProduct.name}</h3>
                                    <div className="flex gap-2 mt-1">
                                        <Badge variant="outline">
                                            {selectedProduct.category_name || 'Non catégorisé'}
                                        </Badge>
                                        {selectedProduct.featured && (
                                            <Badge className="bg-amber-100 text-amber-700">Featured</Badge>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label className="text-stone-500">Prix</Label>
                                    <p className="text-stone-900 font-medium">
                                        {Number(selectedProduct.price || 0).toFixed(2)} €
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-stone-500">Stock</Label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-stone-900 font-medium">
                                            {selectedProduct.stock || 0} unités
                                        </span>
                                        {selectedProduct.stock === 0 ? (
                                            <Badge className="bg-red-300 text-red-900 text-xs">Rupture</Badge>
                                        ) : selectedProduct.stock <= 5 ? (
                                            <Badge className="bg-orange-300 text-orange-900 text-xs">Faible</Badge>
                                        ) : (
                                            <Badge className="bg-green-300 text-green-900 text-xs">En stock</Badge>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-stone-500">Description</Label>
                                <p className="text-stone-900 text-sm">
                                    {selectedProduct.description || <span className="italic text-stone-400">Aucune description</span>}
                                </p>
                            </div>

                            {selectedProduct.ingredients && (
                                <div className="space-y-1">
                                    <Label className="text-stone-500">Ingrédients</Label>
                                    <p className="text-stone-900 text-sm whitespace-pre-line">
                                        {Array.isArray(selectedProduct.ingredients)
                                            ? selectedProduct.ingredients.join(', ')
                                            : selectedProduct.ingredients || <span className="italic text-stone-400">Non spécifié</span>}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    <DialogFooter>
                        <Button onClick={() => setIsViewDialogOpen(false)}>
                            Fermer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Confirmation de Suppression */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer le produit ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Cette action est irréversible. Le produit "{selectedProduct?.name}" sera définitivement supprimé.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteMutation.mutate(selectedProduct?.id)}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Supprimer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
