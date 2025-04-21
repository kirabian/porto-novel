import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Menu } from 'lucide-react';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <motion.header
      className={`fixed w-full z-50 py-4 px-6 md:px-12 transition-colors duration-500 ${
        theme === 'day' 
          ? 'bg-pastel-blue/80 text-cyber-black backdrop-blur-sm'
          : 'bg-cyber-black/80 text-white backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="flex justify-between items-center">
        <motion.div 
          className="font-cyber font-bold text-xl md:text-2xl"
          whileHover={{ scale: 1.05 }}
        >
          <span className={theme === 'night' ? 'text-cyber-pink' : 'text-cyber-purple'}>{'<'}</span>
          Fabian
          <span className={theme === 'night' ? 'text-cyber-teal' : 'text-cyber-blue'}>{'/>'}</span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks theme={theme} />
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="focus:outline-none"
          >
            <Menu className={`${theme === 'night' ? 'text-white' : 'text-cyber-black'}`} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div 
          className={`md:hidden mt-4 py-4 rounded-lg ${
            theme === 'day' ? 'bg-white' : 'bg-cyber-black border border-cyber-purple'
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col items-center space-y-4">
            <NavLinks theme={theme} />
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

const NavLinks: React.FC<{ theme: 'day' | 'night' }> = ({ theme }) => {
  const links = ['Home', 'Skills', 'Quests', 'Journey', 'Terminal'];
  
  return (
    <>
      {links.map((link) => (
        <motion.a
          key={link}
          href={`#${link.toLowerCase()}`}
          className={`font-cyber text-lg ${
            theme === 'day' 
              ? 'hover:text-cyber-purple' 
              : 'hover:text-cyber-pink'
          } transition-colors duration-300`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {link}
        </motion.a>
      ))}
    </>
  );
};

const ThemeToggle: React.FC<{ theme: 'day' | 'night'; toggleTheme: () => void }> = ({ 
  theme, 
  toggleTheme 
}) => {
  return (
    <motion.button
      onClick={toggleTheme}
      className={`p-2 rounded-full ${
        theme === 'day' 
          ? 'bg-pastel-purple text-cyber-purple' 
          : 'bg-cyber-purple/20 text-cyber-pink'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {theme === 'day' ? <Moon size={20} /> : <Sun size={20} />}
    </motion.button>
  );
};

export default Header;