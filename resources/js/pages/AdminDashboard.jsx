import React, { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import AdminHeader from '../components/admin/AdminHeader';
import { ShoppingBag, Package, Users, TrendingUp } from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await api.auth.me();
        setUser(currentUser);
      } catch (error) {
        console.error('Error loading user:', error);
      }
    };
    loadUser();
  }, []);

  const { data: products = [], isError: isProductsError, error: productsError } = useQuery({
    queryKey: ['products'],
    queryFn: () => api.entities.Product.list(),
    initialData: [],
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.entities.Category.list(),
    initialData: [],
  });

  const { data: users = [], isError: isUsersError, error: usersError } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.entities.User.list(),
    initialData: [],
  });

  React.useEffect(() => {
    if (isProductsError) {
      console.error('Products fetch error:', productsError);
    }
    if (isUsersError) {
      console.error('Users fetch error:', usersError);
      // Optional: toast.error if you want visibility
    }
  }, [isProductsError, isUsersError, productsError, usersError]);

  // Calculer les statistiques
  const totalProducts = products.length;
  const lowStockItems = products.filter(p => p.stock <= 5 && p.stock > 0);
  const outOfStockItems = products.filter(p => p.stock === 0);
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);

  // Calculer la répartition par catégorie
  const categoryStats = categories.map(cat => ({
    name: cat.name,
    count: products.filter(p => p.category_id === cat.id).length,
    percentage: totalProducts > 0 ? Math.round((products.filter(p => p.category_id === cat.id).length / totalProducts) * 100) : 0
  })).sort((a, b) => b.count - a.count);

  // Produits récents
  const recentProducts = products.slice(0, 5);

  return (
    <div className="flex-1">
      <AdminHeader
        title="Tableau de bord"
        subtitle="Vue d'ensemble de votre boutique"
      />
      <main className="p-8">
        {/* Bannière de bienvenue */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-8 mb-8 text-white shadow-xl"
        >
          <h1 className="text-3xl font-bold mb-2">Bienvenue, {user?.name} 👋</h1>
          <p className="text-rose-100">Voici un aperçu de votre boutique Glow Cosmetics</p>
        </motion.div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Produits"
            value={totalProducts}
            icon={ShoppingBag}
            trend="+12% ce mois"
            color="rose"
          />
          <StatsCard
            title="Catégories"
            value={categories.length}
            icon={Package}
            color="blue"
          />
          <StatsCard
            title="Utilisateurs"
            value={users.length}
            icon={Users}
            trend="+8% ce mois"
            color="green"
          />
          <StatsCard
            title="Stock Total"
            value={totalStock}
            icon={TrendingUp}
            color="purple"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alertes de stock */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="border-0 shadow-lg h-full">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-xl">
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Alertes de stock
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {outOfStockItems.length > 0 && (
                    <div>
                      <h3 className="text-red-600 font-semibold mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-600"></span>
                        Rupture de stock ({outOfStockItems.length})
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {outOfStockItems.map(product => (
                          <div key={product.id} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                            <div className="w-10 h-10 bg-white rounded-md overflow-hidden flex-shrink-0">
                              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-stone-900 truncate">{product.name}</p>
                              <p className="text-xs text-red-600 font-medium">Stock: 0</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {lowStockItems.length > 0 && (
                    <div>
                      <h3 className="text-orange-600 font-semibold mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-600"></span>
                        Stock faible ({lowStockItems.length})
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {lowStockItems.map(product => (
                          <div key={product.id} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-100">
                            <div className="w-10 h-10 bg-white rounded-md overflow-hidden flex-shrink-0">
                              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-stone-900 truncate">{product.name}</p>
                              <p className="text-xs text-orange-600 font-medium">Stock: {product.stock}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {outOfStockItems.length === 0 && lowStockItems.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Package className="w-8 h-8 text-green-600" />
                      </div>
                      <p className="text-stone-600 font-medium">Tous les stocks sont au bon niveau</p>
                      <p className="text-stone-400 text-sm">Aucune alerte à signaler</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Répartition par catégorie (Quota) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-0 shadow-lg h-full">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-xl">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Répartition (Quota)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {categoryStats.map((stat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-stone-700">{stat.name}</span>
                        <span className="text-stone-500">{stat.count} produits ({stat.percentage}%)</span>
                      </div>
                      <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${stat.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}

                  {categoryStats.length === 0 && (
                    <div className="text-center py-8 text-stone-500">
                      Aucune catégorie
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

