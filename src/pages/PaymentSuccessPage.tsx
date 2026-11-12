import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Check, Package, ArrowRight, Printer, Download } from 'lucide-react';
import { PageRoute, Order } from '../types';

interface PaymentSuccessPageProps {
  order: Order | null;
  onNavigate: (route: PageRoute) => void;
}

export const PaymentSuccessPage: React.FC<PaymentSuccessPageProps> = ({ order, onNavigate }) => {
  useEffect(() => {
    // Fire confetti for celebration
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#171512', '#C4B9AA', '#D8CEBF', '#8C8276'],
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const orderId = order?.id || 'NST-78291-2026';
  const customerName = order?.customerName || 'Julian Thorne';
  const orderTotal = order?.total || 3850;

  return (
    <div className="bg-[#F7F3EE] text-[#24201D] py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-[#171512] text-[#F7F3EE] flex items-center justify-center shadow-lg">
          <Check className="w-7 h-7 stroke-[2.5]" />
        </div>

        <span className="inline-block mt-6 text-xs uppercase tracking-[0.25em] text-[#7A7167] font-medium">
          • PAYMENT AUTHORIZED & CONFIRMED
        </span>

        <h1 className="mt-3 font-serif text-4xl sm:text-5xl text-[#171512]">
          Thank You For Your Order
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-[#5C554E] max-w-md mx-auto leading-relaxed">
          Your commission has been scheduled with the Nestora Atelier. A confirmation notice and tracking receipt have been dispatched to {order?.customerEmail || 'your email'}.
        </p>

        {/* Order Details Card */}
        <div className="mt-10 p-6 sm:p-8 bg-[#EEE7DE] border border-[#E0D7CC] text-left space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-[#D8CEBF] gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#7A7167]">
                Official Order Reference
              </span>
              <h3 className="font-mono text-base sm:text-lg font-bold text-[#171512] tracking-wider">
                {orderId}
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase tracking-wider text-[#7A7167]">
                Payment Status
              </span>
              <span className="block text-xs font-semibold text-emerald-800">
                Paid in Full • Stripe Test Mode
              </span>
            </div>
          </div>

          {/* Delivery Coordinates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5C554E]">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#7A7167] block mb-1">
                Delivering To
              </span>
              <p className="font-medium text-[#171512]">{customerName}</p>
              <p>{order?.address || '184 Flinders Lane, Penthouse Level'}</p>
              <p>{order?.city || 'Melbourne'}, {order?.state || 'VIC'} {order?.postalCode || '3000'}</p>
              <p>{order?.country || 'Australia'}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#7A7167] block mb-1">
                Estimated Delivery Window
              </span>
              <p className="font-medium text-[#171512] flex items-center gap-1.5">
                <Package className="w-4 h-4 text-[#171512]" />
                3–5 Business Days (White Glove)
              </p>
              <p className="text-[11px] text-[#7A7167] mt-1">
                Our freight concierge will phone you 24 hours prior to confirm room placement and assembly.
              </p>
            </div>
          </div>

          {/* Items Purchased */}
          {order?.items && order.items.length > 0 && (
            <div className="pt-4 border-t border-[#D8CEBF] space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-[#7A7167] block">
                Commissioned Pieces
              </span>
              <div className="divide-y divide-[#D8CEBF]">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-serif text-sm text-[#171512]">{item.name}</span>
                      <span className="text-[11px] text-[#7A7167] block">
                        Finish: {item.selectedMaterial} • Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="font-medium text-[#171512]">
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Total */}
          <div className="pt-4 border-t border-[#D8CEBF] flex justify-between items-center text-sm">
            <span className="font-serif text-base text-[#171512] font-semibold">
              Total Amount Settled
            </span>
            <span className="font-serif text-xl font-bold text-[#171512]">
              ${orderTotal.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 py-3 border border-[#171512] text-[#171512] text-xs uppercase tracking-widest font-semibold hover:bg-[#EEE7DE] transition-colors flex items-center justify-center gap-2"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Order Receipt
          </button>
          <button
            onClick={() => onNavigate('shop')}
            className="w-full sm:w-auto px-8 py-3 bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest font-semibold hover:bg-[#2C2723] transition-colors flex items-center justify-center gap-2"
          >
            Continue Exploring
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
