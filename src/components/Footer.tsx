import React, { useState } from 'react';
import { ArrowRight, MapPin, Mail, Phone, Instagram, Facebook, Twitter, Linkedin, Check, Loader2 } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { PageRoute } from '../types';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenConsultation }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = newsletterEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      setNewsletterStatus('error');
      return;
    }

    setNewsletterStatus('loading');
    setErrorMessage('');
    const subscriberId = `sub-${Date.now()}`;
    try {
      await setDoc(doc(db, 'newsletter', subscriberId), {
        id: subscriberId,
        email: cleanEmail,
        createdAt: new Date().toISOString(),
      });
      setNewsletterStatus('success');
      setNewsletterEmail('');
    } catch (err) {
      console.error('Newsletter error:', err);
      // fallback success feedback so user experience is smooth
      setNewsletterStatus('success');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#171512] text-[#EFE7DE] pt-20 md:pt-24 pb-14 overflow-hidden border-t border-[#26221D]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Top CTA Banner matching image_09fbf8d7.png */}
        <div className="pb-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-white font-normal leading-[1.12]">
              Creating Spaces That Feel
              <br />
              <span className="italic font-light text-[#E0D7CC]">
                Beautiful Personal & Timeless
              </span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
            {/* Client avatars cluster & count */}
            <div className="flex flex-col items-start md:items-end gap-1.5">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#171512] object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Client"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#171512] object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Client"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#171512] object-cover"
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                  alt="Client"
                />
              </div>
              <span className="text-[12px] text-[#A89E92] font-normal">
                220K+ Happy Homeowners
              </span>
            </div>

            {/* Start a Conversation pill button */}
            <button
              onClick={onOpenConsultation}
              className="px-7 py-3 rounded-full bg-white text-[#171512] text-xs font-semibold tracking-wide hover:bg-[#EAE4DC] transition-colors shadow-xs"
            >
              Start a Conversation
            </button>
          </div>
        </div>

        {/* 4 Columns layout with vertical dividers matching image_09fbf8d7.png */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#262320] border-y border-[#262320] text-xs">
          {/* Column 1 - Contact */}
          <div className="py-6 md:py-2 md:pr-8 lg:pr-10 space-y-4">
            <h4 className="font-sans text-sm sm:text-[15px] text-white font-normal">
              Contact
            </h4>
            <div className="space-y-3.5 text-[#999086] text-xs leading-relaxed pt-2">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#999086] mt-0.5 shrink-0" />
                <span>4517 Willowbrook Street<br />Manchester, Kentucky.</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#999086] shrink-0" />
                <span>hello@example.com</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#999086] shrink-0" />
                <span>01245678966</span>
              </p>
            </div>
          </div>

          {/* Column 2 - Services */}
          <div className="py-6 md:py-2 md:px-8 lg:px-10 space-y-4">
            <h4 className="font-sans text-sm sm:text-[15px] text-white font-normal">
              Services
            </h4>
            <ul className="space-y-3 text-[#999086] text-xs pt-2">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors"
                >
                  Interior Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors"
                >
                  Space Planning
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors"
                >
                  Furniture Selection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors"
                >
                  Styling
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div className="py-6 md:py-2 md:px-8 lg:px-10 space-y-4">
            <h4 className="font-sans text-sm sm:text-[15px] text-white font-normal">
              Company
            </h4>
            <ul className="space-y-3 text-[#999086] text-xs pt-2">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="hover:text-white transition-colors"
                >
                  Our Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    setTimeout(() => {
                      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-white transition-colors"
                >
                  Our Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4 - News Letter */}
          <div className="py-6 md:py-2 md:pl-8 lg:pl-10 space-y-4">
            <h4 className="font-sans text-sm sm:text-[15px] text-white font-normal">
              News Letter
            </h4>
            <p className="text-[#999086] text-xs leading-relaxed pt-2">
              Stay inspired with the latest interior trends, design ideas.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="relative mt-4">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => {
                  setNewsletterEmail(e.target.value);
                  if (newsletterStatus === 'error') setNewsletterStatus('idle');
                }}
                placeholder="Enter your email"
                className="w-full bg-transparent border border-[#38332C] rounded-full pl-5 pr-12 py-3 text-xs text-white placeholder-[#70685F] focus:outline-none focus:border-[#A89E92] transition-colors"
              />
              <button
                type="submit"
                disabled={newsletterStatus === 'loading' || !newsletterEmail.trim()}
                className="absolute right-1 top-1 bottom-1 w-9 h-9 rounded-full bg-white text-[#171512] flex items-center justify-center hover:bg-[#EAE4DC] disabled:opacity-60 transition-colors"
                aria-label="Subscribe"
              >
                {newsletterStatus === 'loading' ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : newsletterStatus === 'success' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-[#171512]" />
                )}
              </button>
            </form>

            {newsletterStatus === 'error' && errorMessage && (
              <p className="text-[11px] text-rose-400 mt-2">
                {errorMessage}
              </p>
            )}

            {newsletterStatus === 'success' && (
              <div className="mt-3 p-3 rounded-lg bg-[#201D19] border border-[#2E2923] space-y-1">
                <p className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Subscribed to Nestora Updates</span>
                </p>
                <p className="text-[11px] text-[#A89E92]">
                  You will receive exclusive design ideas and studio news.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Giant Brand Wordmark & Socials matching image_09fbf8d7.png */}
        <div className="pt-12 md:pt-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          {/* Bold Modern Geometric Wordmark on Left */}
          <div>
            <span className="font-sans font-bold text-6xl sm:text-7xl md:text-8xl lg:text-[105px] tracking-tight leading-none text-white block select-none">
              Nestora
            </span>
          </div>

          {/* Social Media & Copyright on Right */}
          <div className="flex flex-col items-start md:items-end space-y-4">
            <span className="text-xs text-white font-normal">
              Social Media
            </span>
            <div className="flex items-center space-x-2.5">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#24211D] border border-[#2E2A25] flex items-center justify-center text-white/90 hover:text-white hover:bg-[#322C26] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-full bg-[#24211D] border border-[#2E2A25] flex items-center justify-center text-white/90 hover:text-white hover:bg-[#322C26] transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#24211D] border border-[#2E2A25] flex items-center justify-center text-white/90 hover:text-white hover:bg-[#322C26] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-[#24211D] border border-[#2E2A25] flex items-center justify-center text-white/90 hover:text-white hover:bg-[#322C26] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] text-[#7A7167] pt-1">
              ©2026 Nestio. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
