import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, DollarSign, Layers } from 'lucide-react';
import { PageRoute } from '../types';
import { servicesData } from '../data/services';

interface ServiceDetailPageProps {
  serviceId: string;
  onNavigate: (route: PageRoute) => void;
  onSelectService: (serviceId: string) => void;
  onOpenConsultation: () => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceId,
  onNavigate,
  onSelectService,
  onOpenConsultation,
}) => {
  const service = servicesData.find((s) => s.id === serviceId) || servicesData[0];

  return (
    <div className="bg-[#F7F3EE] text-[#24201D] py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Back Link */}
        <button
          onClick={() => onNavigate('services')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#7A7167] hover:text-[#171512] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to All Services
        </button>

        {/* Header */}
        <div className="space-y-3 mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A7167] font-medium">
            • SERVICE SPECIFICATION
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#171512] leading-[1.1]">
            {service.title}
          </h1>
          <p className="font-serif italic text-xl text-[#5C554E]">
            {service.subtitle}
          </p>
        </div>

        {/* Meta Highlights Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-[#EEE7DE] border border-[#E0D7CC] mb-12">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#171512]" />
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#7A7167] block">
                Typical Duration
              </span>
              <span className="text-xs font-semibold text-[#171512]">{service.duration}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-[#171512]" />
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#7A7167] block">
                Studio Retainer / Fee
              </span>
              <span className="text-xs font-semibold text-[#171512]">From {service.startingFee}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-[#171512]" />
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#7A7167] block">
                Scope Suitability
              </span>
              <span className="text-xs font-semibold text-[#171512]">Custom Tailored</span>
            </div>
          </div>
        </div>

        {/* Full Description & Overview */}
        <div className="space-y-6 text-sm md:text-base text-[#5C554E] leading-relaxed mb-16">
          <p>{service.fullDescription}</p>
          <p>
            Ideal for: <strong className="text-[#171512]">{service.idealFor}</strong>
          </p>
        </div>

        {/* Process Steps */}
        <div className="mb-16">
          <h2 className="font-serif text-3xl text-[#171512] mb-8">
            How We Execute This Discipline
          </h2>
          <div className="space-y-4">
            {service.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#F7F3EE] border border-[#E0D7CC] flex flex-col sm:flex-row sm:items-start gap-4"
              >
                <span className="font-mono text-xs font-semibold text-[#7A7167] sm:w-16 shrink-0">
                  0{idx + 1} //
                </span>
                <div>
                  <h3 className="font-serif text-lg text-[#171512] font-medium">{step.title}</h3>
                  <p className="text-xs text-[#5C554E] mt-1 leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables List */}
        <div className="p-8 bg-[#EEE7DE]/60 border border-[#E0D7CC] mb-16">
          <h3 className="font-serif text-2xl text-[#171512] mb-6">Included Documentation & Deliverables</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.deliverables.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-[#4A433D]">
                <CheckCircle2 className="w-4 h-4 text-[#171512] mt-0.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Bottom Card */}
        <div className="p-8 md:p-12 bg-[#171512] text-[#F7F3EE] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#D8CEBF]">
              • COMMENCE SERVICE
            </span>
            <h3 className="font-serif text-2xl md:text-3xl mt-1">
              Ready to Initiate {service.title}?
            </h3>
            <p className="text-xs text-[#A89E92] mt-1">
              Our design directors will assemble a tailored scope of work and timeline.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="px-6 py-3 rounded-full bg-[#F7F3EE] text-[#171512] text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors shrink-0"
          >
            Book Consultation
          </button>
        </div>
      </div>
    </div>
  );
};
