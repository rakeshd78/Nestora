import React from 'react';
import { ArrowRight, Award, Compass, Eye, HeartHandshake } from 'lucide-react';
import { PageRoute } from '../types';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenConsultation: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <div className="bg-[#F7F3EE] text-[#24201D] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A7167] font-medium">
            • STUDIO PHILOSOPHY
          </span>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl text-[#171512] leading-[1.1]">
            We Shape Spaces That
            <br />
            <span className="italic font-light">Endure Beyond Ephemeral Trends</span>
          </h1>
          <p className="mt-6 text-[#5C554E] text-sm md:text-base leading-relaxed">
            Founded in 2018 in Melbourne, Nestora is an architectural interior design studio dedicated to cultivating stillness, warmth, and human connection through tactile materialism and disciplined spatial geometry.
          </p>
        </div>

        {/* Hero Collage */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-24">
          <div className="md:col-span-7 aspect-[16/10] overflow-hidden bg-[#EEE7DE] border border-[#E3DACF]">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="Nestora Design Studio Interior"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-5 space-y-6">
            <div className="aspect-[4/3] overflow-hidden bg-[#EEE7DE] border border-[#E3DACF]">
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80"
                alt="Tactile Plaster and Lighting"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 bg-[#EEE7DE]/60 border border-[#E0D7CC]">
              <p className="font-serif italic text-base text-[#171512] leading-relaxed">
                "We believe an interior is not complete when there is nothing left to add, but when there is nothing left that does not serve an emotional purpose."
              </p>
              <span className="block mt-3 text-xs uppercase tracking-widest text-[#7A7167]">
                Elena Vance — Principal Design Director
              </span>
            </div>
          </div>
        </div>

        {/* Studio Pillars */}
        <div className="py-16 border-y border-[#E3DACF] mb-24">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A7167] font-medium">
              • OUR PILLARS
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-[#171512]">
              The Four Foundations of Nestora
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-[#F7F3EE] border border-[#E0D7CC] space-y-3">
              <Compass className="w-6 h-6 text-[#171512] stroke-[1.5]" />
              <h3 className="font-serif text-xl text-[#171512]">Circadian Illumination</h3>
              <p className="text-xs text-[#5C554E] leading-relaxed">
                Lighting should echo astronomical rhythms. We orient structural volumes to embrace sunrise and layer 2400K nocturnal warmth.
              </p>
            </div>

            <div className="p-6 bg-[#F7F3EE] border border-[#E0D7CC] space-y-3">
              <Eye className="w-6 h-6 text-[#171512] stroke-[1.5]" />
              <h3 className="font-serif text-xl text-[#171512]">Tactile Honesty</h3>
              <p className="text-xs text-[#5C554E] leading-relaxed">
                Only real travertine, unvarnished white oak, Belgian linen, and patinated bronze. Surfaces that age with graceful dignity.
              </p>
            </div>

            <div className="p-6 bg-[#F7F3EE] border border-[#E0D7CC] space-y-3">
              <HeartHandshake className="w-6 h-6 text-[#171512] stroke-[1.5]" />
              <h3 className="font-serif text-xl text-[#171512]">Artisanal Heritage</h3>
              <p className="text-xs text-[#5C554E] leading-relaxed">
                We partner with generational stonemasons, ceramicists, and joiners across Europe, Japan, and Australia.
              </p>
            </div>

            <div className="p-6 bg-[#F7F3EE] border border-[#E0D7CC] space-y-3">
              <Award className="w-6 h-6 text-[#171512] stroke-[1.5]" />
              <h3 className="font-serif text-xl text-[#171512]">Timeless Longevity</h3>
              <p className="text-xs text-[#5C554E] leading-relaxed">
                Rejecting fast-furniture cycles. Every custom piece and built-in millwork solution is engineered to endure for decades.
              </p>
            </div>
          </div>
        </div>

        {/* Leadership & Team */}
        <div className="mb-24">
          <div className="mb-12">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A7167] font-medium">
              • LEADERSHIP
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-[#171512]">
              The Studio Directors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="aspect-[4/5] overflow-hidden bg-[#EEE7DE] border border-[#E3DACF]">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  alt="Elena Vance"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[#171512]">Elena Vance</h3>
                <p className="text-xs uppercase tracking-wider text-[#7A7167] mt-0.5">
                  Founder & Principal Design Director
                </p>
                <p className="text-xs text-[#5C554E] leading-relaxed mt-2.5">
                  Trained in Milan and Melbourne, Elena brings 16 years of interior architecture expertise specializing in private sanctuaries, custom millwork, and museum-grade residential renovations.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="aspect-[4/5] overflow-hidden bg-[#EEE7DE] border border-[#E3DACF]">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                  alt="Julian Thorne"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[#171512]">Julian Thorne</h3>
                <p className="text-xs uppercase tracking-wider text-[#7A7167] mt-0.5">
                  Co-Founder & Head of Architectural Concepts
                </p>
                <p className="text-xs text-[#5C554E] leading-relaxed mt-2.5">
                  With a master’s in spatial design from ETH Zurich, Julian guides structural flow, lighting calculations, and sustainable construction frameworks across all studio undertakings.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-[#EEE7DE] border border-[#E0D7CC] p-10 md:p-14 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-[#171512]">
            Begin Your Studio Journey
          </h2>
          <p className="text-xs md:text-sm text-[#5C554E] max-w-lg mx-auto mt-3">
            Schedule an introductory consultation at our Melbourne studio or virtually from anywhere in the world.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={onOpenConsultation}
              className="px-7 py-3 rounded-full bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest font-medium hover:bg-[#2C2723]"
            >
              Start Your Project
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="px-7 py-3 rounded-full border border-[#171512] text-[#171512] text-xs uppercase tracking-widest font-medium hover:bg-[#F7F3EE]"
            >
              Explore Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
