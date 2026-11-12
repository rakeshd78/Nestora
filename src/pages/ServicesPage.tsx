import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageRoute } from '../types';
import { servicesData } from '../data/services';
import {
  SpacePlanningIcon,
  LightingDesignIcon,
  FurnitureStylingIcon,
  ProcessIcon2,
} from '../components/WireframeIcons';

interface ServicesPageProps {
  onNavigate: (route: PageRoute) => void;
  onSelectService: (serviceId: string) => void;
  onOpenConsultation: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onSelectService,
  onOpenConsultation,
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'space-planning':
        return <SpacePlanningIcon className="w-10 h-10 text-[#2C2723]" />;
      case 'lighting-design':
        return <LightingDesignIcon className="w-10 h-10 text-[#2C2723]" />;
      case 'furniture-styling':
        return <FurnitureStylingIcon className="w-10 h-10 text-[#2C2723]" />;
      default:
        return <ProcessIcon2 className="w-10 h-10 text-[#2C2723]" />;
    }
  };

  return (
    <div className="bg-[#F7F3EE] text-[#24201D] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A7167] font-medium">
            • STUDIO DISCIPLINES
          </span>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl text-[#171512] leading-[1.1]">
            Transforming Spaces Into
            <br />
            <span className="italic font-light">Elevated Everyday Experiences</span>
          </h1>
          <p className="mt-6 text-[#5C554E] text-sm md:text-base leading-relaxed">
            From focused spatial restructuring and architectural lighting plans to full concept-to-completion interior architecture, we bring uncompromising attention to detail to every commission.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              className="bg-[#EEE7DE]/60 border border-[#E0D7CC] p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:border-[#171512] group"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#7A7167]">
                    // 0{index + 1}
                  </span>
                  <div className="text-[#171512] group-hover:scale-110 transition-transform duration-300">
                    {getIcon(service.iconType)}
                  </div>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl text-[#171512] mb-2">
                  {service.title}
                </h3>
                <p className="text-xs uppercase tracking-wider text-[#7A7167] mb-4">
                  {service.subtitle}
                </p>
                <p className="text-xs md:text-sm text-[#5C554E] leading-relaxed mb-6">
                  {service.fullDescription}
                </p>

                <div className="pt-4 border-t border-[#E0D7CC] space-y-2">
                  <h4 className="text-[11px] uppercase tracking-wider text-[#171512] font-semibold mb-2">
                    Key Deliverables:
                  </h4>
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#5C554E]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#171512] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E0D7CC] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#7A7167] block">
                    Starting Investment
                  </span>
                  <span className="text-sm font-semibold text-[#171512]">
                    {service.startingFee}
                  </span>
                </div>
                <button
                  onClick={() => {
                    onSelectService(service.id);
                    onNavigate('service-detail');
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#171512] text-[#F7F3EE] text-xs font-medium hover:bg-[#2C2723] transition-colors flex items-center gap-1.5"
                >
                  View Details
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Commission CTA */}
        <div className="bg-[#171512] text-[#F7F3EE] p-10 md:p-14 text-center rounded-xs">
          <span className="text-[11px] uppercase tracking-widest text-[#D8CEBF]">
            • BESPOKE COMMISSIONS
          </span>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">
            Have a Specific Architectural Vision?
          </h2>
          <p className="mt-3 text-xs md:text-sm text-[#A89E92] max-w-lg mx-auto leading-relaxed">
            Whether you require an advisory consultation or full-scale spatial transformation, we tailor every scope to your property and lifestyle.
          </p>
          <div className="mt-8">
            <button
              onClick={onOpenConsultation}
              className="px-8 py-3.5 rounded-full bg-[#F7F3EE] text-[#171512] text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
            >
              Schedule a Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
