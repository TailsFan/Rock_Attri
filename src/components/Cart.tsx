'use client';

import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { CartItem } from '../types';
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet"
import { ScrollArea } from './ui/scroll-area';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  onRemoveItem: (id: string, selectedSize?: string, selectedColor?: string) => void;
  onClearCart: () => void;
  totalPrice: number;
}

export function Cart({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart,
  totalPrice 
}: CartProps) {
  const [showOrderComplete, setShowOrderComplete] = useState(false);

  const handleCheckout = () => {
    setShowOrderComplete(true);
    setTimeout(() => {
      setShowOrderComplete(false);
      onClearCart();
      onClose();
    }, 2000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex flex-col w-full sm:max-w-md p-0">
        <SheetHeader className="p-4 border-b">
           <SheetTitle className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <span>Корзина</span>
              {cart.length > 0 && (
                <Badge variant="secondary">{totalItems}</Badge>
              )}
            </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-hidden">
           {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg mb-2">Корзина пуста</h3>
              <p className="text-muted-foreground">
                Добавьте товары для оформления заказа
              </p>
            </div>
          ) : (
             <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {cart.map((item) => (
                    <Card key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="overflow-hidden">
                      <CardContent className="p-3">
                        <div className="flex space-x-3">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-16 h-16 object-cover rounded"
                          />
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium line-clamp-2 mb-1">
                              {item.name}
                            </h4>
                            
                            <div className="flex flex-wrap gap-1 text-xs text-muted-foreground mb-2">
                              {item.selectedSize && (
                                <span>Размер: {item.selectedSize}</span>
                              )}
                              {item.selectedColor && (
                                <span>Цвет: {item.selectedColor}</span>
                              )}
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-primary">
                                {formatPrice(item.price)}
                              </span>
                              
                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => onUpdateQuantity(
                                    item.id, 
                                    item.quantity - 1, 
                                    item.selectedSize, 
                                    item.selectedColor
                                  )}
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                
                                <span className="w-8 text-center text-sm font-medium">
                                  {item.quantity}
                                </span>
                                
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => onUpdateQuantity(
                                    item.id, 
                                    item.quantity + 1, 
                                    item.selectedSize, 
                                    item.selectedColor
                                  )}
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                           <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 self-start text-muted-foreground hover:text-destructive"
                              onClick={() => onRemoveItem(
                                item.id, 
                                item.selectedSize, 
                                item.selectedColor
                              )}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
             </ScrollArea>
          )}
        </div>

        {cart.length > 0 && (
          <SheetFooter className="p-4 border-t">
             <div className="w-full space-y-4">
                <div className="flex justify-between items-center text-lg">
                    <span>Итого:</span>
                    <span className="font-bold text-primary">
                        {formatPrice(totalPrice)}
                    </span>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-2">
                    <Button 
                        variant="outline" 
                        onClick={onClearCart}
                        >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Очистить
                    </Button>
                    <Button 
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={handleCheckout}
                    >
                        Оформить заказ
                    </Button>
                </div>
             </div>
          </SheetFooter>
        )}
      </SheetContent>

      <AlertDialog open={showOrderComplete}>
        <AlertDialogContent className="max-w-[320px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Заказ оформлен!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Спасибо за покупку! Ваш заказ успешно оформлен.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </Sheet>
  );
}
