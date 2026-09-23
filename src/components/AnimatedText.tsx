import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text?: string;
  className?: string;
}

const Character: React.FC<{
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0">{char === ' ' ? '\u00A0' : char}</span>
      <motion.span
        style={{ opacity }}
        className="absolute left-0 top-0 select-none pointer-events-none"
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text = "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!",
  className = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = text.split('');
  const totalChars = characters.length;

  return (
    <p
      ref={containerRef}
      className={`text-[#0F172A] font-medium text-center leading-relaxed max-w-[560px] select-none ${className}`}
      style={{
        fontSize: 'clamp(0.95rem, 1.4vw, 1.25rem)',
      }}
    >
      {characters.map((char, index) => {
        const start = index / totalChars;
        const end = Math.min(1, start + 0.15);
        return (
          <Character
            key={index}
            char={char}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
};
