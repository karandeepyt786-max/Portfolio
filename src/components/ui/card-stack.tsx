import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Moon, Sun, RotateCcw, Shuffle, ChevronLeft, ChevronRight } from 'lucide-react';

export interface Card {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
}

export default function CardStack({ items }: { items?: Card[] }) {
  const defaultCards: Card[] = items || [
    {
      id: 1,
      src: "/screenshots/learn-hub.jpg",
      alt: "Learn Hub preview",
      title: "Learn Hub",
      description: "Responsive educational platform landing page."
    },
    {
      id: 2,
      src: "/screenshots/geeks.jpg",
      alt: "Geeks Platform preview",
      title: "Geeks Platform",
      description: "A responsive interface for tech enthusiasts."
    },
    {
      id: 3,
      src: "/screenshots/furniture.jpg",
      alt: "Furniture E-Commerce preview",
      title: "Furniture E-Commerce",
      description: "A stylish and elegant web storefront."
    },
    {
      id: 4,
      src: "/screenshots/numitech.jpg",
      alt: "Numitech Solutions preview",
      title: "Numitech Solutions",
      description: "Professional corporate website for IT solutions."
    }
  ];

  const [cards, setCards] = useState<Card[]>(defaultCards);
  const [isDark, setIsDark] = useState(true);
  const [dragDirection, setDragDirection] = useState<'up' | 'down' | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const dragY = useMotionValue(0);
  const rotateX = useTransform(dragY, [-200, 0, 200], [15, 0, -15]);

  // Configuration
  const offset = 10;
  const scaleStep = 0.06;
  const dimStep = 0.15;
  const stiff = 170;
  const damp = 26;
  const borderRadius = 12;
  const swipeThreshold = 50;

  const spring = {
    type: 'spring' as const,
    stiffness: stiff,
    damping: damp
  };

  const moveToEnd = () => {
    setCards(prev => [...prev.slice(1), prev[0]]);
    setCurrentIndex((prev) => (prev + 1) % defaultCards.length);
  };

  const moveToStart = () => {
    setCards(prev => [prev[prev.length - 1], ...prev.slice(0, -1)]);
    setCurrentIndex((prev) => (prev - 1 + defaultCards.length) % defaultCards.length);
  };

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  const resetCards = () => {
    setCards(defaultCards);
    setCurrentIndex(0);
  };

  const handleDragEnd = (_: any, info: any) => {
    const velocity = info.velocity.y;
    const yOffset = info.offset.y;

    if (Math.abs(yOffset) > swipeThreshold || Math.abs(velocity) > 500) {
      if (yOffset < 0 || velocity < 0) {
        setDragDirection('up');
        setTimeout(() => {
          moveToEnd();
          setDragDirection(null);
        }, 150);
      } else {
        setDragDirection('down');
        setTimeout(() => {
          moveToStart();
          setDragDirection(null);
        }, 150);
      }
    }
    dragY.set(0);
  };

  // Theme configuration
  const theme = {
    dark: {
      bg: 'bg-transparent',
      text: 'text-white',
      textSecondary: 'text-gray-400',
      toggleBg: 'bg-gray-800/80 hover:bg-gray-700/80',
      toggleBorder: 'border-gray-700',
      infoBox: 'bg-gray-900/90 border-gray-700',
      shadowCard: '0 25px 50px rgba(0, 0, 0, 0.7)',
      shadowCardBack: '0 15px 30px rgba(0, 0, 0, 0.4)',
      cardBorder: 'border-2 border-gray-700',
      controlBg: 'bg-gray-800/80 hover:bg-gray-700/80',
      cardInfoBg: 'bg-gradient-to-t from-black/80 to-transparent'
    },
    light: {
      bg: 'bg-transparent',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      toggleBg: 'bg-white/80 hover:bg-gray-100/80',
      toggleBorder: 'border-gray-300',
      infoBox: 'bg-white/90 border-gray-300',
      shadowCard: '0 25px 50px rgba(0, 0, 0, 0.15)',
      shadowCardBack: '0 15px 30px rgba(0, 0, 0, 0.08)',
      cardBorder: 'border-2 border-gray-300',
      controlBg: 'bg-white/80 hover:bg-gray-100/80',
      cardInfoBg: 'bg-gradient-to-t from-white/90 to-transparent'
    }
  };

  const currentTheme = isDark ? theme.dark : theme.light;

  return (
    <div className={`w-full min-h-[700px] lg:min-h-[900px] flex items-center justify-center ${currentTheme.bg} transition-all duration-500 relative overflow-hidden rounded-2xl`}>
      {/* Animated Grid Background */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-10 transition-opacity duration-300 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern 
            id="grid" 
            width="40" 
            height="40" 
            patternUnits="userSpaceOnUse"
          >
            <motion.path 
              d="M 40 0 L 0 0 0 40" 
              fill="none" 
              stroke={isDark ? '#ffffff' : '#000000'} 
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Top Control Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-auto">
        <div className="flex gap-2">
          <motion.button
            onClick={resetCards}
            className={`p-3 rounded-full ${currentTheme.controlBg} border ${currentTheme.toggleBorder} backdrop-blur-sm transition-colors duration-200`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Reset"
          >
            <RotateCcw className={`w-5 h-5 ${currentTheme.text}`} />
          </motion.button>
          <motion.button
            onClick={shuffleCards}
            className={`p-3 rounded-full ${currentTheme.controlBg} border ${currentTheme.toggleBorder} backdrop-blur-sm transition-colors duration-200`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Shuffle"
          >
            <Shuffle className={`w-5 h-5 ${currentTheme.text}`} />
          </motion.button>
        </div>

        <motion.button
          onClick={() => setIsDark(!isDark)}
          className={`p-3 rounded-full ${currentTheme.toggleBg} border ${currentTheme.toggleBorder} backdrop-blur-sm transition-colors duration-200`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isDark ? (
            <Sun className="w-6 h-6 text-yellow-400" />
          ) : (
            <Moon className="w-6 h-6 text-gray-700" />
          )}
        </motion.button>
      </div>

      {/* Navigation Buttons */}
      <motion.button
        onClick={moveToStart}
        className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 rounded-full ${currentTheme.controlBg} border ${currentTheme.toggleBorder} backdrop-blur-sm transition-colors duration-200 z-20 pointer-events-auto`}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft className={`w-6 h-6 ${currentTheme.text}`} />
      </motion.button>

      <motion.button
        onClick={moveToEnd}
        className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 rounded-full ${currentTheme.controlBg} border ${currentTheme.toggleBorder} backdrop-blur-sm transition-colors duration-200 z-20 pointer-events-auto`}
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight className={`w-6 h-6 ${currentTheme.text}`} />
      </motion.button>

      {/* Card Stack Container */}
      <div className="relative w-[300px] sm:w-[450px] md:w-[600px] lg:w-[800px] aspect-[16/10] md:aspect-video overflow-visible z-10">
        <ul className="relative w-full h-full m-0 p-0">
          <AnimatePresence>
            {cards.map(({ id, src, alt, title, description }, i) => {
              const isFront = i === 0;
              const brightness = Math.max(0.3, 1 - i * dimStep);
              const baseZ = cards.length - i;

              return (
                <motion.li
                  key={id}
                  className={`absolute w-full h-full list-none overflow-hidden ${currentTheme.cardBorder}`}
                  style={{
                    borderRadius: `${borderRadius}px`,
                    cursor: isFront ? 'grab' : 'auto',
                    touchAction: 'none',
                    boxShadow: isFront
                      ? currentTheme.shadowCard
                      : currentTheme.shadowCardBack,
                    rotateX: isFront ? rotateX : 0,
                    transformPerspective: 1000
                  }}
                  animate={{
                    top: `${i * -offset}%`,
                    scale: 1 - i * scaleStep,
                    filter: `brightness(${brightness})`,
                    zIndex: baseZ,
                    opacity: dragDirection && isFront ? 0 : 1
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    transition: { duration: 0.2 }
                  }}
                  transition={spring}
                  drag={isFront ? 'y' : false}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.7}
                  onDrag={(_, info) => {
                    if (isFront) {
                      dragY.set(info.offset.y);
                    }
                  }}
                  onDragEnd={handleDragEnd}
                  onTap={() => moveToEnd()}
                  whileDrag={
                    isFront
                      ? {
                          zIndex: cards.length + 1,
                          cursor: 'grabbing',
                          scale: 1.05,
                        }
                      : {}
                  }
                  onHoverStart={() => isFront && setShowInfo(true)}
                  onHoverEnd={() => setShowInfo(false)}
                >
                  <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover pointer-events-none select-none"
                    draggable={false}
                  />
                  
                  {/* Card Info Overlay */}
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 p-4 ${currentTheme.cardInfoBg}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: isFront && showInfo ? 1 : 0,
                      y: isFront && showInfo ? 0 : 20
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-white font-bold text-lg">{title}</h3>
                    <p className="text-white/80 text-sm">{description}</p>
                  </motion.div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>

      {/* Progress Indicator */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {defaultCards.map((_, i) => (
          <motion.div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex % defaultCards.length
                ? `${isDark ? 'bg-white' : 'bg-gray-900'} w-8`
                : `${isDark ? 'bg-gray-700' : 'bg-gray-300'} w-1.5`
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>

    </div>
  );
}
