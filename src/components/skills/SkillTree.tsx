import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useScrollScene } from '../../hooks/useScrollScene';
import { Code2, Database, Layout, Palette, Server, Globe, Star } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  level: number;
  description: string;
  xp: number;
  icon: React.ReactNode;
  dependencies?: string[];
  position: { x: number; y: number };
}

const skills: Skill[] = [
  {
    id: 'html',
    name: 'HTML5',
    level: 5,
    description: 'Struktur website dengan semantik yang baik',
    xp: 95,
    icon: <Layout size={24} />,
    position: { x: 20, y: 20 },
  },
  {
    id: 'css',
    name: 'CSS3',
    level: 4,
    description: 'Styling dan animasi responsif',
    xp: 85,
    icon: <Palette size={24} />,
    dependencies: ['html'],
    position: { x: 40, y: 40 },
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    level: 4,
    description: 'Framework CSS untuk tampilan responsive',
    xp: 80,
    icon: <Globe size={24} />,
    dependencies: ['css'],
    position: { x: 60, y: 40 },
  },
  {
    id: 'js',
    name: 'JavaScript',
    level: 3,
    description: 'Logika dan interaktivitas website',
    xp: 75,
    icon: <Code2 size={24} />,
    dependencies: ['html', 'css'],
    position: { x: 50, y: 60 },
  },
  {
    id: 'php',
    name: 'PHP',
    level: 4,
    description: 'Backend development dan server-side',
    xp: 85,
    icon: <Server size={24} />,
    position: { x: 30, y: 70 },
  },
  {
    id: 'laravel',
    name: 'Laravel',
    level: 3,
    description: 'Framework PHP untuk pengembangan web',
    xp: 70,
    icon: <Database size={24} />,
    dependencies: ['php'],
    position: { x: 50, y: 80 },
  },
];

const SkillTree: React.FC = () => {
  const { theme } = useTheme();
  const [sectionRef, isInView] = useScrollScene<HTMLDivElement>({
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`min-h-screen py-20 px-4 transition-colors duration-500 ${
        theme === 'day' 
          ? 'bg-pastel-blue text-cyber-black' 
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
            Skill Tree
          </h2>
          <p className="font-body text-lg max-w-2xl mx-auto">
            Unlock and level up your skills in this digital journey. Each skill connects and builds upon others.
          </p>
        </motion.div>

        {/* Skill tree visualization */}
        <motion.div
          className={`relative h-[600px] mx-auto rounded-lg p-8 overflow-hidden ${
            theme === 'day' 
              ? 'bg-white/80 shadow-lg' 
              : 'bg-cyber-black/80 border border-cyber-purple/30'
          }`}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={variants}
        >
          {/* Background grid */}
          <div className={`absolute inset-0 ${
            theme === 'night' ? 'bg-[url("/grid.svg")] opacity-10' : ''
          }`}></div>

          {/* Skill connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {skills.map(skill => 
              skill.dependencies?.map(depId => {
                const depSkill = skills.find(s => s.id === depId);
                if (!depSkill) return null;
                
                const x1 = `${depSkill.position.x}%`;
                const y1 = `${depSkill.position.y}%`;
                const x2 = `${skill.position.x}%`;
                const y2 = `${skill.position.y}%`;
                
                return (
                  <motion.line
                    key={`${skill.id}-${depId}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={theme === 'day' ? '#9333ea' : '#ec4899'}
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                  />
                );
              })
            )}
          </svg>

          {/* Skill nodes */}
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ 
                left: `${skill.position.x}%`, 
                top: `${skill.position.y}%`,
              }}
              variants={skillVariants}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <SkillNode skill={skill} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const SkillNode: React.FC<{ skill: Skill }> = ({ skill }) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = React.useState(false);

  // Show stars based on level
  const stars = Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={14}
      className={`${i < skill.level ? 'fill-current' : 'stroke-current opacity-50'} ${
        theme === 'day' ? 'text-cyber-purple' : 'text-cyber-pink'
      }`}
    />
  ));

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Skill Node */}
      <div
        className={`flex items-center justify-center rounded-full p-3 ${
          theme === 'day'
            ? 'bg-white shadow-md border border-pastel-purple'
            : 'bg-cyber-black border-2 border-cyber-purple shadow-[0_0_10px_rgba(147,51,234,0.5)]'
        }`}
      >
        <div className={`${
          theme === 'day' ? 'text-cyber-purple' : 'text-cyber-pink'
        }`}>
          {skill.icon}
        </div>
      </div>

      {/* XP Bar */}
      <div 
        className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-16 rounded-full ${
          theme === 'day' ? 'bg-gray-200' : 'bg-gray-700'
        }`}
      >
        <div 
          className={`h-full rounded-full ${
            theme === 'day' ? 'bg-cyber-blue' : 'bg-cyber-teal'
          }`}
          style={{ width: `${skill.xp}%` }}
        ></div>
      </div>

      {/* Tooltip */}
      {isHovered && (
        <div
          className={`absolute z-10 w-48 p-3 rounded-lg shadow-lg -translate-x-1/2 left-1/2 -translate-y-full top-0 mt-2 ${
            theme === 'day'
              ? 'bg-white border border-pastel-purple text-cyber-black'
              : 'bg-cyber-black border border-cyber-purple text-white'
          }`}
        >
          <div className="font-cyber font-bold text-base mb-1">{skill.name}</div>
          <div className="flex mb-2">{stars}</div>
          <div className="text-sm mb-2">{skill.description}</div>
          <div className="text-xs font-terminal">
            XP: {skill.xp}/100
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillTree;