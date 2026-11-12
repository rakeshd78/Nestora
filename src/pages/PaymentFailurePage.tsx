import React from 'react';
import { AlertTriangle, ArrowLeft, RefreshCw, Mail, Phone } from 'lucide-react';
import { PageRoute } from '../types';

interface PaymentFailurePageProps {
  onNavigate: (route: PageRoute) => void;
}

export const PaymentFailurePage: React.FC<PaymentFailurePageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#F7F3EE] text-[#24201D] py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-red-100 text-red-700 flex items-center justify-center border border-red-200">
          <AlertTriangle className="w-7 h-7 stroke-[2]" />
        </div>

        <span className="inline-block mt-6 text-xs uppercase tracking-[0.25em] text-red-700 font-medium">
          • PAYMENT DECLINED OR CANCELLED
        </span>

        <h1 className="mt-3 font-serif text-3xl sm:text-4xl text-[#171512]">
          Transaction Could Not Be Completed
        </h1>

        <p className="mt-4 text-xs sm:text-sm text-[#5C554E] leading-relaxed max-w-md mx-auto">
          Your financial institution or payment provider declined the authorization request. No charges have been deducted from your account.
        </p>

        <div className="mt-8 p-6 bg-[#EEE7DE] border border-[#E0D7CC] text-left text-xs space-y-3">
          <h4 className="font-serif text-base text-[#171512] font-semibold">Common Remedies:</h4>
          <ul className="space-y-1.5 text-[#5C554E] list-disc list-inside">
            <li>Verify the card number, expiration date, and CVC security code.</li>
            <li>Ensure international or luxury tier limit permissions are enabled with your bank.</li>
            <li>Or select <strong>Private Wire Transfer</strong> on the checkout page for direct settlement.</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('checkout')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest font-semibold hover:bg-[#2C2723] flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Return to Checkout
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto px-6 py-3.5 border border-[#171512] text-[#171512] text-xs uppercase tracking-widest font-semibold hover:bg-[#EEE7DE]"
          >
            Contact Studio Concierge
          </button>
        </div>
      </div>
    </div>
  );
};
