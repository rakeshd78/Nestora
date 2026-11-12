import React, { useEffect, useState } from 'react';
import { User as UserIcon, Package, Calendar, LogOut, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { PageRoute, Order } from '../types';
import { useAuth } from '../context/AuthContext';

interface AccountPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenAuth: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ onNavigate, onOpenAuth }) => {
  const { user, signOut } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      setLoadingOrders(true);
      try {
        const q = query(collection(db, 'orders'), where('userId', '==', user.uid));
        const snap = await getDocs(q);
        const fetched: Order[] = [];
        snap.forEach((doc) => {
          fetched.push(doc.data() as Order);
        });
        setOrders(fetched);
      } catch (err) {
        console.warn('Orders lookup note:', err);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="bg-[#F7F3EE] text-[#24201D] py-24 text-center px-6">
        <div className="max-w-md mx-auto p-10 bg-[#EEE7DE] border border-[#E0D7CC] space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#171512] text-[#F7F3EE] flex items-center justify-center">
            <UserIcon className="w-6 h-6 stroke-[1.5]" />
          </div>
          <h2 className="font-serif text-3xl text-[#171512]">Patron Account</h2>
          <p className="text-xs text-[#5C554E] leading-relaxed">
            Please sign in with your Google account to access your bespoke orders, tracking information, and studio consultation history.
          </p>
          <button
            onClick={onOpenAuth}
            className="w-full py-3.5 bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest font-semibold hover:bg-[#2C2723] transition-colors"
          >
            Sign In with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F3EE] text-[#24201D] py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* User Card */}
        <div className="p-8 bg-[#EEE7DE] border border-[#E0D7CC] mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#171512] bg-[#F7F3EE]">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'Client'} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-serif text-2xl text-[#171512]">
                  {user.displayName?.charAt(0) || 'N'}
                </div>
              )}
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#7A7167]">
                Verified Patron
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-[#171512]">
                {user.displayName || 'Nestora Patron'}
              </h1>
              <p className="text-xs text-[#7A7167]">{user.email}</p>
            </div>
          </div>

          <button
            onClick={() => signOut()}
            className="px-5 py-2.5 border border-[#171512] text-[#171512] text-xs uppercase tracking-widest font-medium hover:bg-[#F7F3EE] transition-colors flex items-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>

        {/* Orders History */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E3DACF]">
            <div>
              <h2 className="font-serif text-2xl text-[#171512]">Bespoke Order History</h2>
              <p className="text-xs text-[#7A7167]">
                Track custom fabrication, white-glove transit, and delivered editions.
              </p>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs uppercase tracking-widest text-[#171512] font-semibold underline hover:text-[#5C554E]"
            >
              Browse Shop
            </button>
          </div>

          {loadingOrders ? (
            <div className="py-12 text-center text-xs text-[#7A7167]">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="p-8 bg-[#EEE7DE]/40 border border-[#E0D7CC] text-center space-y-3">
              <Package className="w-8 h-8 mx-auto text-[#7A7167] stroke-[1.5]" />
              <h4 className="font-serif text-lg text-[#171512]">No active orders placed yet</h4>
              <p className="text-xs text-[#5C554E] max-w-sm mx-auto">
                Any orders you complete through the shop or bespoke commission checkout will be synchronized here.
              </p>
              <button
                onClick={() => onNavigate('shop')}
                className="mt-2 px-6 py-2 bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest"
              >
                Explore Atelier Shop
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="p-6 bg-[#EEE7DE]/70 border border-[#E0D7CC] space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-[#D8CEBF] gap-2">
                    <div>
                      <span className="font-mono text-xs font-semibold text-[#171512]">
                        Order #{ord.id}
                      </span>
                      <span className="text-[11px] text-[#7A7167] block">
                        Placed on {new Date(ord.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 text-[10px] uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {ord.paymentStatus}
                      </span>
                      <span className="font-semibold text-sm text-[#171512]">
                        ${ord.total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {ord.items && (
                    <div className="divide-y divide-[#D8CEBF]">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="py-2 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-serif text-[#171512]">{item.name}</span>
                            <span className="text-[11px] text-[#7A7167] block">
                              {item.selectedMaterial} × {item.quantity}
                            </span>
                          </div>
                          <span>${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-2 text-[11px] text-[#7A7167] flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                    <span>White-Glove Delivery Destination: {ord.city}, {ord.country}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
