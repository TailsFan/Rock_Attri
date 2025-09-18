'use client';
import { useState, useEffect } from 'react';
import { CartItem, Product } from '../types';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('rock-attri-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rock-attri-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, selectedSize?: string, selectedColor?: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.id === product.id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
      );

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { 
          ...product, 
          quantity: 1, 
          selectedSize, 
          selectedColor 
        }];
      }
    });
  };

  const removeFromCart = (id: string, selectedSize?: string, selectedColor?: string) => {
    setCart(prevCart => 
      prevCart.filter(item => 
        !(item.id === id && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor)
      )
    );
  };

  const updateQuantity = (id: string, quantity: number, selectedSize?: string, selectedColor?: string) => {
    if (quantity <= 0) {
      removeFromCart(id, selectedSize, selectedColor);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };
}
