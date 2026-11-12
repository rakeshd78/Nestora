import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw, Plus, Minus } from 'lucide-react';
import { PageRoute, Product } from '../types';
import { productsData } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (route: PageRoute) => void;
  onSelectProduct: (id: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onNavigate,
  onSelectProduct,
}) => {
  const product = productsData.find((p) => p.id === productId) || productsData[0];
  const { addToCart } = useCart();

  const [activeImage, setActiveImage] = useState(product.heroImage);
  const [selectedMaterial, setSelectedMaterial] = useState(product.materials[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Sync state if product changes
  React.useEffect(() => {
    setActiveImage(product.heroImage);
    setSelectedMaterial(product.materials[0] || 'Standard');
    setQuantity(1);
    setAddedSuccess(false);
  }, [productId, product]);

  const handleAddToCart = () => {
    addToCart(product, selectedMaterial, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedMaterial, quantity);
    onNavigate('checkout');
  };

  const relatedProducts = productsData
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const fallbackRelated = relatedProducts.length > 0 ? relatedProducts : productsData.slice(0, 3);

  return (
    <div className="bg-[#F7F3EE] text-[#24201D] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Back Link */}
        <button
          onClick={() => onNavigate('shop')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#7A7167] hover:text-[#171512] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Shop Collection
        </button>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
          {/* Gallery View (Left) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-square overflow-hidden bg-[#EEE7DE] border border-[#E3DACF]">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square overflow-hidden border transition-all ${
                    activeImage === img ? 'border-[#171512] ring-1 ring-[#171512]' : 'border-[#E3DACF] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Configuration & Order Panel (Right) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A7167] font-medium">
                • {product.category}
              </span>
              <h1 className="mt-2 font-serif text-3xl sm:text-4xl text-[#171512] leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-4 flex items-center gap-3">
                <span className="font-serif text-3xl text-[#171512]">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[#9A8F82] line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="ml-2 px-2.5 py-0.5 text-[10px] uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {product.inStock ? 'Made to Order / In Stock' : 'Pre-Order'}
                </span>
              </div>

              {/* Description */}
              <p className="mt-6 text-xs sm:text-sm text-[#5C554E] leading-relaxed">
                {product.description}
              </p>

              {/* Material Selector */}
              <div className="mt-8 pt-6 border-t border-[#E3DACF]">
                <label className="block text-xs uppercase tracking-wider text-[#171512] font-semibold mb-3">
                  Select Architectural Finish / Material: <span className="font-normal text-[#5C554E]">{selectedMaterial}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((mat) => (
                    <button
                      key={mat}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`px-4 py-2 text-xs border transition-all ${
                        selectedMaterial === mat
                          ? 'border-[#171512] bg-[#171512] text-[#F7F3EE]'
                          : 'border-[#D8CEBF] bg-[#EEE7DE] text-[#4A433D] hover:border-[#171512]'
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensions & Specifications */}
              <div className="mt-6 p-4 bg-[#EEE7DE]/60 border border-[#E0D7CC] text-xs space-y-2">
                <div className="flex justify-between text-[#5C554E]">
                  <span className="font-medium text-[#171512]">Dimensions:</span>
                  <span>{product.dimensions}</span>
                </div>
                <div className="flex justify-between text-[#5C554E]">
                  <span className="font-medium text-[#171512]">Lead Time:</span>
                  <span>{product.leadTime}</span>
                </div>
                <div className="flex justify-between text-[#5C554E]">
                  <span className="font-medium text-[#171512]">Shipping:</span>
                  <span>Complimentary White-Glove delivery over $2,000</span>
                </div>
              </div>

              {/* Quantity Selector & Actions */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-xs uppercase tracking-wider text-[#171512] font-medium">Quantity</span>
                  <div className="flex items-center border border-[#D8CEBF] bg-[#EEE7DE]">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-[#7A7167] hover:text-[#171512]"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 py-2 text-xs font-semibold text-[#171512]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-2 text-[#7A7167] hover:text-[#171512]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="py-3.5 border border-[#171512] text-[#171512] text-xs uppercase tracking-widest font-semibold hover:bg-[#EEE7DE] transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {addedSuccess ? 'Added to Bag ✓' : 'Add to Bag'}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="py-3.5 bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest font-semibold hover:bg-[#2C2723] transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>

            {/* Service Guarantees */}
            <div className="pt-6 border-t border-[#E3DACF] grid grid-cols-3 gap-2 text-[10px] text-[#7A7167] text-center">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#171512]" />
                <span>Insured Freight</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#171512]" />
                <span>5-Year Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-4 h-4 text-[#171512]" />
                <span>30-Day Exchange</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="pt-16 border-t border-[#E3DACF]">
          <div className="mb-10">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A7167] font-medium">
              • COMPLEMENTARY PIECES
            </span>
            <h2 className="mt-2 font-serif text-3xl text-[#171512]">You May Also Appreciate</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {fallbackRelated.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  onSelectProduct(rel.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer bg-[#F7F3EE] border border-[#E0D7CC] p-4 transition-all hover:border-[#171512]"
              >
                <div className="aspect-square overflow-hidden bg-[#EEE7DE]">
                  <img
                    src={rel.heroImage}
                    alt={rel.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#7A7167]">
                    {rel.category}
                  </span>
                  <h3 className="font-serif text-lg text-[#171512] group-hover:underline underline-offset-2">
                    {rel.name}
                  </h3>
                  <span className="text-xs font-semibold text-[#171512] block mt-1">
                    ${rel.price.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
