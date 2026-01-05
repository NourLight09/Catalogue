import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import Layout from './Layout';
import { CartProvider } from './contexts/CartContext';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import Catalog from './pages/Catalog';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminCategories from './pages/AdminCategories';
import AdminStock from './pages/AdminStock';
import AdminUsers from './pages/AdminUsers';

// Créer un client pour React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // Les données ne deviennent jamais obsolètes
      gcTime: Infinity, // Les données en cache ne sont jamais supprimées
      retry: 1,
    },
  },
});

// Définir les routes avec les noms de page pour la mise en page
const routes = [
  { path: '/app', element: <Home />, name: 'Home' },
  { path: '/app/products', element: <Products />, name: 'Products' },
  { path: '/app/product', element: <ProductDetail />, name: 'ProductDetail' },
  { path: '/app/categories', element: <Categories />, name: 'Categories' },
  { path: '/app/catalog', element: <Catalog />, name: 'Catalog' },
  { path: '/app/profile', element: <Profile />, name: 'Profile' },
  { path: '/app/admin/dashboard', element: <AdminDashboard />, name: 'AdminDashboard' },
  { path: '/app/admin/products', element: <AdminProducts />, name: 'AdminProducts' },
  { path: '/app/admin/categories', element: <AdminCategories />, name: 'AdminCategories' },
  { path: '/app/admin/stock', element: <AdminStock />, name: 'AdminStock' },
  { path: '/app/admin/users', element: <AdminUsers />, name: 'AdminUsers' },
];

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout currentPageName={route.name}>
                    {route.element}
                  </Layout>
                }
              />
            ))}
            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/app" replace />} />
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </CartProvider>
    </QueryClientProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);

