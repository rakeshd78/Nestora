import React, { useState, useEffect } from 'react';
import { PageRoute, Project, Order } from './types';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ConsultationModal } from './components/ConsultationModal';
import { ProjectEnquiryModal } from './components/ProjectEnquiryModal';
import { AuthModal } from './components/AuthModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PaymentSuccessPage } from './pages/PaymentSuccessPage';
import { PaymentFailurePage } from './pages/PaymentFailurePage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ContactPage } from './pages/ContactPage';
import { AccountPage } from './pages/AccountPage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('residential-living');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('space-planning');
  const [selectedProductId, setSelectedProductId] = useState<string>('atelier-curved-boucle-sofa');
  const [selectedBlogId, setSelectedBlogId] = useState<string>('thoughtful-ideas-begin-with-thoughtful-design');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Modals state
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [enquiryProject, setEnquiryProject] = useState<Project | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleNavigate = (route: PageRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-[#F7F3EE] text-[#24201D] selection:bg-[#2C2723] selection:text-[#F7F3EE]">
          {/* Header & Sticky Minimalist Navigation */}
          <Navbar
            currentRoute={currentRoute}
            onNavigate={handleNavigate}
            onOpenConsultation={() => setIsConsultationOpen(true)}
            onOpenAuth={() => setIsAuthOpen(true)}
          />

          {/* Main Page Content */}
          <main className="flex-1">
            {currentRoute === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                onSelectProject={(id) => setSelectedProjectId(id)}
                onSelectService={(id) => setSelectedServiceId(id)}
                onSelectBlog={(id) => setSelectedBlogId(id)}
                onOpenConsultation={() => setIsConsultationOpen(true)}
              />
            )}

            {currentRoute === 'about' && (
              <AboutPage
                onNavigate={handleNavigate}
                onOpenConsultation={() => setIsConsultationOpen(true)}
              />
            )}

            {currentRoute === 'services' && (
              <ServicesPage
                onNavigate={handleNavigate}
                onSelectService={(id) => setSelectedServiceId(id)}
                onOpenConsultation={() => setIsConsultationOpen(true)}
              />
            )}

            {currentRoute === 'service-detail' && (
              <ServiceDetailPage
                serviceId={selectedServiceId}
                onNavigate={handleNavigate}
                onSelectService={(id) => setSelectedServiceId(id)}
                onOpenConsultation={() => setIsConsultationOpen(true)}
              />
            )}

            {currentRoute === 'projects' && (
              <ProjectsPage
                onNavigate={handleNavigate}
                onSelectProject={(id) => setSelectedProjectId(id)}
                onOpenConsultation={() => setIsConsultationOpen(true)}
              />
            )}

            {currentRoute === 'project-detail' && (
              <ProjectDetailPage
                projectId={selectedProjectId}
                onNavigate={handleNavigate}
                onOpenProjectEnquiry={(proj) => setEnquiryProject(proj)}
              />
            )}

            {currentRoute === 'shop' && (
              <ShopPage
                onNavigate={handleNavigate}
                onSelectProduct={(id) => setSelectedProductId(id)}
              />
            )}

            {currentRoute === 'product-detail' && (
              <ProductDetailPage
                productId={selectedProductId}
                onNavigate={handleNavigate}
                onSelectProduct={(id) => setSelectedProductId(id)}
              />
            )}

            {currentRoute === 'cart' && (
              <CartPage
                onNavigate={handleNavigate}
                onSelectProduct={(id) => setSelectedProductId(id)}
              />
            )}

            {currentRoute === 'checkout' && (
              <CheckoutPage
                onNavigate={handleNavigate}
                onOrderCompleted={(ord) => setLastOrder(ord)}
              />
            )}

            {currentRoute === 'payment-success' && (
              <PaymentSuccessPage
                order={lastOrder}
                onNavigate={handleNavigate}
              />
            )}

            {currentRoute === 'payment-failure' && (
              <PaymentFailurePage
                onNavigate={handleNavigate}
              />
            )}

            {currentRoute === 'blog' && (
              <BlogPage
                onNavigate={handleNavigate}
                onSelectBlog={(id) => setSelectedBlogId(id)}
              />
            )}

            {currentRoute === 'blog-detail' && (
              <BlogDetailPage
                blogId={selectedBlogId}
                onNavigate={handleNavigate}
                onSelectBlog={(id) => setSelectedBlogId(id)}
              />
            )}

            {currentRoute === 'contact' && (
              <ContactPage
                onNavigate={handleNavigate}
              />
            )}

            {currentRoute === 'account' && (
              <AccountPage
                onNavigate={handleNavigate}
                onOpenAuth={() => setIsAuthOpen(true)}
              />
            )}
          </main>

          {/* Section 9: Deep Charcoal Footer */}
          <Footer
            onNavigate={handleNavigate}
            onOpenConsultation={() => setIsConsultationOpen(true)}
          />

          {/* Modals & Drawers */}
          <CartDrawer onNavigate={handleNavigate} />

          <ConsultationModal
            isOpen={isConsultationOpen}
            onClose={() => setIsConsultationOpen(false)}
          />

          <ProjectEnquiryModal
            project={enquiryProject}
            isOpen={!!enquiryProject}
            onClose={() => setEnquiryProject(null)}
          />

          <AuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            onOpenAccount={() => handleNavigate('account')}
          />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
