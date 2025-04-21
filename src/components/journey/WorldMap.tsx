import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useScrollScene } from '../../hooks/useScrollScene';
import { Map, Flag, Calendar, BookOpen } from 'lucide-react';

interface JourneyEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  position: { x: number; y: number };
}

const journeyEvents: JourneyEvent[] = [
  {
    id: 'j1',
    year: '2021',
    title: 'HTML Valley',
    description: 'The beginning of the journey, mastering HTML fundamentals and structure',
    icon: <BookOpen size={20} />,
    position: { x: 20, y: 20 },
  },
  {
    id: 'j2',
    year: '2022',
    title: 'CSS Mountains',
    description: 'Climbing the styling peaks, learned responsive design and animations',
    icon: <BookOpen size={20} />,
    position: { x: 40, y: 30 },
  },
  {
    id: 'j3',
    year: '2022',
    title: 'JavaScript Forest',
    description: 'Navigating through the dense forest of logic and interactivity',
    icon: <BookOpen size={20} />,
    position: { x: 65, y: 25 },
  },
  {
    id: 'j4',
    year: '2023',
    title: 'PHP Rivers',
    description: 'Flowing with server-side programming and dynamic content',
    icon: <BookOpen size={20} />,
    position: { x: 50, y: 50 },
  },
  {
    id: 'j5',
    year: '2023',
    title: 'Bootstrap Village',
    description: 'Discovered the component-based approach to frontend development',
    icon: <BookOpen size={20} />,
    position: { x: 35, y: 60 },
  },
  {
    id: 'j6',
    year: '2024',
    title: 'Laravel Fortress',
    description: 'Building structured applications with the power of Laravel',
    icon: <BookOpen size={20} />,
    position: { x: 70, y: 70 },
  },
];

const WorldMap: React.FC = () => {
  const { theme } = useTheme();
  const [sectionRef, isInView] = useScrollScene<HTMLDivElement>({
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section
      id="journey"
      ref={sectionRef}
      className={`min-h-screen py-20 px-4 transition-colors duration-500 ${
        theme === 'day' 
          ? 'bg-pastel-blue/50 text-cyber-black' 
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
            World Map
          </h2>
          <p className="font-body text-lg max-w-2xl mx-auto">
            Explore the digital territories conquered in my learning journey. Each location represents a milestone.
          </p>
        </motion.div>

        {/* World Map Visualization */}
        <motion.div
          className={`relative h-[600px] mx-auto rounded-lg p-4 overflow-hidden ${
            theme === 'day' 
              ? 'bg-white/80 shadow-lg' 
              : 'bg-cyber-black/80 border border-cyber-purple/30'
          }`}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Map Background */}
          <div 
            className={`absolute inset-0 bg-cover bg-center opacity-20 ${
              theme === 'day' ? 'brightness-90' : 'brightness-50'
            }`}
            style={{ backgroundImage: "url('https://images.pexels.com/photos/2859169/pexels-photo-2859169.jpeg')" }}
          ></div>

          {/* Grid overlay */}
          <div className={`absolute inset-0 ${
            theme === 'night' ? 'bg-[url("/grid.svg")] opacity-10' : ''
          }`}></div>

          {/* Path Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <motion.path
              d={`M ${journeyEvents[0].position.x}% ${journeyEvents[0].position.y}%
                  L ${journeyEvents[1].position.x}% ${journeyEvents[1].position.y}%
                  L ${journeyEvents[2].position.x}% ${journeyEvents[2].position.y}%
                  L ${journeyEvents[3].position.x}% ${journeyEvents[3].position.y}%
                  L ${journeyEvents[4].position.x}% ${journeyEvents[4].position.y}%
                  L ${journeyEvents[5].position.x}% ${journeyEvents[5].position.y}%`}
              stroke={theme === 'day' ? '#9333ea' : '#ec4899'}
              strokeWidth="3"
              strokeDasharray="8,8"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, delay: 0.2 }}
            />
          </svg>

          {/* Landmarks */}
          {journeyEvents.map((event) => (
            <motion.div
              key={event.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ 
                left: `${event.position.x}%`, 
                top: `${event.position.y}%`,
              }}
              variants={itemVariants}
              whileHover={{ scale: 1.1, zIndex: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Landmark event={event} />
            </motion.div>
          ))}

          {/* Map Compass */}
          <div className="absolute top-4 right-4">
            <motion.div
              className={`p-2 rounded-full ${
                theme === 'day' 
                  ? 'bg-white/70 text-cyber-purple' 
                  : 'bg-cyber-black/70 text-cyber-pink border border-cyber-pink/50'
              }`}
              initial={{ rotate: -20, opacity: 0 }}
              animate={isInView ? { rotate: 0, opacity: 1 } : { rotate: -20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Map size={24} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Landmark: React.FC<{ event: JourneyEvent }> = ({ event }) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Landmark Point */}
      <motion.div
        className={`flex items-center justify-center rounded-full p-2 ${
          theme === 'day'
            ? 'bg-white shadow-md border border-cyber-purple'
            : 'bg-cyber-black border-2 border-cyber-pink shadow-[0_0_15px_rgba(236,72,153,0.5)]'
        }`}
        whileHover={{ scale: 1.2 }}
        animate={{ 
          y: [0, 5, 0],
          transition: { 
            repeat: Infinity, 
            duration: 2,
            repeatType: 'reverse' 
          } 
        }}
      >
        <Flag 
          size={20} 
          className={theme === 'day' ? 'text-cyber-purple' : 'text-cyber-pink'} 
        />
      </motion.div>

      {/* Year Label */}
      <div 
        className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-cyber font-bold px-2 py-0.5 rounded-full ${
          theme === 'day' 
            ? 'bg-white text-cyber-purple' 
            : 'bg-cyber-black text-cyber-pink border border-cyber-pink/50'
        }`}
      >
        {event.year}
      </div>

      {/* Tooltip */}
      {isHovered && (
        <div
          className={`absolute z-10 w-48 p-3 rounded-lg shadow-lg -translate-x-1/2 left-1/2 -translate-y-full top-0 mt-2 ${
            theme === 'day'
              ? 'bg-white border border-pastel-purple text-cyber-black'
              : 'bg-cyber-black border border-cyber-pink text-white'
          }`}
        >
          <div className={`font-cyber font-bold mb-1 ${
            theme === 'day' ? 'text-cyber-purple' : 'text-cyber-pink'
          }`}>
            {event.title}
          </div>
          <div className="text-sm mb-2">{event.description}</div>
          <div className="flex items-center text-xs">
            <Calendar size={12} className="mr-1" />
            <span>{event.year}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorldMap;