import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useScrollScene } from '../../hooks/useScrollScene';
import { Terminal, SendHorizonal, Loader2 } from 'lucide-react';
import Typewriter from 'typewriter-effect';

const TerminalContact: React.FC = () => {
  const { theme } = useTheme();
  const [sectionRef, isInView] = useScrollScene<HTMLDivElement>({
    threshold: 0.2,
  });
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setCommandHistory(prev => [
        ...prev, 
        `> Sending message from ${formState.name}...`,
        `> Message content: "${formState.message}"`,
        `> Connection established...`,
        `> Message delivered successfully!`
      ]);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section
      id="terminal"
      ref={sectionRef}
      className={`min-h-screen py-20 px-4 transition-colors duration-500 ${
        theme === 'day' 
          ? 'bg-pastel-pink/30 text-cyber-black' 
          : 'bg-cyber-black text-white'
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`font-cyber text-4xl md:text-5xl font-bold mb-4 ${
            theme === 'day' ? 'text-cyber-purple' : 'text-cyber-pink'
          }`}>
            Terminal Access
          </h2>
          <p className="font-body text-lg max-w-2xl mx-auto">
            Establish a communication channel with me using this secure terminal interface.
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Terminal Interface */}
          <motion.div
            className={`rounded-lg overflow-hidden shadow-lg ${
              theme === 'day'
                ? 'bg-white border border-gray-200'
                : 'bg-cyber-black border border-cyber-purple/50'
            }`}
            variants={itemVariants}
          >
            {/* Terminal Header */}
            <div 
              className={`flex items-center justify-between px-4 py-2 ${
                theme === 'day'
                  ? 'bg-gray-100 border-b border-gray-200'
                  : 'bg-cyber-black/80 border-b border-cyber-purple/30'
              }`}
            >
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="font-terminal text-sm">
                Communication Terminal
              </div>
              <Terminal 
                size={16} 
                className={theme === 'day' ? 'text-cyber-purple' : 'text-cyber-pink'} 
              />
            </div>

            {/* Terminal Command History */}
            <div 
              className={`p-4 font-terminal text-sm h-40 overflow-y-auto ${
                theme === 'day' ? 'bg-gray-50' : 'bg-cyber-black'
              }`}
            >
              <div className={theme === 'day' ? 'text-cyber-black' : 'text-green-400'}>
                <Typewriter
                  options={{
                    strings: [
                      '> Initializing communication protocol...',
                      '> System online.',
                      '> Ready to receive message.',
                      '> Enter details below to establish connection:'
                    ],
                    autoStart: true,
                    delay: 40,
                    deleteSpeed: 9999999,
                  }}
                />
              </div>

              {commandHistory.map((cmd, i) => (
                <div 
                  key={i} 
                  className={theme === 'day' ? 'text-cyber-purple' : 'text-green-400'}
                >
                  {cmd}
                </div>
              ))}

              {isSubmitted && (
                <div className={theme === 'day' ? 'text-green-600' : 'text-green-400'}>
                  <Typewriter
                    options={{
                      strings: ['> Thank you for your message! I will get back to you soon.'],
                      autoStart: true,
                      delay: 30,
                      deleteSpeed: 9999999,
                    }}
                  />
                </div>
              )}
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <motion.div className="space-y-4" variants={containerVariants}>
                <motion.div variants={itemVariants}>
                  <label 
                    htmlFor="name" 
                    className="block mb-1 font-terminal text-sm"
                  >
                    Name:
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md font-terminal text-sm focus:outline-none ${
                      theme === 'day'
                        ? 'bg-gray-50 border border-gray-200 focus:border-cyber-purple'
                        : 'bg-cyber-black/60 border border-cyber-purple/50 text-white focus:border-cyber-pink'
                    }`}
                    placeholder="Enter your name"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label 
                    htmlFor="email" 
                    className="block mb-1 font-terminal text-sm"
                  >
                    Email:
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md font-terminal text-sm focus:outline-none ${
                      theme === 'day'
                        ? 'bg-gray-50 border border-gray-200 focus:border-cyber-purple'
                        : 'bg-cyber-black/60 border border-cyber-purple/50 text-white focus:border-cyber-pink'
                    }`}
                    placeholder="Enter your email"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label 
                    htmlFor="message" 
                    className="block mb-1 font-terminal text-sm"
                  >
                    Message:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md font-terminal text-sm focus:outline-none ${
                      theme === 'day'
                        ? 'bg-gray-50 border border-gray-200 focus:border-cyber-purple'
                        : 'bg-cyber-black/60 border border-cyber-purple/50 text-white focus:border-cyber-pink'
                    }`}
                    placeholder="Type your message here..."
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center px-6 py-3 rounded-md font-cyber text-white transition-all 
                      ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}
                      ${theme === 'day' 
                        ? 'bg-cyber-purple hover:bg-cyber-purple/90' 
                        : 'bg-cyber-pink hover:bg-cyber-pink/90'
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="mr-2 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <SendHorizonal size={18} className="mr-2" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </motion.div>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TerminalContact;