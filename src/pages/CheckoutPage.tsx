import React, { useState } from 'react';
import { ShieldCheck, Lock, CreditCard, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { PageRoute, Order } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface CheckoutPageProps {
  onNavigate: (route: PageRoute) => void;
  onOrderCompleted: (order: Order) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate, onOrderCompleted }) => {
  const { items, subtotal, shipping, discount, total, clearCart } = useCart();
  const { user } = useAuth();

  // Customer Information
  const [fullName, setFullName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('184 Flinders Lane');
  const [city, setCity] = useState('Melbourne');
  const [state, setState] = useState('VIC');
  const [postalCode, setPostalCode] = useState('3000');
  const [country, setCountry] = useState('Australia');

  // Payment Form (Simulated Stripe Test Mode)
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardholderName, setCardholderName] = useState(user?.displayName || 'Julian Thorne');
  const [paymentProvider, setPaymentProvider] = useState<'stripe' | 'wire'>('stripe');

  const [isProcessing, setIsProcessing] = useState(false);
  const [validationError, setValidationError] = useState('');

  if (items.length === 0) {
    return (
      <div className="bg-[#F7F3EE] py-24 text-center px-6">
        <h2 className="font-serif text-3xl text-[#171512]">No Items in Bag for Checkout</h2>
        <p className="text-xs text-[#7A7167] mt-2">
          Your shopping bag is currently empty.
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="mt-6 px-6 py-2.5 bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handleFillTestCard = () => {
    setCardNumber('4242 4242 4242 4242');
    setCardExpiry('10/28');
    setCardCvc('314');
    setCardholderName(fullName || 'Julian Thorne');
  };

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!fullName.trim() || !email.trim() || !address.trim() || !city.trim() || !postalCode.trim()) {
      setValidationError('Please complete all required shipping fields.');
      return;
    }

    if (paymentProvider === 'stripe' && (!cardNumber || cardNumber.length < 16)) {
      setValidationError('Please provide a valid card number or click "Use Test Card".');
      return;
    }

    setIsProcessing(true);

    // Simulate external gateway processing latency
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulated failure test trigger if user types '0000'
    if (cardNumber.includes('0000')) {
      setIsProcessing(false);
      onNavigate('payment-failure');
      return;
    }

    const orderId = `NST-${Math.floor(10000 + Math.random() * 90000)}-${new Date().getFullYear()}`;

    const orderRecord: Order = {
      id: orderId,
      userId: user?.uid,
      customerName: fullName.trim(),
      customerEmail: email.trim(),
      phone: phone.trim() || '+61 3 9650 1234',
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      postalCode: postalCode.trim(),
      country: country.trim(),
      items: [...items],
      subtotal,
      shipping,
      discount,
      total,
      paymentStatus: 'paid',
      paymentMethod: paymentProvider === 'stripe' ? 'Stripe Gateway (Test Mode)' : 'Direct Wire Transfer',
      orderStatus: 'confirmed',
      createdAt: new Date().toISOString(),
      estimatedDelivery: '3–5 Business Days',
    };

    try {
      // Persist to Firestore
      await setDoc(doc(db, 'orders', orderId), {
        id: orderId,
        userId: user?.uid || null,
        customerName: fullName.trim(),
        customerEmail: email.trim(),
        phone: phone.trim() || 'Not specified',
        address: address.trim(),
        city: city.trim(),
        state: state.trim(),
        postalCode: postalCode.trim(),
        country: country.trim(),
        subtotal,
        shipping,
        discount,
        total,
        paymentStatus: 'paid',
        paymentMethod: paymentProvider === 'stripe' ? 'Stripe Secure' : 'Bank Wire',
        orderStatus: 'confirmed',
        itemsSummary: items.map((i) => `${i.quantity}x ${i.name} (${i.selectedMaterial})`).join(', '),
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('Note on saving order to Firestore:', err);
    }

    clearCart();
    setIsProcessing(false);
    onOrderCompleted(orderRecord);
    onNavigate('payment-success');
  };

  return (
    <div className="bg-[#F7F3EE] text-[#24201D] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-10 pb-6 border-b border-[#E3DACF]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A7167] font-medium">
            • FINAL SETTLEMENT
          </span>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl text-[#171512]">
            Secure Order Checkout
          </h1>
          <p className="text-xs text-[#7A7167] mt-1">
            Complimentary white-glove delivery, assembly, and packaging removal on all architectural orders.
          </p>
        </div>

        {validationError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        <form onSubmit={handleProcessPayment}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Fields (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Customer Information */}
              <div className="p-6 sm:p-8 bg-[#EEE7DE]/60 border border-[#E0D7CC] space-y-4">
                <h3 className="font-serif text-xl text-[#171512] flex items-center gap-2">
                  <span className="font-mono text-xs text-[#7A7167]">01 //</span>
                  Customer Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[#4A433D] uppercase tracking-wider mb-1 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Julian Thorne"
                      className="w-full bg-[#F7F3EE] border border-[#D8CEBF] p-2.5 text-[#171512] focus:outline-none focus:border-[#171512]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#4A433D] uppercase tracking-wider mb-1 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="julian@example.com"
                      className="w-full bg-[#F7F3EE] border border-[#D8CEBF] p-2.5 text-[#171512] focus:outline-none focus:border-[#171512]"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-[#4A433D] uppercase tracking-wider mb-1 font-medium">
                    Contact Phone Number (For White-Glove Logistics)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+61 400 123 456"
                    className="w-full bg-[#F7F3EE] border border-[#D8CEBF] p-2.5 text-[#171512] focus:outline-none focus:border-[#171512]"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="p-6 sm:p-8 bg-[#EEE7DE]/60 border border-[#E0D7CC] space-y-4">
                <h3 className="font-serif text-xl text-[#171512] flex items-center gap-2">
                  <span className="font-mono text-xs text-[#7A7167]">02 //</span>
                  Delivery Residence Address
                </h3>

                <div className="text-xs">
                  <label className="block text-[#4A433D] uppercase tracking-wider mb-1 font-medium">
                    Street Address & Suite / Floor *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="184 Flinders Lane, Penthouse Level"
                    className="w-full bg-[#F7F3EE] border border-[#D8CEBF] p-2.5 text-[#171512] focus:outline-none focus:border-[#171512]"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-[#4A433D] uppercase tracking-wider mb-1 font-medium">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Melbourne"
                      className="w-full bg-[#F7F3EE] border border-[#D8CEBF] p-2.5 text-[#171512] focus:outline-none focus:border-[#171512]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#4A433D] uppercase tracking-wider mb-1 font-medium">
                      State / Region *
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="VIC"
                      className="w-full bg-[#F7F3EE] border border-[#D8CEBF] p-2.5 text-[#171512] focus:outline-none focus:border-[#171512]"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[#4A433D] uppercase tracking-wider mb-1 font-medium">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="3000"
                      className="w-full bg-[#F7F3EE] border border-[#D8CEBF] p-2.5 text-[#171512] focus:outline-none focus:border-[#171512]"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-[#4A433D] uppercase tracking-wider mb-1 font-medium">
                    Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#F7F3EE] border border-[#D8CEBF] p-2.5 text-[#171512] focus:outline-none focus:border-[#171512]"
                  >
                    <option value="Australia">Australia</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="European Union">European Union</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Japan">Japan</option>
                  </select>
                </div>
              </div>

              {/* Payment Gateway Integration */}
              <div className="p-6 sm:p-8 bg-[#EEE7DE]/60 border border-[#E0D7CC] space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl text-[#171512] flex items-center gap-2">
                    <span className="font-mono text-xs text-[#7A7167]">03 //</span>
                    Payment Integration
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                    <Lock className="w-3 h-3" />
                    <span>Stripe Verified</span>
                  </div>
                </div>

                <div className="flex gap-4 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentProvider('stripe')}
                    className={`flex-1 p-3 border text-left transition-all ${
                      paymentProvider === 'stripe'
                        ? 'border-[#171512] bg-[#F7F3EE] font-medium'
                        : 'border-[#D8CEBF] bg-[#EEE7DE] text-[#7A7167]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-[#171512]" />
                        Credit / Debit Card (Stripe)
                      </span>
                      {paymentProvider === 'stripe' && <CheckCircle2 className="w-4 h-4 text-[#171512]" />}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentProvider('wire')}
                    className={`flex-1 p-3 border text-left transition-all ${
                      paymentProvider === 'wire'
                        ? 'border-[#171512] bg-[#F7F3EE] font-medium'
                        : 'border-[#D8CEBF] bg-[#EEE7DE] text-[#7A7167]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>Private Wire Transfer</span>
                      {paymentProvider === 'wire' && <CheckCircle2 className="w-4 h-4 text-[#171512]" />}
                    </div>
                  </button>
                </div>

                {paymentProvider === 'stripe' ? (
                  <div className="p-4 bg-[#F7F3EE] border border-[#D8CEBF] space-y-3 text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-[#E3DACF]">
                      <span className="text-[10px] uppercase tracking-wider text-[#7A7167]">
                        Payment Provider Test Mode
                      </span>
                      <button
                        type="button"
                        onClick={handleFillTestCard}
                        className="text-[11px] text-[#171512] font-semibold underline hover:text-[#5C554E]"
                      >
                        Auto-fill Test Card Credentials
                      </button>
                    </div>

                    <div>
                      <label className="block text-[#4A433D] uppercase tracking-wider mb-1 font-medium">
                        Card Number
                      </label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 4242 4242 4242"
                        className="w-full bg-[#EEE7DE] border border-[#D8CEBF] p-2.5 text-[#171512] font-mono tracking-wider focus:outline-none focus:border-[#171512]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[#4A433D] uppercase tracking-wider mb-1 font-medium">
                          Expiration (MM/YY)
                        </label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="12/28"
                          className="w-full bg-[#EEE7DE] border border-[#D8CEBF] p-2.5 text-[#171512] font-mono focus:outline-none focus:border-[#171512]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#4A433D] uppercase tracking-wider mb-1 font-medium">
                          Security CVC
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          required
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="888"
                          className="w-full bg-[#EEE7DE] border border-[#D8CEBF] p-2.5 text-[#171512] font-mono focus:outline-none focus:border-[#171512]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#4A433D] uppercase tracking-wider mb-1 font-medium">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        required
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        placeholder="Julian Thorne"
                        className="w-full bg-[#EEE7DE] border border-[#D8CEBF] p-2.5 text-[#171512] focus:outline-none focus:border-[#171512]"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-[#F7F3EE] border border-[#D8CEBF] text-xs text-[#5C554E] space-y-1.5">
                    <p className="font-semibold text-[#171512]">Nestora Atelier Bank Coordinates:</p>
                    <p>Bank: Commonwealth Bank of Australia (Private Wealth)</p>
                    <p>BSB: 063-000 | Account: 1048 9921</p>
                    <p>Swift / BIC: CTBAAU2S</p>
                    <p className="text-[11px] text-[#7A7167] pt-1">
                      Our concierge will dispatch invoice and remittance instructions to your email upon order creation.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary (5 cols) */}
            <div className="lg:col-span-5 bg-[#EEE7DE] border border-[#E0D7CC] p-6 sm:p-8 space-y-6">
              <h3 className="font-serif text-2xl text-[#171512]">Order Review</h3>

              {/* Items List */}
              <div className="divide-y divide-[#D8CEBF] max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover bg-[#F7F3EE] border border-[#D8CEBF]" />
                      <div>
                        <h5 className="font-serif text-sm text-[#171512]">{item.name}</h5>
                        <p className="text-[11px] text-[#7A7167]">
                          Qty: {item.quantity} • {item.selectedMaterial}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-[#171512]">
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-2.5 text-xs text-[#5C554E] pt-4 border-t border-[#D8CEBF]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#171512] font-medium">${subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Promotional Discount</span>
                    <span>-${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>White-Glove Delivery & Assembly</span>
                  <span>{shipping === 0 ? <span className="text-emerald-800 font-medium">Complimentary</span> : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#D8CEBF] text-lg text-[#171512] font-semibold">
                  <span className="font-serif text-xl">Total Payable</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>

              {/* Pay Now Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-full bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest font-semibold hover:bg-[#2C2723] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Transacting via Gateway...
                  </>
                ) : (
                  <>
                    Pay Now (${total.toLocaleString()})
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="space-y-1 text-center text-[10px] text-[#7A7167]">
                <p>Protected by 256-bit SSL encryption. Card data is never stored locally.</p>
                <p>White glove insurance covers freight, unboxing, and debris recycling.</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
