'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function BeforeAfter({ beforeImg, afterImg, label }: { beforeImg: string, afterImg: string, label: string }) {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl group select-none">
      
      {/* Gambar AFTER (Background) */}
      <div className="absolute inset-0 w-full h-full">
        <Image src={afterImg} alt="After" fill className="object-cover" />
      </div>

      {/* Gambar BEFORE (Dipotong pake clip-path) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <Image src={beforeImg} alt="Before" fill className="object-cover" />
      </div>

      {/* Garis Tengah & Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-red-600 pointer-events-none shadow-[0_0_10px_rgba(220,38,38,0.8)]"
        style={{ left: `calc(${sliderPos}% - 2px)` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-red-600">
          <div className="flex gap-1">
            <div className="w-[2px] h-3 bg-zinc-400 rounded-full"></div>
            <div className="w-[2px] h-3 bg-zinc-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Input Range Transparan buat deteksi gesekan jari/mouse */}
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
      />

      {/* Label Badge */}
      <div className="absolute bottom-4 left-4 bg-black/70 px-4 py-1 rounded text-sm text-white backdrop-blur-sm border border-zinc-800 z-20 pointer-events-none">
        {label}
      </div>

      {/* Indikator Teks Before After */}
      <div className="absolute top-4 left-4 bg-black/50 px-2 py-1 rounded text-xs text-white z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">Before</div>
      <div className="absolute top-4 right-4 bg-black/50 px-2 py-1 rounded text-xs text-white z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">After</div>
    </div>
  );
}