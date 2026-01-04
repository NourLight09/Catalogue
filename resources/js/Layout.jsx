import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { api } from './api/client';

import { Menu, X, ShoppingBag, User, LogOut, LayoutDashboard, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.role === 'admin';
  const isAdminPage = currentPageName?.startsWith('Admin');
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const currentUser = await api.auth.me();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Redirect logic for Admin Pages
  useEffect(() => {
    if (!loading && isAdminPage) {
      if (!user) {
        // Not logged in -> Go to Login
        window.location.href = '/login';
      } else if (user.role !== 'admin') {
        // Logged in but not admin -> Go Home
        window.location.href = '/app';
      }
    }
  }, [loading, isAdminPage, user]);

  const handleLogout = async () => {
    try {
      await api.auth.logout();
    } catch (error) {
      window.location.href = '/';
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
    </div>;
  }

  if (isAdminPage && user?.role === 'admin') {
    return (
      <div className="min-h-screen bg-gray-50">
        <style>{`
          :root {
            --primary-rose: #f8e8e8;
            --gold: #d4af37;
            --dark: #2d2d2d;
          }
        `}</style>

        {/* Admin Sidebar */}
        <div className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl z-50">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Glow Admin</h1>
                <p className="text-xs text-gray-400">Cosmetics Management</p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            <Link
              to={createPageUrl('AdminDashboard')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentPageName === 'AdminDashboard'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                : 'text-gray-300 hover:bg-gray-700'
                }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">Tableau de bord</span>
            </Link>

            <Link
              to={createPageUrl('AdminCategories')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentPageName === 'AdminCategories'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                : 'text-gray-300 hover:bg-gray-700'
                }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="font-medium">Catégories</span>
            </Link>

            <Link
              to={createPageUrl('AdminProducts')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentPageName === 'AdminProducts'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                : 'text-gray-300 hover:bg-gray-700'
                }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="font-medium">Produits</span>
            </Link>

            <Link
              to={createPageUrl('AdminStock')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentPageName === 'AdminStock'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                : 'text-gray-300 hover:bg-gray-700'
                }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="font-medium">Stocks</span>
            </Link>

            <Link
              to={createPageUrl('AdminUsers')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentPageName === 'AdminUsers'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                : 'text-gray-300 hover:bg-gray-700'
                }`}
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Utilisateurs</span>
            </Link>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
            <Button
              onClick={() => window.location.href = createPageUrl('Home')}
              variant="outline"
              className="w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
            >
              Retour au site
            </Button>
          </div>
        </div>

        {/* Admin Content */}
        <div className="ml-64 min-h-screen">
          <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="px-8 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{currentPageName?.replace('Admin', '')}</h2>
                <p className="text-sm text-gray-500">Gestion de la plateforme</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.full_name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </header>
          <main className="p-8">{children}</main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        :root {
          --primary-rose: #fdf4f4;
          --gold: #d4af37;
          --dark: #2d2d2d;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-rose-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                  Glow Cosmetics
                </h1>
                <p className="text-xs text-gray-500 tracking-wider">BEAUTY & CARE</p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                to={createPageUrl('Home')}
                className={`text-sm font-medium transition-colors ${currentPageName === 'Home'
                  ? 'text-rose-500 border-b-2 border-rose-500'
                  : 'text-gray-700 hover:text-rose-500'
                  }`}
              >
                Accueil
              </Link>
              <Link
                to={createPageUrl('Catalog')}
                className={`text-sm font-medium transition-colors ${currentPageName === 'Catalog'
                  ? 'text-rose-500 border-b-2 border-rose-500'
                  : 'text-gray-700 hover:text-rose-500'
                  }`}
              >
                Catalogue
              </Link>

              {!loading && (
                <>
                  {user && isAdmin && (
                    <>
                      <Link
                        to={createPageUrl('AdminDashboard')}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm font-medium hover:shadow-lg transition-all"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Administration
                      </Link>
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        size="sm"
                        className="border-rose-200 text-rose-600 hover:bg-rose-50"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Déconnexion
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100 space-y-2">
              <Link
                to={createPageUrl('Home')}
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-500 rounded-lg"
              >
                Accueil
              </Link>
              <Link
                to={createPageUrl('Catalog')}
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-500 rounded-lg"
              >
                Catalogue
              </Link>
              {user && isAdmin && (
                <>
                  <Link
                    to={createPageUrl('AdminDashboard')}
                    className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-500 rounded-lg"
                  >
                    Administration
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Glow Cosmetics</h3>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Révélez votre beauté naturelle avec nos produits de soins et cosmétiques de haute qualité.
              </p>
              <p className="text-sm text-gray-500">© 2024 Glow Cosmetics. Tous droits réservés.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-rose-400">Navigation</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to={createPageUrl('Home')} className="hover:text-rose-400 transition-colors">Accueil</Link></li>
                <li><Link to={createPageUrl('Catalog')} className="hover:text-rose-400 transition-colors">Catalogue</Link></li>
                {/* Profile Link Removed */}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-rose-400">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>contact@glowcosmetics.com</li>
                <li>+33 1 23 45 67 89</li>
                <li>Paris, France</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
