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

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => api.entities.Product.list(),
    initialData: [],
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.entities.Category.list(),
    initialData: [],
  });

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.entities.User.list(),
    initialData: [],
  });

  // Calculate stats
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.stock_quantity <= 5 && p.stock_quantity > 0).length;
  const outOfStockProducts = products.filter(p => p.stock_quantity === 0).length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock_quantity || 0), 0);

  // Recent products
  const recentProducts = products.slice(0, 5);

  return (
    <div className="flex-1">
      <AdminHeader
        title="Tableau de bord"
        subtitle="Vue d'ensemble de votre boutique"
      />
      <main className="p-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-8 mb-8 text-white shadow-xl"
      >
        <h1 className="text-3xl font-bold mb-2">Bienvenue, {user?.full_name} 👋</h1>
        <p className="text-rose-100">Voici un aperçu de votre boutique Glow Cosmetics</p>
      </motion.div>

      {/* Stats Cards */}
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

      {/* Stock Alerts & Recent Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Alerts */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-xl">
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Alertes de stock
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {outOfStockProducts > 0 && (
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                    <div>
                      <p className="font-semibold text-red-700">Rupture de stock</p>
                      <p className="text-sm text-red-600">{outOfStockProducts} produit(s)</p>
                    </div>
                    <div className="text-2xl font-bold text-red-700">{outOfStockProducts}</div>
                  </div>
                )}

                {lowStockProducts > 0 && (
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div>
                      <p className="font-semibold text-orange-700">Stock faible</p>
                      <p className="text-sm text-orange-600">{lowStockProducts} produit(s)</p>
                    </div>
                    <div className="text-2xl font-bold text-orange-700">{lowStockProducts}</div>
                  </div>
                )}

                {outOfStockProducts === 0 && lowStockProducts === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Package className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-gray-600">Tous les stocks sont au bon niveau ✓</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Products */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-xl">
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Produits récents
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {recentProducts.length > 0 ? (
                  recentProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <img
                        src={product.image_url || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100'}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.price}€</p>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        product.stock_quantity > 5
                          ? 'bg-green-100 text-green-700'
                          : product.stock_quantity > 0
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {product.stock_quantity} en stock
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Aucun produit
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

