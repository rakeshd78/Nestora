import { Service } from '../types';

export const servicesData: Service[] = [
  {
    id: 'space-planning',
    title: 'Space Planning',
    subtitle: 'Layout Optimization & Spatial Flow',
    shortDescription:
      'Adipiscing sollicitudin hendrerit efficitur an fermentum conubia sed sodales imp sapie dui, parturient ornare lobo.',
    fullDescription:
      'Strategic layout optimization, volumetric balancing, and functional space design that uncovers latent potential in every architectural footprint. We craft intuitive circulation routes that harmonize movement, comfort, and purpose.',
    iconType: 'space-planning',
    deliverables: [
      'Comprehensive 2D & 3D Spatial Layouts',
      'Circulation & Traffic Flow Analysis',
      'Structural Partition Reconfiguration Proposals',
      'Zoning, Scale & Proportion Calibration',
      'Sightline & Daylight Optimization Mapping',
    ],
    idealFor: 'Full-home renovations, new architectural builds, and spatial reconfigurations.',
    duration: '3–6 Weeks',
    startingFee: '$8,500',
    processSteps: [
      { title: 'Site Laser Scanning & Metric Survey', detail: 'Precise dimensional analysis of ceilings, columns, and daylight angles.' },
      { title: 'Flow & Living Patterns Study', detail: 'Mapping how your family or guests move between morning, afternoon, and evening.' },
      { title: 'Schematic Zoning Options', detail: 'Three distinct spatial configurations exploring open, zoned, and private flow.' },
      { title: 'Final Technical Blueprints', detail: 'Complete CAD/BIM drawings ready for structural engineers and contractors.' },
    ],
  },
  {
    id: 'lighting-design',
    title: 'Lighting Design',
    subtitle: 'Ambient Illumination & Architectural Glow',
    shortDescription:
      'Adipiscing sollicitudin hendrerit efficitur an fermentum conubia sed sodales imp sapie dui, parturient ornare lobo.',
    fullDescription:
      'Sculptural luminaires and invisible architectural cove lighting designed to elevate mood, reveal fine textures, and adapt seamlessly across day and night. We treat light as the most transformative material in an interior.',
    iconType: 'lighting-design',
    deliverables: [
      'Layered Lighting Plan (Ambient, Task, Accent & Cove)',
      'Circadian Rhythm Automation Specifications',
      'Bespoke Luminaire & Sconce Sourcing',
      'Dimming & Smart Control System Schedules (Lutron / Casambi)',
      'Rendered Night-time Lighting Simulations',
    ],
    idealFor: 'Sanctuary homes, art collectors, luxury penthouses, and bespoke hospitality spaces.',
    duration: '2–4 Weeks',
    startingFee: '$6,200',
    processSteps: [
      { title: 'Daylight & Shadow Audit', detail: 'Measuring natural sun ingress to complement artificial fixtures.' },
      { title: 'Color Temperature Mapping', detail: 'Specifying warm 2400K–2700K Kelvin ranges to flatter skin tones and natural stones.' },
      { title: 'Luminaire Selection & Sourcing', detail: 'Curating artisanal Italian, Scandinavian, and Japanese lighting pieces.' },
      { title: 'Switching & Scene Programming', detail: 'Configuring effortless scene presets like "Welcome", "Dinner", and "Dusk".' },
    ],
  },
  {
    id: 'furniture-styling',
    title: 'Furniture & Styling',
    subtitle: 'Curated Objects, Bespoke Millwork & Art',
    shortDescription:
      'Adipiscing sollicitudin hendrerit efficitur an fermentum conubia sed sodales imp sapie dui, parturient ornare lobo.',
    fullDescription:
      'Bespoke furniture sourcing, artisanal fabric selection, and fine object curation that turn spaces into deeply personal sanctuaries. From custom travertine monoliths to hand-knotted wool rugs and gallery-caliber art.',
    iconType: 'furniture-styling',
    deliverables: [
      'Custom Millwork & Upholstery Technical Drawings',
      'Global Artisan & Gallery Sourcing',
      'Tactile Material & Fabric Samples Board',
      'White-Glove Delivery, Installation & Styling',
      'Artwork, Ceramics & Fine Accessories Dressing',
    ],
    idealFor: 'Furnishing completed residences or breathing new soul into an existing space.',
    duration: '4–8 Weeks',
    startingFee: '$9,800',
    processSteps: [
      { title: 'Tactile Palette Curation', detail: 'Presenting a tactile box of bouclé, travertine, washed linen, and patinated bronze.' },
      { title: 'Custom Millwork Prototyping', detail: 'Collaborating with master joiners on bespoke dining tables and storage.' },
      { title: 'Procurement & Logistics', detail: 'Consolidated shipping, customs clearance, and defect-free warehousing.' },
      { title: 'Editorial Dressing Day', detail: 'Our styling team dresses every shelf, pillow, and vessel down to the millimeter.' },
    ],
  },
  {
    id: 'interior-architecture',
    title: 'Turnkey Interior Architecture',
    subtitle: 'Full Concept-to-Completion Delivery',
    shortDescription:
      'Adipiscing sollicitudin hendrerit efficitur an fermentum conubia sed sodales imp sapie dui, parturient ornare lobo.',
    fullDescription:
      'Our flagship end-to-end design service. We oversee the entire lifecycle from initial architectural concept, interior construction management, material procurement, to the final styling touch on launch day.',
    iconType: 'interior-architecture',
    deliverables: [
      'Comprehensive Construction Drawings & Specifications',
      'Contractor Tendering & On-site Project Management',
      'Custom Millwork, Stone & Sanitary Fixture Details',
      'Full Furnishing, Lighting & Dressing Delivery',
      '12-Month Post-Occupancy Guarantee & Maintenance Guide',
    ],
    idealFor: 'Discerning homeowners seeking a completely managed, stress-free architectural journey.',
    duration: '4–12 Months',
    startingFee: '$28,000',
    processSteps: [
      { title: 'Vision & Feasibility Discovery', detail: 'Aligning aesthetic ambitions, lifestyle requirements, and overall project budget.' },
      { title: 'Complete Interior Documentation', detail: 'Detailed technical joinery packages, MEP coordination, and finishes.' },
      { title: 'Rigorous Site Construction Oversight', detail: 'Weekly site inspections, contractor coordination, and quality control.' },
      { title: 'The Grand Reveal', detail: 'A fully realized, pristine home with keys handed over, ready to be lived in.' },
    ],
  },
];
