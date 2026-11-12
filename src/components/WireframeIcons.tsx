import React from 'react';

export const ProcessIcon1: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  // Biconical spinning-top wireframe with horizontal equator ellipse matching Step 01 in image_6b83f888.png
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Equator horizontal ellipse */}
    <ellipse cx="50" cy="50" rx="42" ry="7" />
    
    {/* Outer diamond profile */}
    <line x1="50" y1="20" x2="8" y2="50" />
    <line x1="50" y1="20" x2="92" y2="50" />
    <line x1="50" y1="80" x2="8" y2="50" />
    <line x1="50" y1="80" x2="92" y2="50" />
    
    {/* Central vertical axis */}
    <line x1="50" y1="20" x2="50" y2="80" />
    
    {/* Top cone ribs radiating from apex */}
    <line x1="50" y1="20" x2="16" y2="52.5" />
    <line x1="50" y1="20" x2="25" y2="54.5" />
    <line x1="50" y1="20" x2="36" y2="56" />
    <line x1="50" y1="20" x2="50" y2="57" />
    <line x1="50" y1="20" x2="64" y2="56" />
    <line x1="50" y1="20" x2="75" y2="54.5" />
    <line x1="50" y1="20" x2="84" y2="52.5" />
    
    {/* Bottom cone ribs radiating from vertex */}
    <line x1="50" y1="80" x2="16" y2="52.5" />
    <line x1="50" y1="80" x2="25" y2="54.5" />
    <line x1="50" y1="80" x2="36" y2="56" />
    <line x1="50" y1="80" x2="50" y2="57" />
    <line x1="50" y1="80" x2="64" y2="56" />
    <line x1="50" y1="80" x2="75" y2="54.5" />
    <line x1="50" y1="80" x2="84" y2="52.5" />
  </svg>
);

export const ProcessIcon2: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  // Circular radial geodesic web / wheel matching Step 02 in image_6b83f888.png
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Concentric rings */}
    <circle cx="50" cy="50" r="10" />
    <circle cx="50" cy="50" r="18" />
    <circle cx="50" cy="50" r="26" />
    <circle cx="50" cy="50" r="34" />
    <circle cx="50" cy="50" r="40" />
    
    {/* 12 Radial spokes extending slightly past the outer ring */}
    <line x1="50" y1="6" x2="50" y2="94" />
    <line x1="6" y1="50" x2="94" y2="50" />
    <line x1="19" y1="19" x2="81" y2="81" />
    <line x1="19" y1="81" x2="81" y2="19" />
    
    <line x1="28.4" y1="12.6" x2="71.6" y2="87.4" />
    <line x1="12.6" y1="28.4" x2="87.4" y2="71.6" />
    <line x1="12.6" y1="71.6" x2="87.4" y2="28.4" />
    <line x1="28.4" y1="87.4" x2="71.6" y2="12.6" />
  </svg>
);

export const ProcessIcon3: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  // Nested architectural wireframe rectangles with lateral circular arcs matching Step 03 in image_6b83f888.png
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Outer circular brackets */}
    <path d="M 45 13 A 38 38 0 0 0 45 87" />
    <path d="M 55 13 A 38 38 0 0 1 55 87" />
    
    <path d="M 45 20 A 31 31 0 0 0 45 80" />
    <path d="M 55 20 A 31 31 0 0 1 55 80" />
    
    {/* Concentric nested rectangles */}
    <rect x="22" y="24" width="56" height="52" />
    <rect x="30" y="31" width="40" height="38" />
    <rect x="37" y="38" width="26" height="24" />
    
    {/* Horizontal guide lines */}
    <line x1="12" y1="50" x2="88" y2="50" />
    <line x1="22" y1="38" x2="78" y2="38" />
    <line x1="22" y1="62" x2="78" y2="62" />
  </svg>
);

export const SpacePlanningIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  // Architectural partition & room layout icon matching Reference Card 1
  <svg
    viewBox="0 0 36 36"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Outer walls */}
    <rect x="6" y="6" width="24" height="24" />
    {/* Internal dividing wall */}
    <line x1="17" y1="6" x2="17" y2="16" />
    <line x1="17" y1="22" x2="17" y2="30" />
    {/* Horizontal partition */}
    <line x1="6" y1="18" x2="17" y2="18" />
    {/* Dotted door swing transition */}
    <line x1="23" y1="6" x2="23" y2="15" />
    <line x1="23" y1="15" x2="23" y2="22" strokeDasharray="1.8 1.8" />
  </svg>
);

export const LightingDesignIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  // Scalloped parasol table lamp icon matching Reference Card 2
  <svg
    viewBox="0 0 36 36"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Finial at apex */}
    <line x1="18" y1="6" x2="18" y2="8.5" />
    {/* Scalloped umbrella dome shade with 3 downward ripples */}
    <path d="M 8 19 C 8.5 11, 27.5 11, 28 19 C 25.5 17.5, 23.5 17.5, 21.3 19 C 19.2 17.5, 16.8 17.5, 14.7 19 C 12.5 17.5, 10.5 17.5, 8 19 Z" />
    {/* Central lamp rod */}
    <line x1="18" y1="19" x2="18" y2="30" />
    {/* Horizontal base */}
    <line x1="13" y1="30" x2="23" y2="30" />
  </svg>
);

export const FurnitureStylingIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  // Dining table, centerpiece dish & chairs icon matching Reference Card 3
  <svg
    viewBox="0 0 36 36"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Tabletop */}
    <line x1="11" y1="16" x2="25" y2="16" />
    {/* Table legs */}
    <line x1="13" y1="16" x2="13" y2="29" />
    <line x1="23" y1="16" x2="23" y2="29" />
    {/* Centerpiece decorative bowl on table */}
    <path d="M 16 16 C 16 13.5, 20 13.5, 20 16 Z" />
    {/* Left Chair */}
    <line x1="7" y1="10" x2="7" y2="29" />
    <path d="M 7 20 H 11 V 29" />
    {/* Right Chair */}
    <line x1="29" y1="10" x2="29" y2="29" />
    <path d="M 29 20 H 25 V 29" />
  </svg>
);
