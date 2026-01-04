import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { Link } from 'react-router-dom';

export default function CartSidebar() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Mon Panier ({cart.length})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <ShoppingBag className="w-16 h-16 text-gray-200" />
              <p className="text-gray-500 font-medium">Votre panier est vide</p>
              <Button 
                variant="outline" 
                onClick={() => setIsCartOpen(false)}
              >
                Continuer mes achats
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={item.image_url || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                    <p className="text-sm text-gray-500 mb-2">{item.price}€</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 border rounded-md p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{cartTotal.toFixed(2)}€</span>
            </div>
            <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-6 text-lg">
              Commander
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
