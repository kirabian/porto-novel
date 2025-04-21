import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { useTheme } from '../../context/ThemeContext';
import { ChevronDown } from 'lucide-react';

const IntroScene: React.FC = () => {
  const { theme } = useTheme();
  const [showArrow, setShowArrow] = useState(false);

  // Show the scroll indicator after typing is complete
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowArrow(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      id="home"
      className={`h-screen w-full flex flex-col justify-center items-center relative overflow-hidden ${
        theme === 'day'
          ? 'bg-pastel-blue text-cyber-black'
          : 'bg-cyber-black text-white'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {theme === 'day' ? (
          <div className="absolute inset-0 bg-pastel-blue opacity-80"></div>
        ) : (
          <div className="absolute inset-0 bg-cyber-black opacity-80"></div>
        )}
        <div
          className={`absolute inset-0 bg-anime-city bg-cover bg-center ${
            theme === 'night' ? 'filter brightness-50' : 'filter brightness-100'
          }`}
        ></div>
        {theme === 'night' && (
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-purple/20 to-transparent"></div>
        )}
      </div>

      {/* Grid overlay for cyberpunk effect */}
      {theme === 'night' && (
        <div className="absolute inset-0 z-10 bg-[url('/grid.svg')] opacity-10"></div>
      )}

      {/* Content */}
      <motion.div
        className="z-20 text-center px-4 max-w-4xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.div
          className={`inline-block mb-6 px-4 py-1 rounded-full ${
            theme === 'day'
              ? 'bg-pastel-purple text-cyber-purple'
              : 'bg-cyber-purple/30 text-cyber-pink border border-cyber-pink/50'
          }`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="font-cyber">Welcome to my digital world</span>
        </motion.div>

        <div
          className={`font-cyber text-3xl sm:text-4xl md:text-5xl font-bold mb-8 leading-tight ${
            theme === 'night' ? 'text-white' : 'text-cyber-black'
          }`}
        >
          <Typewriter
            options={{
              strings: ['Dalam dunia di mana kode adalah sihir... muncul seorang anak muda bernama Fabian Syah Al Ghiffari.'],
              autoStart: true,
              delay: 50,
              deleteSpeed: 9999999,
            }}
          />
        </div>

        <motion.div
          className={`font-body text-lg sm:text-xl max-w-2xl mx-auto ${
            theme === 'night' ? 'text-gray-300' : 'text-gray-700'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
        >
          <p>Seorang siswa SMK Setia Gama jurusan Rekayasa Perangkat Lunak yang siap menjelajahi dunia digital.</p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      {showArrow && (
        <motion.div
          className="absolute bottom-10 z-20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.5
          }}
        >
          <ChevronDown 
            size={32} 
            className={`${theme === 'night' ? 'text-cyber-pink' : 'text-cyber-purple'}`} 
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default IntroScene;