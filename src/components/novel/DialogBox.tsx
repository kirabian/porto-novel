import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { ChevronDown } from 'lucide-react';

interface DialogBoxProps {
  text: string;
  character?: string;
  onContinue?: () => void;
  isTyping?: boolean;
}

const DialogBox: React.FC<DialogBoxProps> = ({ 
  text, 
  character = 'Fabian', 
  onContinue,
  isTyping = false
}) => {
  const { theme } = useTheme();

  return (
    <motion.div
      className={`max-w-3xl w-full mx-auto px-4 py-3 rounded-lg ${
        theme === 'day'
          ? 'bg-white/90 text-cyber-black border border-pastel-purple'
          : 'bg-cyber-black/90 text-white border border-cyber-purple'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start">
        {/* Character name */}
        <div 
          className={`font-cyber font-bold text-lg mr-4 px-3 py-1 rounded ${
            theme === 'day'
              ? 'bg-pastel-purple text-cyber-purple'
              : 'bg-cyber-purple text-white'
          }`}
        >
          {character}
        </div>

        {/* Dialog text */}
        <div className="flex-1 font-body text-lg pt-1">
          {text}
          {isTyping && <span className="animate-pulse">|</span>}
        </div>
      </div>

      {/* Continue indicator */}
      {onContinue && (
        <motion.div 
          className="flex justify-end mt-2"
          animate={{ 
            y: [0, 5, 0], 
            opacity: [0.7, 1, 0.7] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5
          }}
        >
          <button 
            onClick={onContinue}
            className={`flex items-center space-x-1 text-sm ${
              theme === 'day' ? 'text-cyber-blue' : 'text-cyber-pink'
            }`}
          >
            <span>Continue</span>
            <ChevronDown size={14} />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DialogBox;