import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag, Eye, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { PageRoute, Product } from '../types';
import { productsData } from '../data/products';
import { useCart } from '../context/CartContext';

interface ShopPageProps {
  onNavigate: (route: PageRoute) => void;
  onSelectProduct: (productId: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onNavigate, onSelectProduct }) => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const categories = ['All', 'Living Room', 'Seating', 'Tables', 'Lighting', 'Bedroom', 'Decor'];

  const filteredProducts = useMemo(() => {
    return productsData
      .filter((p) => {
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.materials.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1800);
  };

  return (
    <div className="bg-[#F7F3EE] text-[#24201D] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A7167] font-medium">
            • BESPOKE EDITIONS & ATELIER
          </span>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl text-[#171512] leading-[1.1]">
            Architectural Furnishings
            <br />
            <span className="italic font-light">& Curated Objects</span>
          </h1>
          <p className="mt-6 text-[#5C554E] text-sm md:text-base leading-relaxed">
            Crafted from solid Roman travertine, American walnut, hand-spun ceramics, and textured Belgian bouclé. Designed by Nestora for calm, enduring living.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-6 mb-10 border-b border-[#E3DACF]">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#171512] text-[#F7F3EE] font-medium'
                    : 'bg-[#EEE7DE] text-[#5C554E] hover:text-[#171512] hover:bg-[#E0D7CC]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-3 text-[#7A7167]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pieces, materials..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#EEE7DE] border border-[#D8CEBF] rounded-full text-[#171512] placeholder-[#7A7167] focus:outline-none focus:border-[#171512]"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto px-4 py-2 text-xs bg-[#EEE7DE] border border-[#D8CEBF] rounded-full text-[#171512] focus:outline-none focus:border-[#171512] cursor-pointer"
              >
                <option value="featured">Sort: Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Count Indicator */}
        <div className="mb-8 flex items-center justify-between text-xs text-[#7A7167]">
          <span>Showing {filteredProducts.length} curated design pieces</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#171512] underline hover:text-[#5C554E]"
            >
              Clear search filter
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-[#EEE7DE]/40 border border-[#E0D7CC] p-10">
            <h3 className="font-serif text-2xl text-[#171512]">No Pieces Match Your Query</h3>
            <p className="text-xs text-[#7A7167] mt-2">
              Try adjusting your category filter or search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-6 py-2.5 bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product.id);
                  onNavigate('product-detail');
                }}
                className="group bg-[#F7F3EE] border border-[#E0D7CC] flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-[#171512]"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden bg-[#EEE7DE]">
                    <img
                      src={product.heroImage}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {product.featured && (
                      <span className="absolute top-3 left-3 px-2 py-0.5 text-[9px] uppercase tracking-wider bg-[#171512] text-[#F7F3EE]">
                        Atelier Focus
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 text-[9px] uppercase tracking-wider bg-[#8C8276] text-white">
                        Special
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <span className="text-[10px] uppercase tracking-widest text-[#7A7167]">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-lg text-[#171512] group-hover:underline underline-offset-2 mt-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#5C554E] mt-1.5 line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#171512]">
                        ${product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#9A8F82] line-through">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product.id);
                      onNavigate('product-detail');
                    }}
                    className="py-2 border border-[#D8CEBF] text-[11px] uppercase tracking-wider text-[#4A433D] hover:bg-[#EEE7DE] hover:text-[#171512] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3 h-3" />
                    Details
                  </button>
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="py-2 bg-[#171512] text-[#F7F3EE] text-[11px] uppercase tracking-wider hover:bg-[#2C2723] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    {addedProductId === product.id ? 'Added!' : 'Add to Bag'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
