import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Original Reference Photo",
  afterLabel = "Hand-Drawn Charcoal Sketch",
  title = "From Photograph to Timeless Masterpiece"
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  return (
    <div className="w-full space-y-4">
      {title && (
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E293B]/10 text-[#1E293B] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Comparison</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#1C1917]">{title}</h3>
          <p className="text-xs text-[#78716C]">Drag the slider left or right to compare reference photo with artist sketch</p>
        </div>
      )}

      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[500px] rounded-3xl overflow-hidden shadow-2xl select-none cursor-ew-resize border border-[#E7E0D8]"
      >
        {/* After Image (Right / Bottom Layer: Final Sketch) */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold shadow-md">
          ✨ {afterLabel}
        </div>

        {/* Before Image (Left / Top Layer: Reference Photo clipped by sliderPosition) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          />
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-[#D97706]/90 backdrop-blur-md text-white text-xs font-semibold shadow-md">
            📷 {beforeLabel}
          </div>
        </div>

        {/* Divider Line & Handle */}
        <div
          className="absolute top-0 bottom-0 z-20 w-1 bg-white shadow-2xl"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-[#1C1917] shadow-xl border-2 border-[#D97706] flex items-center justify-center">
            <MoveHorizontal className="w-5 h-5 text-[#C85A32]" />
          </div>
        </div>
      </div>
    </div>
  );
};
