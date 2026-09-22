import React from 'react';
import { motion, Variants } from 'framer-motion';

interface SectionRevealProps {
  children: React.ReactNode;
  id?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  amount?: number;
}

export const sectionRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
  },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: customDelay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  id,
  delay = 0,
  duration = 0.8,
  yOffset = 36,
  className = 'w-full',
  amount = 0.08,
}) => {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`transform-gpu will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};
