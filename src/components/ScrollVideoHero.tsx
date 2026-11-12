import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion } from 'motion/react';

interface ScrollVideoHeroProps {
  onOpenConsultation: () => void;
}

export const ScrollVideoHero: React.FC<ScrollVideoHeroProps> = ({ onOpenConsultation }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [duration, setDuration] = useState<number>(10);
  const targetTimeRef = useRef<number>(0);
  const lastSetTimeRef = useRef<number>(0);

  // Framer Motion useScroll hook tracking scroll of the hero container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Framer Motion useTransform hook mapping scroll progress (0 to 1) to video duration (0 to duration)
  const videoTime = useTransform(scrollYProgress, [0, 1], [0, duration], {
    clamp: true,
  });

  // Handle video metadata loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const dur = videoRef.current.duration || 10;
      setDuration(dur);
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Sync motion value to targetTimeRef
  useMotionValueEvent(videoTime, 'change', (latest) => {
    if (typeof latest === 'number' && !isNaN(latest) && isFinite(latest)) {
      targetTimeRef.current = latest;
    }
  });

  // High-performance RAF loop for bidirectional (forward & reverse) scrubbing
  useEffect(() => {
    let animId: number;

    const renderLoop = () => {
      const video = videoRef.current;
      if (video && !video.seeking) {
        const target = targetTimeRef.current;
        const current = video.currentTime;
        const delta = Math.abs(target - current);

        // Performant seek update
        if (delta > 0.03 && Math.abs(target - lastSetTimeRef.current) > 0.02) {
          lastSetTimeRef.current = target;
          const vid = video as HTMLVideoElement;
          if (typeof (vid as any).fastSeek === 'function') {
            (vid as any).fastSeek(target);
          } else {
            vid.currentTime = target;
          }
        }
      }
      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[calc(100vh-76px)] min-h-[560px] max-h-[860px] overflow-hidden flex flex-col justify-center border-b border-[#E8E2D7] bg-[#F7F3EE]"
    >
      {/* =========================================================================
          ONLY VIDEO LAYER: PURE, FULL-WIDTH, NO WHITE SHADOW OR OVERLAYS
          Plays forward on scroll down, reverses on scroll up via useScroll & useTransform
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/gemini_generated_video_a65363fa.mp4"
          playsInline
          muted
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>

      {/* =========================================================================
          EDITORIAL HERO CONTENT: 100% ABOVE THE FOLD
          Crisp typography with high legibility directly over the video
          ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center my-auto py-8"
      >
        {/* Eyebrow Label */}
        <span className="inline-block text-[11px] uppercase tracking-[0.25em] text-[#171512] font-semibold mb-3 sm:mb-4 bg-white/60 backdrop-blur-xs px-3.5 py-1 rounded-full border border-black/5 shadow-xs">
          • ARCHITECTURAL INTERIOR STUDIO & ATELIER
        </span>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#171512] leading-[1.08] drop-shadow-[0_2px_12px_rgba(255,255,255,0.7)]">
          Crafting Atmospheres
          <br />
          <span className="italic font-light text-[#2C2723]">
            Shaping Experiences
          </span>
        </h1>

        {/* Supporting Description */}
        <p className="mt-4 sm:mt-5 max-w-xl mx-auto text-[#2C2723] text-xs sm:text-sm md:text-base font-medium leading-relaxed drop-shadow-[0_1px_8px_rgba(255,255,255,0.8)]">
          Thoughtfully designed interiors where timeless materials, refined details, and everyday comfort come together beautifully.
        </p>

        {/* Centered CTA Button */}
        <div className="mt-7 sm:mt-9 flex items-center justify-center">
          <button
            onClick={onOpenConsultation}
            className="px-8 py-3.5 rounded-full bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest font-semibold hover:bg-[#2C2723] hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl"
          >
            Start Your Project
          </button>
        </div>
      </motion.div>
    </section>
  );
};
