import React, { useState, useEffect } from 'react';
import { api } from '../api/client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Shield, Edit2, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await api.auth.me();
      setUser(currentUser);
      setFormData({ full_name: currentUser.full_name });
    } catch (error) {
      toast.error('Erreur lors du chargement du profil');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await api.auth.updateMe(formData);
      toast.success('Profil mis à jour avec succès');
      setEditing(false);
      loadUser();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Accès refusé</h2>
          <p className="text-gray-600">Vous devez être connecté pour accéder à cette page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mon Profil</h1>
          <p className="text-gray-600">Gérez vos informations personnelles</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-t-xl">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">Informations du compte</CardTitle>
                <Button
                  onClick={() => editing ? handleSave() : setEditing(true)}
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  {editing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Enregistrer
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Modifier
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-8 space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-gray-700 font-medium flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nom complet
                </Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  disabled={!editing}
                  className="text-lg py-6"
                />
              </div>

              {/* Email (Read-only) */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  value={user.email}
                  disabled
                  className="text-lg py-6 bg-gray-50"
                />
                <p className="text-xs text-gray-500">L'adresse email ne peut pas être modifiée</p>
              </div>

              {/* Role (Read-only) */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-700 font-medium flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Rôle
                </Label>
                <div className="flex items-center gap-3">
                  <div className={`px-4 py-3 rounded-lg font-medium ${
                    user.role === 'admin' 
                      ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {user.role === 'admin' ? '👑 Administrateur' : '👤 Utilisateur'}
                  </div>
                </div>
              </div>

              {/* Account Info */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Informations du compte</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Compte créé le</p>
                    <p className="font-medium text-gray-900">
                      {new Date(user.created_date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Dernière mise à jour</p>
                    <p className="font-medium text-gray-900">
                      {new Date(user.updated_date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
              <p className="text-gray-600">Commandes</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-rose-50">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-rose-600 mb-2">0</div>
              <p className="text-gray-600">Produits favoris</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
              <p className="text-gray-600">Avis publiés</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

