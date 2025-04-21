import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Github, Linkedin, Mail, Instagram, Code, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  
  const socialLinks = [
    { icon: <Github size={18} />, href: 'https://github.com/kirabian', label: 'GitHub' },
    { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn' }, // Belum diberikan username
    { icon: <Instagram size={18} />, href: 'https://instagram.com/mcisreal_', label: 'Instagram' },
    { icon: <Mail size={18} />, href: 'mailto:fabiansyahalghiffarireal@gmail.com', label: 'Email' },
  ];
  

  return (
    <footer
      className={`py-10 transition-colors duration-500 ${
        theme === 'day' 
          ? 'bg-pastel-blue text-cyber-black' 
          : 'bg-cyber-black text-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="mb-6 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="font-cyber font-bold text-xl mb-2">
              <span className={theme === 'night' ? 'text-cyber-pink' : 'text-cyber-purple'}>{'<'}</span>
              Fabian
              <span className={theme === 'night' ? 'text-cyber-teal' : 'text-cyber-blue'}>{'/>'}</span>
            </div>
            <p className="font-body text-sm max-w-md">
              Siswa SMK Setia Gama jurusan Rekayasa Perangkat Lunak, 
              menjelajahi dunia digital dengan semangat dan kreativitas.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center md:items-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  className={`p-2 rounded-full ${
                    theme === 'day' 
                      ? 'bg-white hover:bg-cyber-purple hover:text-white' 
                      : 'bg-cyber-black/80 border border-cyber-purple/50 hover:bg-cyber-pink hover:text-cyber-black hover:border-cyber-pink'
                  } transition-colors duration-300`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
            
            <p className="font-terminal text-xs flex items-center">
              <span>Made with </span>
              <Heart size={12} className={`mx-1 ${theme === 'day' ? 'text-red-500' : 'text-cyber-pink'}`} />
              <span> and </span>
              <Code size={12} className={`mx-1 ${theme === 'day' ? 'text-cyber-purple' : 'text-cyber-teal'}`} />
              <span> by Fabian Syah Al Ghiffari</span>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;