import React, { useState } from 'react';
import { api } from '../api/client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { User, Shield, Search, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function AdminUsers() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.entities.User.list(),
    initialData: [],
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, role }) => api.entities.User.update(id, { role }),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('Rôle mis à jour');
      handleCloseDialog();
    },
  });

  const handleOpenDialog = (user) => {
    setEditingUser(user);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingUser(null);
  };

  const handleToggleRole = () => {
    if (editingUser) {
      const newRole = editingUser.role === 'admin' ? 'user' : 'admin';
      updateMutation.mutate({ id: editingUser.id, role: newRole });
    }
  };

  const filteredUsers = users.filter(user =>
    user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const adminCount = users.filter(u => u.role === 'admin').length;
  const userCount = users.filter(u => u.role === 'user').length;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Gestion des Utilisateurs</h2>
        <p className="text-gray-600 mt-1">
          {users.length} utilisateur{users.length > 1 ? 's' : ''} enregistré{users.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total</p>
                  <p className="text-3xl font-bold text-gray-900">{users.length}</p>
                </div>
                <User className="w-12 h-12 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Administrateurs</p>
                  <p className="text-3xl font-bold text-gray-900">{adminCount}</p>
                </div>
                <Shield className="w-12 h-12 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-rose-50 to-pink-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Utilisateurs</p>
                  <p className="text-3xl font-bold text-gray-900">{userCount}</p>
                </div>
                <User className="w-12 h-12 text-rose-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 shadow-xl">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto" />
              </div>
            ) : filteredUsers.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Utilisateur</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rôle</TableHead>
                      <TableHead>Date d'inscription</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {user.full_name?.charAt(0).toUpperCase() || 'U'}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.full_name}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600">{user.email}</TableCell>
                        <TableCell>
                          {user.role === 'admin' ? (
                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
                              👑 Administrateur
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-700 border-0">
                              👤 Utilisateur
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {new Date(user.created_date).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenDialog(user)}
                            className="hover:bg-rose-50 hover:border-rose-300"
                          >
                            <Edit2 className="w-4 h-4 mr-2" />
                            Modifier
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="p-12 text-center">
                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun utilisateur trouvé</h3>
                <p className="text-gray-600">Essayez avec un autre terme de recherche</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Edit User Role Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier le rôle</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {editingUser.full_name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{editingUser.full_name}</p>
                  <p className="text-sm text-gray-600">{editingUser.email}</p>
                </div>
              </div>

              <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg">
                <p className="text-sm text-gray-600 mb-3">Rôle actuel :</p>
                {editingUser.role === 'admin' ? (
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 text-sm py-2 px-4">
                    👑 Administrateur
                  </Badge>
                ) : (
                  <Badge className="bg-gray-100 text-gray-700 border-0 text-sm py-2 px-4">
                    👤 Utilisateur
                  </Badge>
                )}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  {editingUser.role === 'admin'
                    ? '⚠️ Retirer les droits administrateur empêchera cet utilisateur d\'accéder au panneau d\'administration.'
                    : '✓ Accorder les droits administrateur permettra à cet utilisateur de gérer la plateforme.'}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCloseDialog}>
              Annuler
            </Button>
            <Button
              onClick={handleToggleRole}
              className={
                editingUser?.role === 'admin'
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
              }
              disabled={updateMutation.isPending}
            >
              {editingUser?.role === 'admin' ? 'Rétrograder en utilisateur' : 'Promouvoir en admin'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

