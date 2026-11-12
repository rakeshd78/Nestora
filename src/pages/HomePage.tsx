import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Quote } from 'lucide-react';
import { PageRoute, Project } from '../types';
import { projectsData } from '../data/projects';
import { servicesData } from '../data/services';
import { testimonialsData } from '../data/testimonials';
import { blogsData } from '../data/blogs';
import {
  ProcessIcon1,
  ProcessIcon2,
  ProcessIcon3,
  SpacePlanningIcon,
  LightingDesignIcon,
  FurnitureStylingIcon,
} from '../components/WireframeIcons';
const heroGallery = [
  {
    title: 'Dining Area',
    subtitle: 'European Oak & Sage Niche',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=900&q=80',
    projectId: 'residential-living',
  },
  {
    title: 'Creative Study',
    subtitle: 'Travertine & Minimalist Diptych',
    image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=900&q=80',
    projectId: 'cedar-house',
  },
  {
    title: 'Master Bedroom',
    subtitle: 'Backlit Headboard & Belgian Linen',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80',
    projectId: 'residential-living',
  },
  {
    title: 'Lounge Suite',
    subtitle: 'Curved Bouclé & Sculpted Timber',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80',
    projectId: 'arden-villa',
  },
  {
    title: 'Arched Sanctuary',
    subtitle: 'Mediterranean Barrel Arch Vault',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80',
    projectId: 'maison-verde',
  },
];

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onSelectProject: (projectId: string) => void;
  onSelectService: (serviceId: string) => void;
  onSelectBlog: (blogId: string) => void;
  onOpenConsultation: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProject,
  onSelectService,
  onSelectBlog,
  onOpenConsultation,
}) => {
  // Carousel state for Section 5 (Selected Projects)
  const [projectIndex, setProjectIndex] = useState(0);

  const handlePrevProject = () => {
    setProjectIndex((prev) => (prev === 0 ? Math.max(0, projectsData.length - 4) : prev - 1));
  };

  const handleNextProject = () => {
    setProjectIndex((prev) => (prev >= projectsData.length - 4 ? 0 : prev + 1));
  };

  return (
    <div className="bg-[#F7F3EE] text-[#24201D] overflow-hidden">
      {/* =========================================================================
          SECTION 2: HERO SECTION (DEFAULT AS PER REFERENCE DESIGN)
          ========================================================================= */}
      <section className="relative pt-12 md:pt-16 pb-14 md:pb-20 overflow-hidden border-b border-[#E8E2D7] bg-[#F7F3EE]">
        {/* Subtle Architectural Sketch Wireframe Background */}
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
            <circle cx="600" cy="200" r="3.5" fill="#171512" />
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

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[74px] font-normal tracking-tight text-[#171512] leading-[1.08]">
            Crafting Atmospheres
            <br />
            <span className="italic font-light">Shaping Experiences</span>
          </h1>

          <p className="mt-5 text-[#5C554E] text-xs sm:text-sm md:text-[15px] max-w-xl mx-auto leading-relaxed">
            Thoughtfully designed interiors where timeless materials, refined details, and everyday comfort come together beautifully.
          </p>

          <div className="mt-7 mb-12 md:mb-14">
            <button
              onClick={onOpenConsultation}
              className="px-8 py-3.5 rounded-full bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest font-semibold hover:bg-[#2C2723] hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
            >
              Start Your Project
            </button>
          </div>
        </div>

        {/* 5 Premium Interior Photographs in a Single Horizontal Row / Curved Arc */}
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <div
            className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 overflow-hidden"
            style={{
              perspective: '1200px',
              perspectiveOrigin: 'center center',
            }}
          >
            {heroGallery.map((item, index) => {
              const rotations = [14, 7, 0, -7, -14];
              const zTranslations = [-16, -4, 8, -4, -16];

              return (
                <div
                  key={index}
                  onClick={() => {
                    onSelectProject(item.projectId);
                    onNavigate('project-detail');
                  }}
                  style={{
                    transform: `rotateY(${rotations[index]}deg) translateZ(${zTranslations[index]}px)`,
                    transformStyle: 'preserve-3d',
                  }}
                  className="group relative flex-1 aspect-[3/4.2] overflow-hidden bg-[#EEE7DE] border border-[#E3DACF] shadow-sm transition-all duration-500 hover:scale-105 hover:border-[#171512] hover:shadow-2xl cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-[#F7F3EE]">
                    <span className="text-[10px] uppercase tracking-widest text-[#D8CEBF]">
                      {item.subtitle}
                    </span>
                    <h4 className="font-serif text-lg sm:text-xl text-white mt-0.5">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-white/90 underline mt-2 flex items-center gap-1 font-medium">
                      View Project →
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 bg-[#171512]/70 backdrop-blur-xs px-2.5 py-1 text-[9px] uppercase tracking-wider text-[#F7F3EE] group-hover:opacity-0 transition-opacity">
                    {item.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 3: ABOUT US (EXACT FLOATING EDITORIAL COLLAGE MATCHING REFERENCE)
          ========================================================================= */}
      <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden bg-[#F7F3EE]">
        <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 lg:min-h-[580px] xl:min-h-[640px] flex items-center justify-center">
          {/* Floating Editorial Photo 1: Top-Left (Curved Terracotta Velvet Sofa & Wall Mirror) */}
          <div className="hidden lg:block absolute left-8 xl:left-14 top-6 xl:top-10 w-40 xl:w-48 aspect-square overflow-hidden bg-[#EEE7DE] border border-[#E3DACF] shadow-xs transition-transform duration-700 hover:scale-105 hover:shadow-md z-0">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80"
              alt="Curved Velvet Sofa & Wall Mirror Detail"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Floating Editorial Photo 2: Bottom-Left (Living Room with Slatted Oak Fireplace) */}
          <div className="hidden lg:block absolute left-2 xl:left-6 bottom-4 xl:bottom-8 w-56 xl:w-68 aspect-[4/3] overflow-hidden bg-[#EEE7DE] border border-[#E3DACF] shadow-xs transition-transform duration-700 hover:scale-105 hover:shadow-md z-0">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
              alt="Living Room with Slatted Oak Wall and Fireplace"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Central Editorial Content */}
          <div className="relative z-10 text-center max-w-md sm:max-w-lg lg:max-w-xl mx-auto px-4 py-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A7167] font-medium block mb-3">
              • ABOUT US
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal text-[#171512] leading-[1.12]">
              Designing Spaces Beyond the
              <br />
              <span className="italic font-light">Ordinary Creating Interiors</span>
            </h2>
            <p className="mt-6 text-[#5C554E] text-xs sm:text-sm md:text-[14px] max-w-lg mx-auto leading-relaxed">
              We create refined interiors where thoughtful materials, natural light, and timeless details come together to make every space feel distinctly yours. From the first concept to the final detail, we carefully balance form, function.
            </p>
            <div className="mt-7">
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#171512] font-semibold hover:gap-3 transition-all underline underline-offset-4 decoration-[#171512]/40 hover:decoration-[#171512]"
              >
                More About Us →
              </button>
            </div>
          </div>

          {/* Floating Editorial Photo 3: Middle-Right (Living Room with Framed Artwork in Morning Sun) */}
          <div className="hidden lg:block absolute right-16 xl:right-28 top-16 xl:top-20 w-44 xl:w-52 aspect-[4/3] overflow-hidden bg-[#EEE7DE] border border-[#E3DACF] shadow-xs transition-transform duration-700 hover:scale-105 hover:shadow-md z-0">
            <img
              src="https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=800&q=80"
              alt="Living Room with Framed Art Piece"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Floating Editorial Photo 4: Bottom-Right (Arched Mediterranean Vaulted Bedroom) */}
          <div className="hidden lg:block absolute right-2 xl:right-8 bottom-2 xl:bottom-6 w-56 xl:w-68 aspect-[4/3] overflow-hidden bg-[#EEE7DE] border border-[#E3DACF] shadow-xs transition-transform duration-700 hover:scale-105 hover:shadow-md z-0">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
              alt="Mediterranean Arched Vault Bedroom"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Mobile & Tablet Fallback Grid (Graceful presentation on screens < lg) */}
        <div className="lg:hidden max-w-4xl mx-auto px-6 mt-10 grid grid-cols-2 gap-4">
          <div className="aspect-square overflow-hidden bg-[#EEE7DE] border border-[#E3DACF]">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80"
              alt="Curved Velvet Sofa & Wall Mirror Detail"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] overflow-hidden bg-[#EEE7DE] border border-[#E3DACF]">
            <img
              src="https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=600&q=80"
              alt="Living Room with Framed Art Piece"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] overflow-hidden bg-[#EEE7DE] border border-[#E3DACF]">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
              alt="Living Room with Slatted Oak Wall and Fireplace"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] overflow-hidden bg-[#EEE7DE] border border-[#E3DACF]">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80"
              alt="Mediterranean Arched Vault Bedroom"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: OUR SERVICES (EXACT MATCHING ATTACHMENT IMAGE_39999447.PNG)
          ========================================================================= */}
      <section className="py-20 md:py-28 bg-[#F7F3EE]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A7167] font-medium block">
                • OUR SERVICES
              </span>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal text-[#171512] leading-[1.08] tracking-[-0.015em]">
                Transforming Spaces Into
                <br />
                <span className="italic font-light">Elevated Everyday Experiences</span>
              </h2>
            </div>
            <div>
              <button
                onClick={() => onNavigate('services')}
                className="px-7 py-3 rounded-full bg-[#171512] text-[#F7F3EE] text-xs font-medium tracking-wide hover:bg-[#2C2723] transition-colors"
              >
                View All Services
              </button>
            </div>
          </div>

          {/* 3 Contiguous Connected Service Cards matching image_39999447.png */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-[#D8CEBF] bg-[#F7F3EE] divide-y md:divide-y-0 md:divide-x divide-[#D8CEBF]">
            {/* Card 1 – Space Planning */}
            <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between text-center transition-colors duration-300 hover:bg-[#F2ECE3]/60 group">
              <div>
                <div className="flex justify-center mb-6 text-[#171512] group-hover:scale-105 transition-transform duration-300">
                  <SpacePlanningIcon className="w-11 h-11 text-[#24201D]" />
                </div>
                <h3 className="font-serif text-2xl sm:text-[26px] text-[#171512] font-normal mb-3">
                  Space Planning
                </h3>
                <p className="text-xs sm:text-[13px] text-[#5C554E] leading-[1.65] max-w-[280px] mx-auto">
                  Adignissim sollicitudin hendrerit efficitur an fermentum conubia sed sodales imp sapie dui, parturient ornare lobo.
                </p>
              </div>
              <div className="mt-10">
                <button
                  onClick={() => {
                    onSelectService('space-planning');
                    onNavigate('service-detail');
                  }}
                  className="text-[11px] uppercase tracking-[0.2em] text-[#171512] font-semibold underline underline-offset-8 decoration-1 decoration-[#171512] hover:text-[#5C554E] hover:decoration-[#5C554E] transition-colors"
                >
                  VIEW DETAILS
                </button>
              </div>
            </div>

            {/* Card 2 – Lighting Design */}
            <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between text-center transition-colors duration-300 hover:bg-[#F2ECE3]/60 group">
              <div>
                <div className="flex justify-center mb-6 text-[#171512] group-hover:scale-105 transition-transform duration-300">
                  <LightingDesignIcon className="w-11 h-11 text-[#24201D]" />
                </div>
                <h3 className="font-serif text-2xl sm:text-[26px] text-[#171512] font-normal mb-3">
                  Lighting Design
                </h3>
                <p className="text-xs sm:text-[13px] text-[#5C554E] leading-[1.65] max-w-[280px] mx-auto">
                  Adignissim sollicitudin hendrerit efficitur an fermentum conubia sed sodales imp sapie dui, parturient ornare lobo.
                </p>
              </div>
              <div className="mt-10">
                <button
                  onClick={() => {
                    onSelectService('lighting-design');
                    onNavigate('service-detail');
                  }}
                  className="text-[11px] uppercase tracking-[0.2em] text-[#171512] font-semibold underline underline-offset-8 decoration-1 decoration-[#171512] hover:text-[#5C554E] hover:decoration-[#5C554E] transition-colors"
                >
                  VIEW DETAILS
                </button>
              </div>
            </div>

            {/* Card 3 – Furniture & Styling */}
            <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between text-center transition-colors duration-300 hover:bg-[#F2ECE3]/60 group">
              <div>
                <div className="flex justify-center mb-6 text-[#171512] group-hover:scale-105 transition-transform duration-300">
                  <FurnitureStylingIcon className="w-11 h-11 text-[#24201D]" />
                </div>
                <h3 className="font-serif text-2xl sm:text-[26px] text-[#171512] font-normal mb-3">
                  Furniture & Styling
                </h3>
                <p className="text-xs sm:text-[13px] text-[#5C554E] leading-[1.65] max-w-[280px] mx-auto">
                  Adignissim sollicitudin hendrerit efficitur an fermentum conubia sed sodales imp sapie dui, parturient ornare lobo.
                </p>
              </div>
              <div className="mt-10">
                <button
                  onClick={() => {
                    onSelectService('furniture-styling');
                    onNavigate('service-detail');
                  }}
                  className="text-[11px] uppercase tracking-[0.2em] text-[#171512] font-semibold underline underline-offset-8 decoration-1 decoration-[#171512] hover:text-[#5C554E] hover:decoration-[#5C554E] transition-colors"
                >
                  VIEW DETAILS
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: SELECTED PROJECTS / PORTFOLIO
          ========================================================================= */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A7167] font-medium">
              • OUR PROJECTS
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#171512] leading-[1.12]">
              Elevating Everyday Living
              <br />
              <span className="italic font-light">Through Thoughtful Design</span>
            </h2>
          </div>

          {/* Carousel arrow controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrevProject}
              className="w-10 h-10 rounded-full border border-[#D8CEBF] flex items-center justify-center text-[#171512] hover:bg-[#171512] hover:text-[#F7F3EE] hover:border-[#171512] transition-colors"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextProject}
              className="w-10 h-10 rounded-full bg-[#171512] text-[#F7F3EE] flex items-center justify-center hover:bg-[#2C2723] transition-colors"
              aria-label="Next Project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Project Cards layout matching reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectsData.slice(projectIndex, projectIndex + 4).map((project) => (
            <div
              key={project.id}
              onClick={() => {
                onSelectProject(project.id);
                onNavigate('project-detail');
              }}
              className="group cursor-pointer flex flex-col justify-between"
            >
              <div className="aspect-[3/3.8] overflow-hidden bg-[#EEE7DE] border border-[#E3DACF]">
                <img
                  src={project.heroImage}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-lg text-[#171512] group-hover:underline underline-offset-2">
                    {project.name}
                  </h3>
                  <p className="flex items-center gap-1 text-[11px] text-[#7A7167] mt-0.5">
                    <MapPin className="w-3 h-3 text-[#9A8F82]" />
                    {project.location}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-sans text-xs font-medium text-[#171512]">
                    {project.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: OUR PROCESS / HOW IT WORKS (EXACT MATCHING ATTACHMENT IMAGE_6b83f888.PNG)
          ========================================================================= */}
      <section id="how-it-works" className="py-24 md:py-32 bg-[#F7F3EE]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A7167] font-medium block mb-3">
              • HOW IT WORKS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal text-[#171512] leading-[1.1] tracking-[-0.015em]">
              Building Beautiful Interiors
              <br />
              <span className="italic font-light">Through Intentional Process</span>
            </h2>
          </div>

          {/* 3 Open Step Columns with Left Vertical Divider Borders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
            {/* Step 01 */}
            <div className="border-l border-[#D8CEBF] pl-6 sm:pl-8 lg:pl-10 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#7A7167] block mb-10 sm:mb-14">
                  // STEP 01
                </span>
                <div className="w-16 h-16 sm:w-20 sm:h-20 mb-10 sm:mb-12 text-[#24201D]">
                  <ProcessIcon1 className="w-full h-full text-[#24201D]" />
                </div>
                <h3 className="font-serif text-2xl sm:text-[26px] text-[#171512] font-normal mb-3 leading-snug">
                  Consulation & Vision
                </h3>
                <p className="text-xs sm:text-[13px] text-[#5C554E] leading-[1.65] max-w-xs">
                  We understand your space, lifestyle, needs, and vision to create the right design direction.
                </p>
              </div>
            </div>

            {/* Step 02 */}
            <div className="border-l border-[#D8CEBF] pl-6 sm:pl-8 lg:pl-10 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#7A7167] block mb-10 sm:mb-14">
                  // STEP 02
                </span>
                <div className="w-16 h-16 sm:w-20 sm:h-20 mb-10 sm:mb-12 text-[#24201D]">
                  <ProcessIcon2 className="w-full h-full text-[#24201D]" />
                </div>
                <h3 className="font-serif text-2xl sm:text-[26px] text-[#171512] font-normal mb-3 leading-snug">
                  Design & Development
                </h3>
                <p className="text-xs sm:text-[13px] text-[#5C554E] leading-[1.65] max-w-xs">
                  We shape the concept through layouts, materials, colors, textures, and carefully considered details.
                </p>
              </div>
            </div>

            {/* Step 03 */}
            <div className="border-l border-[#D8CEBF] pl-6 sm:pl-8 lg:pl-10 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#7A7167] block mb-10 sm:mb-14">
                  // STEP 03
                </span>
                <div className="w-16 h-16 sm:w-20 sm:h-20 mb-10 sm:mb-12 text-[#24201D]">
                  <ProcessIcon3 className="w-full h-full text-[#24201D]" />
                </div>
                <h3 className="font-serif text-2xl sm:text-[26px] text-[#171512] font-normal mb-3 leading-snug">
                  Execution & Delivery
                </h3>
                <p className="text-xs sm:text-[13px] text-[#5C554E] leading-[1.65] max-w-xs">
                  We bring the vision to life with refined visuals, furniture selections, lighting, and functional planning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: CLIENT TESTIMONIALS
          ========================================================================= */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A7167] font-medium">
            • TESTIMONIALS
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#171512] leading-[1.12]">
            Experiences Elevated Through
            <br />
            <span className="italic font-light">Intentional Design Polished</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Large Featured Card */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#EEE7DE] border border-[#E3DACF]">
              <img
                src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80"
                alt="Bedroom Suite Interior"
                className="w-full h-full object-cover"
              />
              {/* Floating review card matching reference image */}
              <div className="absolute inset-x-6 bottom-6 bg-[#F7F3EE]/95 backdrop-blur-sm p-6 border border-[#E3DACF] shadow-sm">
                <p className="text-xs sm:text-[13px] text-[#2C2723] leading-relaxed italic font-serif">
                  "From the layout to the smallest details, everything was thoughtfully designed. Our home now feels effortlessly elegant the design feels timeless."
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                      alt="Ryan Mitchell"
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-[#171512]"
                    />
                    <div>
                      <h4 className="font-serif text-xs font-semibold text-[#171512]">
                        Ryan Mitchell
                      </h4>
                      <p className="text-[10px] text-[#7A7167]">Homeowner</p>
                    </div>
                  </div>
                  <Quote className="w-5 h-5 text-[#C4B9AA] rotate-180" />
                </div>
              </div>
            </div>

            {/* Statistics row directly beneath left card */}
            <div className="pt-4 border-t border-[#E3DACF]">
              <h3 className="font-serif text-2xl text-[#171512] mb-6">
                Real Homes, Beautifully Transformed
              </h3>
              <div className="grid grid-cols-3 gap-6 text-left">
                <div>
                  <span className="font-serif text-3xl sm:text-4xl text-[#171512] block">
                    4.9/5
                  </span>
                  <span className="text-[11px] text-[#7A7167] tracking-wider uppercase mt-1 block">
                    Client Rating
                  </span>
                </div>
                <div>
                  <span className="font-serif text-3xl sm:text-4xl text-[#171512] block">
                    120+
                  </span>
                  <span className="text-[11px] text-[#7A7167] tracking-wider uppercase mt-1 block">
                    Spaces Designed
                  </span>
                </div>
                <div>
                  <span className="font-serif text-3xl sm:text-4xl text-[#171512] block">
                    98%
                  </span>
                  <span className="text-[11px] text-[#7A7167] tracking-wider uppercase mt-1 block">
                    Client Satisfaction
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right 3 Stacked Testimonials */}
          <div className="lg:col-span-5 space-y-4">
            {/* Card 1 */}
            <div className="bg-[#EEE7DE]/60 border border-[#E0D7CC] p-6 space-y-4">
              <p className="text-xs text-[#2C2723] leading-relaxed">
                "My home finally feels like a reflection of my personality. Every detail feels intentional, warm, and beautifully balanced."
              </p>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Ryan Mitchell"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="font-serif text-xs font-semibold text-[#171512]">
                      Ryan Mitchell
                    </h5>
                    <p className="text-[10px] text-[#7A7167]">Homeowner</p>
                  </div>
                </div>
                <Quote className="w-4 h-4 text-[#C4B9AA] rotate-180" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#EEE7DE]/60 border border-[#E0D7CC] p-6 space-y-4">
              <p className="text-xs text-[#2C2723] leading-relaxed">
                "The team transformed our space beyond what we imagined. The design feels timeless, functional, and incredibly inviting."
              </p>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                    alt="Olivia Brown"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="font-serif text-xs font-semibold text-[#171512]">
                      Olivia Brown
                    </h5>
                    <p className="text-[10px] text-[#7A7167]">Apartment Owner</p>
                  </div>
                </div>
                <Quote className="w-4 h-4 text-[#C4B9AA] rotate-180" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#EEE7DE]/60 border border-[#E0D7CC] p-6 space-y-4">
              <p className="text-xs text-[#2C2723] leading-relaxed">
                "My home finally feels like a reflection of my personality. Every detail feels intentional, warm, and beautifully balanced."
              </p>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                    alt="Mia Anderson"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="font-serif text-xs font-semibold text-[#171512]">
                      Mia Anderson
                    </h5>
                    <p className="text-[10px] text-[#7A7167]">Interior Design Client</p>
                  </div>
                </div>
                <Quote className="w-4 h-4 text-[#C4B9AA] rotate-180" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: OUR JOURNAL / BLOG
          ========================================================================= */}
      <section className="py-20 md:py-28 bg-[#EEE7DE]/60 border-t border-[#E3DACF]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A7167] font-medium">
                • OUR BLOG
              </span>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#171512] leading-[1.12]">
                Thoughts on Creating
                <br />
                <span className="italic font-light">Elevated Everyday Spaces</span>
              </h2>
            </div>
            <div>
              <button
                onClick={() => onNavigate('blog')}
                className="px-6 py-2.5 rounded-full bg-[#171512] text-[#F7F3EE] text-xs font-medium tracking-wide hover:bg-[#2C2723] transition-colors"
              >
                View All Blog
              </button>
            </div>
          </div>

          {/* 2 Large editorial blog cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogsData.slice(0, 2).map((post) => (
              <article
                key={post.id}
                onClick={() => {
                  onSelectBlog(post.id);
                  onNavigate('blog-detail');
                }}
                className="bg-[#F7F3EE] border border-[#E0D7CC] p-6 md:p-8 flex flex-col justify-between group cursor-pointer transition-all hover:border-[#171512]"
              >
                <div>
                  {/* Date badge and photo row */}
                  <div className="flex gap-6 items-start">
                    <div className="text-center font-serif flex-shrink-0 pt-2">
                      <span className="text-2xl md:text-3xl font-semibold text-[#171512] block">
                        {post.day}
                      </span>
                      <span className="text-[11px] uppercase tracking-wider text-[#7A7167] block">
                        {post.month}
                      </span>
                    </div>
                    <div className="flex-1 aspect-[16/10] overflow-hidden bg-[#EEE7DE] border border-[#E3DACF]">
                      <img
                        src={post.heroImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <h3 className="mt-6 font-serif text-xl md:text-2xl text-[#171512] group-hover:underline underline-offset-4 leading-snug">
                    {post.title}
                  </h3>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8E2D7] flex items-center justify-end">
                  <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#171512] font-medium group-hover:gap-2.5 transition-all">
                    Read More →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
