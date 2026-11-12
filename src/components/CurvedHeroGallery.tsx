import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, Sparkles, Pause, Play } from 'lucide-react';
import { Project } from '../types';

interface CurvedHeroGalleryProps {
  onSelectProject: (projectId: string) => void;
  onOpenConsultation: () => void;
}

interface RoomItem {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  projectId: string;
  concept: string;
}

export const CurvedHeroGallery: React.FC<CurvedHeroGalleryProps> = ({
  onSelectProject,
  onOpenConsultation,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [activeViewMode, setActiveViewMode] = useState<'smooth-ribbon' | 'exact-panorama'>('smooth-ribbon');

  const rooms: RoomItem[] = [
    {
      id: 'dining-room',
      title: 'Dining Atelier',
      category: 'Space Planning & Millwork',
      location: 'Melbourne, Australia',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=900&q=80',
      projectId: 'residential-living',
      concept: 'European oak joinery, sage niche, and warm ambient pendant',
    },
    {
      id: 'study-workspace',
      title: 'Cedar Studio',
      category: 'Executive Workspace',
      location: 'Melbourne, Australia',
      image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=900&q=80',
      projectId: 'cedar-house',
      concept: 'Solid Roman travertine desk and museum-curated diptych',
    },
    {
      id: 'master-bedroom',
      title: 'Master Sanctuary',
      category: 'Residential Suite',
      location: 'Melbourne, Australia',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80',
      projectId: 'residential-living',
      concept: 'Acoustic cove-lit ledger and layered Belgian linen',
    },
    {
      id: 'living-lounge',
      title: 'Arden Lounge',
      category: 'Living Architecture',
      location: 'Melbourne, Australia',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80',
      projectId: 'arden-villa',
      concept: 'Curved wool bouclé sectional and sculpted timber stool',
    },
    {
      id: 'arched-vault',
      title: 'Maison Vault',
      category: 'Heritage Sanctuary',
      location: 'Melbourne, Australia',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80',
      projectId: 'maison-verde',
      concept: 'Mediterranean barrel arches and dramatic low platform bed',
    },
    {
      id: 'terrace-pavilion',
      title: 'Lumina Terrace',
      category: 'Indoor-Outdoor Living',
      location: 'Sydney, Australia',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
      projectId: 'penthouse-lumina',
      concept: 'Slatted acoustic ceiling with seamless courtyards',
    },
    {
      id: 'alcove-sanctuary',
      title: 'Arched Bed Alcove',
      category: 'Private Residence',
      location: 'Melbourne, Australia',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80',
      projectId: 'maison-verde',
      concept: 'Recessed sleeping nook with warm wall sconce illumination',
    },
    {
      id: 'minimalist-library',
      title: 'Study & Library Nook',
      category: 'Bespoke Joinery',
      location: 'Melbourne, Australia',
      image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=900&q=80',
      projectId: 'cedar-house',
      concept: 'Textured lime plaster with alabaster luminaire',
    },
  ];

  // Continuous smooth auto-glide
  useEffect(() => {
    if (!isAutoScrolling || isHovered || isDragging) return;

    let animId: number;
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollStep = () => {
      if (!container) return;
      container.scrollLeft += 0.85;

      // Infinite loop wrap
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 10) {
        container.scrollLeft = 0;
      }
      animId = requestAnimationFrame(scrollStep);
    };

    animId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animId);
  }, [isAutoScrolling, isHovered, isDragging]);

  // Smooth scroll left/right handlers
  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 380;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Mouse Drag to Scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftPos(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftPos - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // 3D rotation angles for the 5-panel curved panorama style
  const getCylinderTransform = (index: number) => {
    const angleMap = [16, 8, 0, -8, -16];
    const translateZMap = [-18, -4, 8, -4, -18];
    const rot = angleMap[index % 5] || 0;
    const z = translateZMap[index % 5] || 0;
    return `perspective(1400px) rotateY(${rot}deg) translateZ(${z}px)`;
  };

  return (
    <div className="relative w-full overflow-hidden select-none py-4">
      {/* Background Architectural Wireframe Sketch Lines matching reference */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] flex items-center justify-center overflow-hidden">
        <svg
          className="w-full h-full min-w-[1200px]"
          viewBox="0 0 1200 500"
          fill="none"
          stroke="#171512"
          strokeWidth="0.8"
        >
          {/* Ceiling grid perspective */}
          <line x1="0" y1="40" x2="600" y2="200" />
          <line x1="1200" y1="40" x2="600" y2="200" />
          <line x1="200" y1="0" x2="600" y2="200" />
          <line x1="1000" y1="0" x2="600" y2="200" />
          <line x1="400" y1="0" x2="600" y2="200" />
          <line x1="800" y1="0" x2="600" y2="200" />
          {/* Vanishing center point */}
          <circle cx="600" cy="200" r="4" fill="#171512" />
          {/* Floor grid perspective */}
          <line x1="0" y1="460" x2="600" y2="200" />
          <line x1="1200" y1="460" x2="600" y2="200" />
          <line x1="250" y1="500" x2="600" y2="200" />
          <line x1="950" y1="500" x2="600" y2="200" />
          <line x1="450" y1="500" x2="600" y2="200" />
          <line x1="750" y1="500" x2="600" y2="200" />
          {/* Wall structural framing */}
          <rect x="350" y="120" width="500" height="220" strokeDasharray="3 3" />
          <line x1="350" y1="120" x2="150" y2="40" />
          <line x1="850" y1="120" x2="1050" y2="40" />
          <line x1="350" y1="340" x2="150" y2="460" />
          <line x1="850" y1="340" x2="1050" y2="460" />
        </svg>
      </div>

      {/* Top Controls: Mode Switcher & Navigation Info */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between pb-6 gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A7167] font-medium">
            • INTERIOR ARCHITECTURE PANORAMA
          </span>
          <span className="hidden sm:inline-block text-[#D8CEBF]">•</span>
          <span className="hidden sm:inline-block text-[11px] text-[#5C554E]">
            Curved cylindrical perspective with fluid smooth scroll
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* View Mode Toggle */}
          <div className="flex p-0.5 rounded-full bg-[#EEE7DE] border border-[#D8CEBF]">
            <button
              onClick={() => setActiveViewMode('smooth-ribbon')}
              className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-wider transition-all ${
                activeViewMode === 'smooth-ribbon'
                  ? 'bg-[#171512] text-[#F7F3EE] font-medium'
                  : 'text-[#7A7167] hover:text-[#171512]'
              }`}
            >
              Smooth Ribbon (Full Width)
            </button>
            <button
              onClick={() => setActiveViewMode('exact-panorama')}
              className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-wider transition-all ${
                activeViewMode === 'exact-panorama'
                  ? 'bg-[#171512] text-[#F7F3EE] font-medium'
                  : 'text-[#7A7167] hover:text-[#171512]'
              }`}
            >
              3D Curved Arc View
            </button>
          </div>

          {/* Auto-scroll Play / Pause */}
          {activeViewMode === 'smooth-ribbon' && (
            <button
              onClick={() => setIsAutoScrolling(!isAutoScrolling)}
              className="p-1.5 rounded-full border border-[#D8CEBF] bg-[#F7F3EE] text-[#171512] hover:bg-[#EEE7DE] transition-colors"
              title={isAutoScrolling ? 'Pause smooth scroll' : 'Resume smooth scroll'}
            >
              {isAutoScrolling ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          MODE 1: FULL-WIDTH SMOOTH SCROLLING 3D CURVED RIBBON
          ========================================================================= */}
      {activeViewMode === 'smooth-ribbon' ? (
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handleMouseUpOrLeave();
          }}
        >
          {/* Subtle edge gradient masks for editorial luxury feel */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-[#F7F3EE] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-[#F7F3EE] to-transparent z-20 pointer-events-none" />

          {/* Floating Left and Right smooth glide arrows */}
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#171512]/90 hover:bg-[#171512] text-[#F7F3EE] backdrop-blur-sm flex items-center justify-center transition-all shadow-md opacity-80 hover:opacity-100 hover:scale-105"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#171512]/90 hover:bg-[#171512] text-[#F7F3EE] backdrop-blur-sm flex items-center justify-center transition-all shadow-md opacity-80 hover:opacity-100 hover:scale-105"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Smooth Scrollable Full-Width Track */}
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            className={`w-full flex gap-4 md:gap-5 px-6 md:px-12 overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing pb-6 pt-2 ${
              isDragging ? 'scroll-auto' : 'scroll-smooth'
            }`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              perspective: '1400px',
              perspectiveOrigin: 'center center',
            }}
          >
            {/* Duplicated list for seamless infinite feeling */}
            {[...rooms, ...rooms].map((room, index) => {
              const transformStyle = getCylinderTransform(index);

              return (
                <div
                  key={`${room.id}-${index}`}
                  onClick={() => onSelectProject(room.projectId)}
                  style={{
                    transform: transformStyle,
                    transformStyle: 'preserve-3d',
                  }}
                  className="group relative flex-shrink-0 w-[240px] sm:w-[280px] md:w-[320px] lg:w-[340px] aspect-[3/4.2] overflow-hidden bg-[#EEE7DE] border border-[#E3DACF] transition-all duration-500 hover:scale-[1.03] hover:border-[#171512] hover:shadow-xl cursor-pointer"
                >
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Dark subtle gradient overlay on hover with room details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-[#F7F3EE]">
                    <span className="text-[10px] uppercase tracking-widest text-[#D8CEBF] font-medium">
                      {room.category}
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl text-white mt-1">
                      {room.title}
                    </h4>
                    <p className="text-[11px] text-[#C4B9AA] mt-1 line-clamp-2">
                      {room.concept}
                    </p>
                    <div className="mt-3 pt-2 border-t border-white/20 flex items-center justify-between text-[11px]">
                      <span className="text-white/80">{room.location}</span>
                      <span className="underline underline-offset-2 flex items-center gap-1 font-medium">
                        View Space <Eye className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  {/* Persistent minimal label tag at bottom */}
                  <div className="absolute bottom-3 left-3 bg-[#171512]/75 backdrop-blur-xs px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#F7F3EE] group-hover:opacity-0 transition-opacity">
                    {room.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* =========================================================================
            MODE 2: EXACT 3D CURVED PANORAMIC ARC (MATCHING USER IMAGE STYLE)
            ========================================================================= */
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-2">
          {/* 3D Cylindrical Concave Curve Container */}
          <div
            className="w-full flex items-center justify-center gap-2 sm:gap-3 md:gap-4 overflow-hidden"
            style={{
              perspective: '1200px',
              perspectiveOrigin: 'center center',
            }}
          >
            {rooms.slice(0, 5).map((room, index) => {
              // Exact 3D angle calculations matching image_46d98807.png
              const rotations = [17, 8.5, 0, -8.5, -17];
              const zTranslations = [-22, -6, 12, -6, -22];

              return (
                <div
                  key={room.id}
                  onClick={() => onSelectProject(room.projectId)}
                  style={{
                    transform: `rotateY(${rotations[index]}deg) translateZ(${zTranslations[index]}px)`,
                    transformStyle: 'preserve-3d',
                  }}
                  className="group relative flex-1 aspect-[3/4.2] overflow-hidden bg-[#EEE7DE] border border-[#E3DACF] shadow-sm transition-all duration-500 hover:scale-105 hover:border-[#171512] hover:shadow-2xl cursor-pointer"
                >
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Subtle inner shadow evoking curved screen depth */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none" />

                  {/* Hover Information */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-[#F7F3EE]">
                    <span className="text-[9px] uppercase tracking-widest text-[#D8CEBF]">
                      {room.category}
                    </span>
                    <h4 className="font-serif text-lg sm:text-xl text-white mt-0.5">
                      {room.title}
                    </h4>
                    <span className="text-[10px] text-white/90 underline mt-2 flex items-center gap-1">
                      Explore Space →
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 bg-[#171512]/70 backdrop-blur-xs px-2 py-0.5 text-[9px] uppercase tracking-wider text-[#F7F3EE] group-hover:opacity-0 transition-opacity">
                    0{index + 1} // {room.title.split(' ')[0]}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reference Asset High-Fidelity Banner */}
          <div className="mt-8 pt-6 border-t border-[#E3DACF] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <span className="text-[#5C554E] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#171512]" />
              Exact architectural panorama styled after the master elevation rendering.
            </span>
            <button
              onClick={onOpenConsultation}
              className="px-5 py-2 rounded-full bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest font-medium hover:bg-[#2C2723]"
            >
              Commission a Custom Space
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
