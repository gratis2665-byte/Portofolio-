import React, { useEffect, useRef, useState } from 'react';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface MarqueeCardData {
  title: string;
  category: string;
  imageUrl: string;
  fallbackUrl?: string;
}

const TRAINING_ROW1: MarqueeCardData[] = [
  {
    title: 'Workshop Public Speaking',
    category: 'Praktik Panggung & Olah Vokal',
    imageUrl: '/images/IMG_1895.jpeg',
    fallbackUrl: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Manajemen Tim Efektif',
    category: 'Pelatihan ASB Corporate',
    imageUrl: '/images/IMG_1896.jpeg',
    fallbackUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Dokumentasi Akbar Outdoor',
    category: 'Sinergi & Gathering Peserta',
    imageUrl: '/images/IMG_1897.jpeg',
    fallbackUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Kelulusan Batch Komunikasi',
    category: 'Simulasi Akhir & Apresiasi',
    imageUrl: '/images/IMG_1894.jpeg',
    fallbackUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Konsolidasi & Budaya Positif',
    category: 'Kolaborasi & Diskusi Ruang Kerja',
    imageUrl: '/images/IMG_1893.jpeg',
    fallbackUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Evaluasi & Presentasi Strategis',
    category: 'Meeting Dewan & Whiteboard',
    imageUrl: '/images/IMG_1892.jpeg',
    fallbackUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Praktikum Diskusi Digital',
    category: 'Studi Kasus & Tablet Interaktif',
    imageUrl: '/images/IMG_1891.jpeg',
    fallbackUrl: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Seminar Binar Academy',
    category: 'Komunikasi Manusiawi Digital',
    imageUrl: '/images/IMG_1890.jpeg',
    fallbackUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
  },
];

const TRAINING_ROW2: MarqueeCardData[] = [
  {
    title: 'Customer Journey Mapping',
    category: 'Fasilitasi Flipchart Visual',
    imageUrl: '/images/IMG_1889.jpeg',
    fallbackUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Teknik Gestur & Non-Verbal',
    category: 'Bahasa Tubuh & Olah Vokal',
    imageUrl: '/images/IMG_1888.jpeg',
    fallbackUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Circle Forum Berbagi Cerita',
    category: 'Active Listening & Refleksi',
    imageUrl: '/images/IMG_1886.jpeg',
    fallbackUrl: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Workshop Sales Persuasif',
    category: 'Komunikasi Menjual Bergaransi',
    imageUrl: '/images/IMG_1885.jpeg',
    fallbackUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Keynote Panggung Akbar',
    category: 'Grand Auditorium Speech',
    imageUrl: '/images/IMG_1884.jpeg',
    fallbackUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Maxwell Leadership Network',
    category: 'Kepemimpinan Berkarakter',
    imageUrl: '/images/IMG_1883.jpeg',
    fallbackUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Temu Karyawan & Gathering',
    category: 'Sinergi Lintas Divisi',
    imageUrl: '/images/IMG_1881.jpeg',
    fallbackUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Ice Breaking & Team Energizer',
    category: 'Pencair Suasana Ramah',
    imageUrl: '/images/IMG_1880.jpeg',
    fallbackUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
  },
];

// Tripled arrays for smooth continuous scrolling
const TRIPLED_ROW1 = [...TRAINING_ROW1, ...TRAINING_ROW1, ...TRAINING_ROW1];
const TRIPLED_ROW2 = [...TRAINING_ROW2, ...TRAINING_ROW2, ...TRAINING_ROW2];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = window.scrollY + rect.top;
            const currentOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.25;
            setOffset(currentOffset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const row1Transform = `translateX(${offset - 150}px)`;
  const row2Transform = `translateX(${-(offset - 150)}px)`;

  return (
    <section
      ref={sectionRef}
      id="marquee"
      className="w-full bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-36 pb-12 overflow-hidden select-none border-t border-[#181818]/60"
    >
      <div className="flex flex-col gap-4">
        {/* Row 1 - Moves RIGHT on scroll */}
        <div
          className="flex gap-4 whitespace-nowrap"
          style={{
            transform: row1Transform,
            willChange: 'transform',
          }}
        >
          {TRIPLED_ROW1.map((item, index) => (
            <div
              key={`row1-${index}`}
              className="group relative w-[280px] h-[180px] sm:w-[350px] sm:h-[220px] md:w-[400px] md:h-[250px] shrink-0 rounded-2xl overflow-hidden bg-[#141414] border border-[#242424] transition-transform duration-300 hover:scale-[1.02]"
            >
              <ImageWithSkeleton
                src={item.imageUrl}
                fallbackSrc={item.fallbackUrl}
                alt={item.title}
                className="select-none filter contrast-[1.03] transition-transform duration-500 group-hover:scale-105"
                draggable={false}
              />
              {/* Elegant dark vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

              {/* Training topic badge & title */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 flex flex-col gap-1 pointer-events-none">
                <span className="inline-block self-start px-2 py-0.5 rounded-full bg-[#181818]/90 backdrop-blur-md border border-[#333333] text-[10px] font-mono uppercase tracking-wider text-[#D7E2EA]/80">
                  {item.category}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white tracking-wide truncate drop-shadow-md">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 - Moves LEFT on scroll */}
        <div
          className="flex gap-4 whitespace-nowrap"
          style={{
            transform: row2Transform,
            willChange: 'transform',
          }}
        >
          {TRIPLED_ROW2.map((item, index) => (
            <div
              key={`row2-${index}`}
              className="group relative w-[280px] h-[180px] sm:w-[350px] sm:h-[220px] md:w-[400px] md:h-[250px] shrink-0 rounded-2xl overflow-hidden bg-[#141414] border border-[#242424] transition-transform duration-300 hover:scale-[1.02]"
            >
              <ImageWithSkeleton
                src={item.imageUrl}
                fallbackSrc={item.fallbackUrl}
                alt={item.title}
                className="select-none filter contrast-[1.03] transition-transform duration-500 group-hover:scale-105"
                draggable={false}
              />
              {/* Elegant dark vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

              {/* Training topic badge & title */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 flex flex-col gap-1 pointer-events-none">
                <span className="inline-block self-start px-2 py-0.5 rounded-full bg-[#181818]/90 backdrop-blur-md border border-[#333333] text-[10px] font-mono uppercase tracking-wider text-[#D7E2EA]/80">
                  {item.category}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white tracking-wide truncate drop-shadow-md">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
