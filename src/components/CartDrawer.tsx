import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Plus, Minus, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PageRoute } from '../types';

interface CartDrawerProps {
  onNavigate: (route: PageRoute) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    shipping,
    discount,
    total,
    promoCode,
    promoError,
    applyPromoCode,
    removePromoCode,
    isCartDrawerOpen,
    closeCartDrawer,
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode);
      setInputCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={closeCartDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F7F3EE] border-l border-[#E3DACF] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#E3DACF] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#171512]" />
              <h2 className="font-serif text-xl tracking-tight text-[#171512]">
                Your Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeCartDrawer}
              className="p-1.5 text-[#7A7167] hover:text-[#171512] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#EEE7DE] flex items-center justify-center text-[#9A8F82]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-[#171512]">Your bag is currently empty</h3>
                <p className="text-xs text-[#7A7167] max-w-xs">
                  Explore our curated collection of architectural furniture, sculptural lighting, and bespoke decor.
                </p>
                <button
                  onClick={() => {
                    closeCartDrawer();
                    onNavigate('shop');
                  }}
                  className="mt-2 px-6 py-2.5 bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest hover:bg-[#2C2723]"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-6 border-b border-[#E3DACF]/60">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover bg-[#EEE7DE] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-base text-[#171512] truncate pr-2">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#9A8F82] hover:text-red-700 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#7A7167] mt-0.5">Finish: {item.selectedMaterial}</p>
                      <p className="text-xs font-medium text-[#171512] mt-1">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-[#D8CEBF] bg-[#EEE7DE]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-[#171512] text-[#7A7167]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs text-[#171512] font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-[#171512] text-[#7A7167]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-[11px] text-[#7A7167]">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E3DACF] bg-[#F7F3EE] space-y-4">
              {/* Promo input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-[#7A7167]" />
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Promo code (NESTORA10)"
                    className="w-full pl-8 pr-3 py-2 text-xs bg-[#EEE7DE] border border-[#D8CEBF] uppercase tracking-wider focus:outline-none focus:border-[#171512]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#EEE7DE] border border-[#D8CEBF] text-xs uppercase tracking-wider text-[#171512] hover:bg-[#D8CEBF]"
                >
                  Apply
                </button>
              </form>

              {promoCode && (
                <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 border border-emerald-200">
                  <span>Code Applied: <strong>{promoCode}</strong></span>
                  <button onClick={removePromoCode} className="text-xs underline hover:text-emerald-950">
                    Remove
                  </button>
                </div>
              )}
              {promoError && <p className="text-[11px] text-red-600">{promoError}</p>}

              {/* Subtotal breakdown */}
              <div className="space-y-1.5 text-xs text-[#5C554E]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#171512] font-medium">${subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Discount</span>
                    <span>-${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>White-Glove Shipping</span>
                  <span>{shipping === 0 ? <span className="text-emerald-800 font-medium">Complimentary</span> : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E3DACF] text-sm text-[#171512] font-semibold">
                  <span className="font-serif text-base">Estimated Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    closeCartDrawer();
                    onNavigate('checkout');
                  }}
                  className="w-full py-3.5 bg-[#171512] text-[#F7F3EE] uppercase tracking-widest text-xs font-medium hover:bg-[#2C2723] transition-colors flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    closeCartDrawer();
                    onNavigate('cart');
                  }}
                  className="w-full py-2.5 border border-[#D8CEBF] text-[#4A433D] uppercase tracking-widest text-xs hover:bg-[#EEE7DE] transition-colors"
                >
                  View Full Cart Page
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
