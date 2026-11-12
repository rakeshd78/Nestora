import React, { useState, useEffect } from 'react';
import { ShoppingBag, User as UserIcon, Menu, X } from 'lucide-react';
import { PageRoute } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenConsultation: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenConsultation,
  onOpenAuth,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemsCount, openCartDrawer } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; route: PageRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'About Us', route: 'about' },
    { label: 'Services', route: 'services' },
    { label: 'Projects', route: 'projects' },
    { label: 'Shop', route: 'shop' },
    { label: 'Journal', route: 'blog' },
  ];

  const handleLinkClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F3EE]/95 backdrop-blur-md shadow-xs border-b border-[#E8E2D7]/80 py-3.5'
            : 'bg-[#F7F3EE] border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left: Navigation links */}
          <nav className="hidden lg:flex items-center space-x-8 text-[13px] text-[#4A433D] font-normal tracking-wide">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => handleLinkClick(item.route)}
                className={`transition-colors hover:text-[#171512] relative py-1 ${
                  currentRoute === item.route
                    ? 'text-[#171512] font-medium after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#171512]'
                    : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Center: Brand Logo */}
          <div className="flex-1 lg:flex-initial text-center lg:text-center">
            <button
              onClick={() => handleLinkClick('home')}
              className="inline-block group text-left lg:text-center"
            >
              <span className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-[#171512] transition-opacity group-hover:opacity-80">
                Nestora
              </span>
            </button>
          </div>

          {/* Right: Actions (Cart, Auth, Contact Us) */}
          <div className="flex items-center space-x-3 md:space-x-5">
            {/* Cart Icon */}
            <button
              onClick={openCartDrawer}
              className="relative p-2 text-[#4A433D] hover:text-[#171512] transition-colors"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 stroke-[1.6]" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#171512] text-[#F7F3EE] text-[10px] font-semibold rounded-full flex items-center justify-center">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Auth / Account */}
            <button
              onClick={onOpenAuth}
              className="p-1.5 text-[#4A433D] hover:text-[#171512] transition-colors flex items-center gap-1.5"
              aria-label="Account"
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Account'}
                  className="w-6 h-6 rounded-full object-cover border border-[#171512]"
                />
              ) : (
                <UserIcon className="w-4 h-4 md:w-5 md:h-5 stroke-[1.6]" />
              )}
            </button>

            {/* Contact Us button (Pill style matching reference image) */}
            <button
              onClick={() => handleLinkClick('contact')}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full border border-[#171512] bg-[#171512] text-[#F7F3EE] text-[12px] font-medium tracking-wide hover:bg-transparent hover:text-[#171512] transition-all duration-200"
            >
              Contact Us
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#171512] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F7F3EE] border-b border-[#E3DACF] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-3.5 text-sm text-[#4A433D]">
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleLinkClick(item.route)}
                  className={`text-left py-1.5 transition-colors ${
                    currentRoute === item.route ? 'text-[#171512] font-semibold' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleLinkClick('contact')}
                className="text-left py-1.5 transition-colors text-[#171512] font-medium"
              >
                Contact & Studio Map
              </button>
            </nav>

            <div className="pt-4 border-t border-[#E3DACF] flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3 rounded-full bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest font-medium"
              >
                Start Your Project
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
