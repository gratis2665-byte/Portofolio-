import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ReadingProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      id="reading-progress-container"
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        id="reading-progress-indicator"
        className="h-full origin-left bg-[#0284C7]"
        style={{ scaleX }}
      />
    </div>
  );
};
