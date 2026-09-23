import React, { useState, useEffect, useRef } from 'react';
import { getCustomPhotoUrl, subscribePhotoUpdates } from '../utils/photoStorage';

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  showSpinner?: boolean;
  fallbackSrc?: string;
}

// Complete mapped fallback photography for each photo ID
const IMAGE_FALLBACK_MAP: Record<string, string> = {
  '/images/IMG_1904.jpeg': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80', // In-house training U-Shape
  '/images/IMG_1903.jpeg': 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80', // Maxwell Leadership
  '/images/IMG_1902.jpeg': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80', // Tim Think Positively
  '/images/IMG_1901.jpeg': 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80', // VIP Fleet Training
  '/images/IMG_1900.jpeg': 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?auto=format&fit=crop&w=1200&q=80', // Presentasi Gaya Kepribadian
  '/images/IMG_1899.jpeg': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80', // Kelulusan batch Celebrate
  '/images/IMG_1897.jpeg': 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80', // Outdoor gathering polo marun
  '/images/IMG_1896.jpeg': 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80', // Ruang ASB
  '/images/IMG_1895.jpeg': 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80', // Workshop U-Shape
  '/images/IMG_1894.jpeg': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80', // Sesi kelulusan
  '/images/IMG_1893.jpeg': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80', // Sesi tim
  '/images/IMG_1892.jpeg': 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80', // Presentasi Whiteboard
  '/images/IMG_1891.jpeg': 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=1200&q=80', // Diskusi perangkat digital
  '/images/IMG_1890.jpeg': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80', // Seminar auditorium
  '/images/IMG_1889.jpeg': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80', // Flipchart mapping
  '/images/IMG_1888.jpeg': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80', // Gestur panggung trainer
  '/images/IMG_1886.jpeg': 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80', // Circle forum
  '/images/IMG_1885.jpeg': 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80', // Sales workshop
  '/images/IMG_1884.jpeg': 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80', // Keynote panggung akbar
  '/images/IMG_1883.jpeg': 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80', // Maxwell leadership
  '/images/IMG_1882.jpeg': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80', // Tim praktikum
  '/images/IMG_1881.jpeg': 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80', // Gathering massal
  '/images/IMG_1880.jpeg': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80', // Energizer studio
};

const DEFAULT_PORTFOLIO_IMAGE =
  'https://images.unsplash.com/photo-1544531585-9847b68c8c86?auto=format&fit=crop&w=1200&q=80';

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  containerClassName = '',
  className = '',
  alt,
  src,
  fallbackSrc,
  showSpinner = false,
  ...props
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const resolveTargetSrc = () => {
    if (!src) return fallbackSrc || DEFAULT_PORTFOLIO_IMAGE;
    const custom = getCustomPhotoUrl(src);
    if (custom) return custom;
    if (IMAGE_FALLBACK_MAP[src]) {
      return IMAGE_FALLBACK_MAP[src];
    }
    if (src.startsWith('/images/')) {
      return fallbackSrc || DEFAULT_PORTFOLIO_IMAGE;
    }
    return src;
  };

  const [activeSrc, setActiveSrc] = useState<string>(resolveTargetSrc);

  useEffect(() => {
    const updateSrc = () => {
      const resolved = resolveTargetSrc();
      setActiveSrc(resolved);
      setHasError(false);
    };

    updateSrc();
    return subscribePhotoUpdates(updateSrc);
  }, [src, fallbackSrc]);

  // Check if image is already loaded/cached in browser synchronously
  useEffect(() => {
    if (imgRef.current) {
      if (imgRef.current.complete && imgRef.current.naturalWidth > 0) {
        setIsLoaded(true);
      }
    }
  }, [activeSrc]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const mapped = src && IMAGE_FALLBACK_MAP[src];
    const targetFallback = fallbackSrc || mapped || DEFAULT_PORTFOLIO_IMAGE;
    if (activeSrc !== targetFallback) {
      setActiveSrc(targetFallback);
      setHasError(false);
      setIsLoaded(false);
    } else {
      setHasError(true);
      setIsLoaded(true);
    }
    props.onError?.(e);
  };

  return (
    <div className={`relative overflow-hidden w-full h-full bg-slate-100 ${containerClassName}`}>
      {/* Light Clean Skeleton Placeholder while image is loading - NO GRADIENTS */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-slate-200 flex items-center justify-center z-10">
          {showSpinner && (
            <div className="w-6 h-6 rounded-full border-2 border-slate-300 border-t-[#0284C7] animate-spin" />
          )}
        </div>
      )}

      {/* Actual Image */}
      {activeSrc && (
        <img
          ref={imgRef}
          src={activeSrc}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};
