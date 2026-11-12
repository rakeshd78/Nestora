import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, selectedMaterial?: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  totalItemsCount: number;
  promoCode: string;
  promoError: string;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'nestora_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [promoCode, setPromoCode] = useState<string>('');
  const [promoError, setPromoError] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Could not save cart:', e);
    }
  }, [items]);

  const addToCart = (product: Product, selectedMaterial?: string, quantity: number = 1) => {
    const material = selectedMaterial || product.materials[0] || 'Standard';
    const itemId = `${product.id}-${material.toLowerCase().replace(/\s+/g, '-')}`;

    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === itemId);
      if (existing) {
        return prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prevItems,
        {
          id: itemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
          selectedMaterial: material,
          image: product.heroImage,
        },
      ];
    });

    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode('');
    setDiscountPercent(0);
    setPromoError('');
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const applyPromoCode = (code: string): boolean => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'NESTORA10') {
      setPromoCode(cleaned);
      setDiscountPercent(0.10);
      setPromoError('');
      return true;
    } else if (cleaned === 'ARCHITECT15') {
      setPromoCode(cleaned);
      setDiscountPercent(0.15);
      setPromoError('');
      return true;
    } else {
      setPromoError('Invalid promotion code. Try NESTORA10 for 10% off.');
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercent(0);
    setPromoError('');
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round(subtotal * discountPercent);
  // Free white-glove shipping on orders over $2,000, else $120
  const shipping = items.length === 0 ? 0 : subtotal >= 2000 ? 0 : 120;
  const total = Math.max(0, subtotal - discount + shipping);
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        shipping,
        discount,
        total,
        totalItemsCount,
        promoCode,
        promoError,
        applyPromoCode,
        removePromoCode,
        isCartDrawerOpen,
        openCartDrawer: () => setIsCartDrawerOpen(true),
        closeCartDrawer: () => setIsCartDrawerOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
