import React, { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Maximize2, Tag, Check, Mail } from 'lucide-react';
import { PageRoute, Project } from '../types';
import { projectsData } from '../data/projects';

interface ProjectDetailPageProps {
  projectId: string;
  onNavigate: (route: PageRoute) => void;
  onOpenProjectEnquiry: (project: Project) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  projectId,
  onNavigate,
  onOpenProjectEnquiry,
}) => {
  const project = projectsData.find((p) => p.id === projectId) || projectsData[0];
  const [activeImage, setActiveImage] = useState(project.heroImage);

  return (
    <div className="bg-[#F7F3EE] text-[#24201D] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Back Link */}
        <button
          onClick={() => onNavigate('projects')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#7A7167] hover:text-[#171512] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to All Projects
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-[#E3DACF]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A7167] font-medium">
              • {project.category}
            </span>
            <h1 className="mt-2 font-serif text-4xl sm:text-5xl md:text-6xl text-[#171512] leading-[1.08]">
              {project.name}
            </h1>
            <p className="flex items-center gap-2 text-xs text-[#7A7167] mt-3">
              <MapPin className="w-3.5 h-3.5 text-[#9A8F82]" />
              {project.location} • Completed in {project.year} • {project.area}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-left md:text-right">
              <span className="text-[10px] uppercase tracking-wider text-[#7A7167] block">
                Total Project Investment
              </span>
              <span className="font-serif text-3xl text-[#171512]">{project.price}</span>
            </div>
            <button
              onClick={() => onOpenProjectEnquiry(project)}
              className="px-6 py-3 rounded-full bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest font-medium hover:bg-[#2C2723] transition-colors shadow-sm"
            >
              Enquire About Project
            </button>
          </div>
        </div>

        {/* Main Hero Gallery */}
        <div className="space-y-4 mb-16">
          <div className="aspect-[16/10] overflow-hidden bg-[#EEE7DE] border border-[#E3DACF]">
            <img
              src={activeImage}
              alt={project.name}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>

          {/* Gallery Thumbnails */}
          <div className="grid grid-cols-4 gap-3 md:gap-4">
            {project.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`aspect-[4/3] overflow-hidden border transition-all ${
                  activeImage === img ? 'border-[#171512] ring-1 ring-[#171512]' : 'border-[#E3DACF] opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${project.name} thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Project Tagline & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h2 className="font-serif italic text-2xl md:text-3xl text-[#171512] leading-snug">
                "{project.tagline}"
              </h2>
              <p className="mt-6 text-sm md:text-base text-[#5C554E] leading-relaxed">
                {project.overview}
              </p>
            </div>

            <div className="pt-6 border-t border-[#E3DACF]">
              <h3 className="font-serif text-2xl text-[#171512] mb-4">The Design Concept</h3>
              <p className="text-sm md:text-base text-[#5C554E] leading-relaxed">
                {project.designConcept}
              </p>
            </div>

            <div className="pt-6 border-t border-[#E3DACF]">
              <h3 className="font-serif text-2xl text-[#171512] mb-4">Key Architectural Features</h3>
              <ul className="space-y-3">
                {project.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-[#4A433D]">
                    <Check className="w-4 h-4 text-[#171512] mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Project Specs Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-[#EEE7DE] border border-[#E0D7CC] space-y-4">
              <h4 className="font-sans text-[11px] uppercase tracking-widest text-[#171512] font-semibold">
                Project Specifications
              </h4>
              <div className="space-y-3 text-xs text-[#5C554E]">
                <div className="flex justify-between py-1.5 border-b border-[#D8CEBF]">
                  <span>Client Type</span>
                  <span className="text-[#171512] font-medium">{project.clientType}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#D8CEBF]">
                  <span>Footprint Area</span>
                  <span className="text-[#171512] font-medium">{project.area}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#D8CEBF]">
                  <span>Completion Year</span>
                  <span className="text-[#171512] font-medium">{project.year}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#D8CEBF]">
                  <span>Location</span>
                  <span className="text-[#171512] font-medium">{project.location}</span>
                </div>
                <div className="flex justify-between py-1.5 text-sm text-[#171512] font-semibold">
                  <span>Scope Budget</span>
                  <span>{project.price}</span>
                </div>
              </div>
            </div>

            {/* Material Board */}
            <div className="p-6 bg-[#F7F3EE] border border-[#E0D7CC] space-y-3">
              <h4 className="font-sans text-[11px] uppercase tracking-widest text-[#171512] font-semibold">
                Tactile Material Palette
              </h4>
              <ul className="space-y-2 text-xs text-[#5C554E]">
                {project.materials.map((mat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#171512]" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onOpenProjectEnquiry(project)}
              className="w-full py-3.5 bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest font-medium hover:bg-[#2C2723] transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-3.5 h-3.5" />
              Request Case Study Monograph
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
