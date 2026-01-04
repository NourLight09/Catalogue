import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
    LayoutDashboard,
    Package,
    FolderTree,
    Users,
    BarChart3,
    Settings,
    ArrowLeft,
    Boxes
} from 'lucide-react';

const menuItems = [
    { name: 'Tableau de bord', icon: LayoutDashboard, page: 'AdminDashboard', path: '/app/admin/dashboard' },
    { name: 'Produits', icon: Package, page: 'AdminProducts', path: '/app/admin/products' },
    { name: 'Catégories', icon: FolderTree, page: 'AdminCategories', path: '/app/admin/categories' },
    { name: 'Stocks', icon: Boxes, page: 'AdminStock', path: '/app/admin/stock' },
];

export default function AdminSidebar() {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <aside className="w-64 bg-stone-900 min-h-screen fixed left-0 top-0 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-stone-800">
                <Link to={createPageUrl('Home')} className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-amber-400 rounded-lg flex items-center justify-center">
                        <span className="font-display font-bold text-stone-900">G</span>
                    </div>
                    <div>
                        <span className="font-display text-lg font-light tracking-wide">GLOW</span>
                        <span className="block text-xs text-stone-400">Administration</span>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = currentPath.includes(item.path.split('/').pop());
                    return (
                        <Link
                            key={item.page}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                ? 'bg-white text-stone-900'
                                : 'text-stone-400 hover:bg-stone-800 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} />
                            <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Back to site */}
            <div className="p-4 border-t border-stone-800">
                <Link
                    to={createPageUrl('Home')}
                    className="flex items-center gap-3 px-4 py-3 text-stone-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span className="text-sm">Retour au site</span>
                </Link>
            </div>
        </aside>
    );
}