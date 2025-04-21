import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import DialogBox from './DialogBox';
import { useScrollScene } from '../../hooks/useScrollScene';

interface VisualNovelSceneProps {
  background: string;
  dialog: string;
  character?: string;
  children?: React.ReactNode;
  index: number;
}

const VisualNovelScene: React.FC<VisualNovelSceneProps> = ({
  background,
  dialog,
  character = 'Fabian',
  children,
  index,
}) => {
  const { theme } = useTheme();
  const [sceneRef, isInView] = useScrollScene<HTMLDivElement>({
    threshold: 0.2,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.3
      }
    }
  };

  return (
    <motion.div
      ref={sceneRef}
      className="min-h-screen w-full relative flex items-center justify-center"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
            theme === 'night' ? 'filter brightness-50' : 'filter brightness-100'
          }`}
          style={{ backgroundImage: `url(${background})` }}
        ></div>
        <div
          className={`absolute inset-0 ${
            theme === 'night'
              ? 'bg-gradient-to-t from-cyber-black to-transparent'
              : 'bg-gradient-to-t from-white/70 to-transparent'
          }`}
        ></div>
      </div>

      {/* Grid overlay for cyberpunk effect */}
      {theme === 'night' && (
        <div className="absolute inset-0 z-10 bg-[url('/grid.svg')] opacity-10"></div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 z-20 flex flex-col items-center">
        <motion.div
          className="w-full flex flex-col justify-center items-center"
          variants={variants}
        >
          {/* Scene content (e.g., character, interactive elements) */}
          <motion.div
            className="mb-8 flex justify-center items-center"
            variants={variants}
          >
            {children}
          </motion.div>

          {/* Dialog box */}
          <motion.div
            className="w-full max-w-4xl mt-auto"
            variants={variants}
          >
            <DialogBox text={dialog} character={character} />
          </motion.div>
        </motion.div>
      </div>

      {/* Scene indicator */}
      <div className="absolute bottom-4 right-4 z-20">
        <div className={`font-cyber text-sm ${
          theme === 'day' ? 'text-cyber-black/70' : 'text-white/70'
        }`}>
          Scene {index}
        </div>
      </div>
    </motion.div>
  );
};

export default VisualNovelScene;