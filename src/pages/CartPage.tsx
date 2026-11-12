import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag, Tag, ShieldCheck } from 'lucide-react';
import { PageRoute } from '../types';
import { useCart } from '../context/CartContext';

interface CartPageProps {
  onNavigate: (route: PageRoute) => void;
  onSelectProduct: (productId: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate, onSelectProduct }) => {
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
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode);
      setInputCode('');
    }
  };

  return (
    <div className="bg-[#F7F3EE] text-[#24201D] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-[#E3DACF] flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A7167] font-medium">
              • YOUR CURATION
            </span>
            <h1 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl text-[#171512]">
              Shopping Bag
            </h1>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#7A7167] hover:text-[#171512] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Continue Shopping
          </button>
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center bg-[#EEE7DE]/40 border border-[#E0D7CC] p-12 max-w-2xl mx-auto space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#EEE7DE] flex items-center justify-center text-[#7A7167]">
              <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h2 className="font-serif text-3xl text-[#171512]">Your shopping bag is empty</h2>
            <p className="text-xs sm:text-sm text-[#5C554E] max-w-sm mx-auto leading-relaxed">
              Explore our collection of custom-crafted travertine tables, bouclé sectionals, and sculpted lighting fixtures.
            </p>
            <div className="pt-4">
              <button
                onClick={() => onNavigate('shop')}
                className="px-8 py-3.5 rounded-full bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest font-semibold hover:bg-[#2C2723]"
              >
                Browse Shop Collection
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Items Table (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="divide-y divide-[#E3DACF] border-y border-[#E3DACF]">
                {items.map((item) => (
                  <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                    <div className="flex gap-5 items-center">
                      <div
                        onClick={() => {
                          onSelectProduct(item.productId);
                          onNavigate('product-detail');
                        }}
                        className="w-24 h-24 overflow-hidden bg-[#EEE7DE] border border-[#E3DACF] shrink-0 cursor-pointer"
                      >
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3
                          onClick={() => {
                            onSelectProduct(item.productId);
                            onNavigate('product-detail');
                          }}
                          className="font-serif text-lg md:text-xl text-[#171512] hover:underline cursor-pointer"
                        >
                          {item.name}
                        </h3>
                        <p className="text-xs text-[#7A7167] mt-0.5">Finish: {item.selectedMaterial}</p>
                        <span className="text-xs font-semibold text-[#171512] mt-1.5 block">
                          ${item.price.toLocaleString()} each
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      <div className="flex items-center border border-[#D8CEBF] bg-[#EEE7DE]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1.5 text-[#7A7167] hover:text-[#171512]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 py-1.5 text-xs font-semibold text-[#171512]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1.5 text-[#7A7167] hover:text-[#171512]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right w-24">
                        <span className="text-sm font-semibold text-[#171512]">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-[#9A8F82] hover:text-red-700 transition-colors"
                        title="Remove piece"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => onNavigate('shop')}
                  className="text-xs uppercase tracking-widest text-[#7A7167] hover:text-[#171512] underline underline-offset-4"
                >
                  ← Continue Shopping
                </button>
              </div>
            </div>

            {/* Order Summary Sidebar (4 cols) */}
            <div className="lg:col-span-4 bg-[#EEE7DE] border border-[#E0D7CC] p-6 sm:p-8 space-y-6">
              <h3 className="font-serif text-2xl text-[#171512]">Order Summary</h3>

              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-[#7A7167]" />
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="Promo code (NESTORA10)"
                      className="w-full pl-8 pr-3 py-2 text-xs bg-[#F7F3EE] border border-[#D8CEBF] uppercase tracking-wider focus:outline-none focus:border-[#171512]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-wider hover:bg-[#2C2723]"
                  >
                    Apply
                  </button>
                </div>
                {promoCode && (
                  <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 border border-emerald-200">
                    <span>Applied: <strong>{promoCode}</strong></span>
                    <button onClick={removePromoCode} className="underline text-xs">Remove</button>
                  </div>
                )}
                {promoError && <p className="text-[11px] text-red-600">{promoError}</p>}
              </form>

              {/* Pricing breakdown */}
              <div className="space-y-3 text-xs text-[#5C554E] pt-3 border-t border-[#D8CEBF]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#171512] font-medium">${subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Promotional Savings</span>
                    <span>-${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>White-Glove Delivery</span>
                  <span>{shipping === 0 ? <span className="text-emerald-800 font-medium">Complimentary</span> : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#D8CEBF] text-base text-[#171512] font-semibold">
                  <span className="font-serif text-lg">Payable Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>

              {/* Proceed to checkout button */}
              <button
                onClick={() => onNavigate('checkout')}
                className="w-full py-4 rounded-full bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest font-semibold hover:bg-[#2C2723] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                Proceed to Checkout
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#7A7167] pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Encrypted 256-Bit Secure Checkout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
