import React, { useState, useEffect } from 'react';

import { Bell, Search, LogOut, User, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminHeader({ title, subtitle }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Mock user data - replace with real API when ready
        setUser({
            full_name: 'Admin User',
            email: 'admin@catalogue-glow.com',
            role: 'admin'
        });
    }, []);

    const handleLogout = () => {
        // TODO: Implement logout when API is ready
        window.location.href = '/';
    };

    return (
        <header className="bg-white border-b border-stone-200 px-8 py-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-display font-light text-stone-900">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-sm text-stone-500 mt-1">{subtitle}</p>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="relative hidden md:block">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                        <Input 
                            placeholder="Rechercher..."
                            className="pl-10 w-64 rounded-lg border-stone-200"
                        />
                    </div>

                    {/* Notifications */}
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell size={20} className="text-stone-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
                    </Button>

                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-3 pl-4 border-l border-stone-200 cursor-pointer hover:bg-stone-50 rounded px-2 py-1">
                                <div className="w-9 h-9 bg-gradient-to-br from-rose-100 to-amber-100 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-medium text-stone-700">
                                        {user?.full_name?.charAt(0) || 'A'}
                                    </span>
                                </div>
                                <div className="text-left hidden md:block">
                                    <p className="text-sm font-medium text-stone-900">
                                        {user?.full_name || 'Admin'}
                                    </p>
                                    <p className="text-xs text-stone-500">Administrateur</p>
                                </div>
                                <ChevronDown size={16} className="text-stone-400" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem>
                                <User size={16} className="mr-2" />
                                Mon Profil
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                                <LogOut size={16} className="mr-2" />
                                Déconnexion
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}