import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client';

import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import { 
    Plus, 
    Search, 
    Edit, 
    Trash2, 
    Eye,
    MoreHorizontal,
    FolderTree,
    Loader2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { toast } from "sonner";

export default function AdminCategories() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        image: ''
    });

    const queryClient = useQueryClient();

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['admin-categories'],
        queryFn: () => api.entities.Category.list(),
    });

    const { data: products = [] } = useQuery({
        queryKey: ['admin-products'],
        queryFn: () => api.entities.Product.list(),
    });

    const createMutation = useMutation({
        mutationFn: (data) => api.entities.Category.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
            toast.success('Catégorie créée avec succès');
            handleCloseDialog();
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => api.entities.Category.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
            toast.success('Catégorie mise à jour');
            handleCloseDialog();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => api.entities.Category.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
            toast.success('Catégorie supprimée');
            setIsDeleteDialogOpen(false);
            setSelectedCategory(null);
        },
    });

    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleNameChange = (name) => {
        setFormData({
            ...formData,
            name,
            slug: generateSlug(name)
        });
    };

    const [imageMode, setImageMode] = useState('url'); // 'url' or 'file'
    const [selectedFile, setSelectedFile] = useState(null);

    const handleOpenCreate = () => {
        setSelectedCategory(null);
        setFormData({
            name: '',
            slug: '',
            description: '',
            image: ''
        });
        setSelectedFile(null);
        setImageMode('url');
        setIsDialogOpen(true);
    };

    const handleOpenView = (category) => {
        setSelectedCategory(category);
        setIsViewDialogOpen(true);
    };

    const handleOpenEdit = (category) => {
        setSelectedCategory(category);
        setFormData({
            name: category.name || '',
            slug: category.slug || '',
            description: category.description || '',
            image: category.image || ''
        });
        setSelectedFile(null);
        setImageMode('url');
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedCategory(null);
        setFormData({
            name: '',
            slug: '',
            description: '',
            image: ''
        });
        setSelectedFile(null);
    };

    const handleSubmit = () => {
        let dataToSend = formData;

        if (imageMode === 'file' && selectedFile) {
            const formDataObj = new FormData();
            formDataObj.append('name', formData.name);
            formDataObj.append('slug', formData.slug);
            if (formData.description) formDataObj.append('description', formData.description);
            formDataObj.append('image', selectedFile);
            dataToSend = formDataObj;
        }

        if (selectedCategory) {
            updateMutation.mutate({ id: selectedCategory.id, data: dataToSend });
        } else {
            createMutation.mutate(dataToSend);
        }
    };

    const getCategoryProductCount = (categoryId) => {
        return products.filter(p => p.category_id === categoryId).length;
    };

    const filteredCategories = categories.filter(c => 
        c.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex-1">
                <AdminHeader 
                    title="Gestion des Catégories" 
                    subtitle={`${categories.length} catégories au total`}
                />

                <main className="p-8">
                    {/* Toolbar */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
                        <div className="relative flex-1 max-w-md">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                            <Input 
                                placeholder="Rechercher une catégorie..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Button onClick={handleOpenCreate} className="bg-stone-900 hover:bg-stone-800">
                            <Plus size={18} className="mr-2" />
                            Ajouter une catégorie
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-stone-50">
                                    <TableHead>Catégorie</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Produits</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="w-12"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8">
                                            <Loader2 className="w-6 h-6 animate-spin mx-auto text-stone-400" />
                                        </TableCell>
                                    </TableRow>
                                ) : filteredCategories.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-stone-500">
                                            Aucune catégorie trouvée
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredCategories.map((category) => (
                                        <TableRow key={category.id} className="hover:bg-stone-50">
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-rose-100 to-amber-100 rounded-lg flex items-center justify-center">
                                                        <FolderTree size={18} className="text-stone-600" />
                                                    </div>
                                                    <span className="font-medium text-stone-900">{category.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <code className="text-sm bg-stone-100 px-2 py-1 rounded">
                                                    {category.slug}
                                                </code>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {getCategoryProductCount(category.id)} produits
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-stone-500 text-sm line-clamp-1">
                                                    {category.description || '-'}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="h-8 w-8 text-stone-500 hover:text-stone-900"
                                                        onClick={() => handleOpenView(category)}
                                                    >
                                                        <Eye size={16} />
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="h-8 w-8 text-stone-500 hover:text-stone-900"
                                                        onClick={() => handleOpenEdit(category)}
                                                    >
                                                        <Edit size={16} />
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                        onClick={() => {
                                                            setSelectedCategory(category);
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

            {/* Create/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="font-display font-light text-xl">
                            {selectedCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
                        </DialogTitle>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label>Nom de la catégorie *</Label>
                            <Input 
                                value={formData.name}
                                onChange={(e) => handleNameChange(e.target.value)}
                                placeholder="Ex: Soins Visage"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Slug (URL)</Label>
                            <Input 
                                value={formData.slug}
                                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                                placeholder="soins-visage"
                            />
                            <p className="text-xs text-stone-500">
                                Généré automatiquement à partir du nom
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea 
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                placeholder="Description de la catégorie..."
                                rows={3}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Image</Label>
                            <div className="flex gap-2 mb-2">
                                <button 
                                    type="button" 
                                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        imageMode === 'url' 
                                            ? 'bg-stone-900 text-white hover:bg-stone-800' 
                                            : 'bg-white text-stone-900 border border-stone-300 hover:bg-stone-50'
                                    }`}
                                    onClick={() => setImageMode('url')}
                                >
                                    Lien URL
                                </button>
                                <button 
                                    type="button" 
                                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        imageMode === 'file' 
                                            ? 'bg-stone-900 text-white hover:bg-stone-800' 
                                            : 'bg-white text-stone-900 border border-stone-300 hover:bg-stone-50'
                                    }`}
                                    onClick={() => setImageMode('file')}
                                >
                                    Fichier
                                </button>
                            </div>
                            
                            {imageMode === 'url' ? (
                                <Input 
                                    value={formData.image}
                                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                                    placeholder="https://..."
                                />
                            ) : (
                                <Input 
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                />
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={handleCloseDialog}>
                            Annuler
                        </Button>
                        <Button 
                            onClick={handleSubmit}
                            className="bg-stone-900 hover:bg-stone-800"
                            disabled={!formData.name || !formData.slug}
                        >
                            {createMutation.isPending || updateMutation.isPending ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : null}
                            {selectedCategory ? 'Mettre à jour' : 'Créer'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* View Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="font-display font-light text-xl">
                            Détails de la catégorie
                        </DialogTitle>
                    </DialogHeader>
                    
                    {selectedCategory && (
                        <div className="grid gap-4 py-4">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 bg-stone-100 rounded-lg flex items-center justify-center overflow-hidden">
                                    {selectedCategory.image ? (
                                        <img 
                                            src={selectedCategory.image} 
                                            alt={selectedCategory.name} 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <FolderTree size={32} className="text-stone-400" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-medium text-lg">{selectedCategory.name}</h3>
                                    <code className="text-sm bg-stone-100 px-2 py-1 rounded text-stone-600">
                                        {selectedCategory.slug}
                                    </code>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-stone-500">Description</Label>
                                <p className="text-stone-900">
                                    {selectedCategory.description || <span className="italic text-stone-400">Aucune description</span>}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-stone-500">Statistiques</Label>
                                <div className="flex gap-2">
                                    <Badge variant="secondary">
                                        {getCategoryProductCount(selectedCategory.id)} produits associés
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button onClick={() => setIsViewDialogOpen(false)}>
                            Fermer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer la catégorie ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Cette action est irréversible. La catégorie "{selectedCategory?.name}" sera définitivement supprimée.
                            {getCategoryProductCount(selectedCategory?.id) > 0 && (
                                <span className="block mt-2 text-orange-600">
                                    Attention : {getCategoryProductCount(selectedCategory?.id)} produit(s) sont liés à cette catégorie.
                                </span>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={() => deleteMutation.mutate(selectedCategory?.id)}
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

