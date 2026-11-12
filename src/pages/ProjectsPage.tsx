import React, { useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { PageRoute } from '../types';
import { projectsData } from '../data/projects';

interface ProjectsPageProps {
  onNavigate: (route: PageRoute) => void;
  onSelectProject: (projectId: string) => void;
  onOpenConsultation: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onNavigate,
  onSelectProject,
  onOpenConsultation,
}) => {
  const [filter, setFilter] = useState<'all' | 'residential' | 'villa' | 'penthouse'>('all');

  const filteredProjects = projectsData.filter((p) => {
    if (filter === 'residential') return p.category.toLowerCase().includes('residential') || p.category.toLowerCase().includes('sanctuary');
    if (filter === 'villa') return p.category.toLowerCase().includes('villa');
    if (filter === 'penthouse') return p.category.toLowerCase().includes('penthouse');
    return true;
  });

  return (
    <div className="bg-[#F7F3EE] text-[#24201D] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A7167] font-medium">
            • PORTFOLIO ARCHIVE
          </span>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl text-[#171512] leading-[1.1]">
            Elevating Everyday Living
            <br />
            <span className="italic font-light">Through Thoughtful Design</span>
          </h1>
          <p className="mt-6 text-[#5C554E] text-sm md:text-base leading-relaxed">
            Explore our curated portfolio of residential sanctuaries, contemporary villas, and architectural restorations across Australia and abroad.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-3 pb-8 mb-12 border-b border-[#E3DACF]">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'residential', label: 'Residential Sanctuaries' },
            { id: 'villa', label: 'Contemporary Villas' },
            { id: 'penthouse', label: 'Luxury Penthouses' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider transition-all ${
                filter === tab.id
                  ? 'bg-[#171512] text-[#F7F3EE] font-medium'
                  : 'bg-[#EEE7DE] text-[#5C554E] hover:text-[#171512] hover:bg-[#E0D7CC]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-24">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                onSelectProject(project.id);
                onNavigate('project-detail');
              }}
              className="group cursor-pointer flex flex-col justify-between"
            >
              <div className="aspect-[4/5] overflow-hidden bg-[#EEE7DE] border border-[#E3DACF]">
                <img
                  src={project.heroImage}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-[#171512] group-hover:underline underline-offset-4">
                    {project.name}
                  </h3>
                  <p className="flex items-center gap-1.5 text-xs text-[#7A7167] mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#9A8F82]" />
                    {project.location} • {project.area}
                  </p>
                  <p className="text-[11px] text-[#5C554E] mt-2 line-clamp-2">
                    {project.tagline}
                  </p>
                </div>
                <div className="text-right shrink-0 pl-3">
                  <span className="font-sans text-xs font-semibold text-[#171512]">
                    {project.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Consultation Banner */}
        <div className="bg-[#EEE7DE] border border-[#E0D7CC] p-10 md:p-14 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-[#171512]">
            Ready to Commission Your Own Sanctuary?
          </h2>
          <p className="text-xs md:text-sm text-[#5C554E] max-w-md mx-auto mt-3">
            Contact our design studio directors to discuss site location, architectural drawings, and budget parameters.
          </p>
          <div className="mt-6">
            <button
              onClick={onOpenConsultation}
              className="px-8 py-3.5 rounded-full bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest font-medium hover:bg-[#2C2723]"
            >
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
